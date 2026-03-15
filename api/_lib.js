import crypto from 'node:crypto'

function requiredEnv(name) {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

function sendJson(res, status, payload) {
  res.status(status).setHeader('Content-Type', 'application/json').send(JSON.stringify(payload))
}

function sanitizeText(value, maxLength = 5000) {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim().replace(/\s+/g, ' ').slice(0, maxLength)
}

function sanitizePayload(input) {
  return {
    firstName: sanitizeText(input.firstName, 80),
    lastName: sanitizeText(input.lastName, 80),
    email: sanitizeText(input.email, 200).toLowerCase(),
    companyWebsite: sanitizeText(input.companyWebsite, 300),
    packageInterest: sanitizeText(input.packageInterest, 80),
    serviceInterest: sanitizeText(input.serviceInterest, 80),
    projectDetails: sanitizeText(input.projectDetails, 5000),
    website: sanitizeText(input.website, 200),
    formStartedAt: Number(input.formStartedAt),
  }
}

function validateLead(payload) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  if (!payload.firstName || !payload.lastName || !payload.email || !payload.packageInterest || !payload.serviceInterest || !payload.projectDetails) {
    return 'Please complete all required fields.'
  }

  if (!emailPattern.test(payload.email)) {
    return 'Please provide a valid email address.'
  }

  if (payload.website) {
    return 'Spam check failed.'
  }

  if (!Number.isFinite(payload.formStartedAt)) {
    return 'Invalid form session.'
  }

  const elapsed = Date.now() - payload.formStartedAt
  if (elapsed < 2500) {
    return 'Form submitted too quickly.'
  }

  if (elapsed > 1000 * 60 * 60 * 2) {
    return 'Form session expired. Please refresh and try again.'
  }

  return null
}

function formulaEscape(value) {
  return value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

async function airtableRequest(path, init = {}) {
  const apiKey = requiredEnv('AIRTABLE_API_KEY')
  const baseId = requiredEnv('AIRTABLE_BASE_ID')
  const tableName = requiredEnv('AIRTABLE_TABLE_NAME')

  const response = await fetch(`https://api.airtable.com/v0/${encodeURIComponent(baseId)}/${encodeURIComponent(tableName)}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      ...(init.headers || {}),
    },
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Airtable error (${response.status}): ${text}`)
  }

  return response.json()
}

async function findLeadByEmail(email) {
  const filterByFormula = `LOWER({email})='${formulaEscape(email.toLowerCase())}'`
  const query = `?maxRecords=1&filterByFormula=${encodeURIComponent(filterByFormula)}`
  const data = await airtableRequest(query)
  return data.records?.[0] || null
}

async function createLead(fields) {
  const data = await airtableRequest('', {
    method: 'POST',
    body: JSON.stringify({ records: [{ fields }] }),
  })
  return data.records?.[0] || null
}

async function updateLead(recordId, fields) {
  const data = await airtableRequest(`/${recordId}`, {
    method: 'PATCH',
    body: JSON.stringify({ fields }),
  })
  return data || null
}

async function upsertLeadByEmail(email, fields) {
  const existing = await findLeadByEmail(email)
  if (!existing) {
    return createLead(fields)
  }
  return updateLead(existing.id, fields)
}

function buildCalendlyRedirectUrl({ firstName, lastName, email, companyWebsite }) {
  const baseUrl = process.env.CALENDLY_BOOKING_URL || 'https://calendly.com/'
  const url = new URL(baseUrl)

  const fullName = `${firstName} ${lastName}`.trim()
  if (fullName) {
    url.searchParams.set('name', fullName)
  }

  if (email) {
    url.searchParams.set('email', email)
  }

  if (companyWebsite) {
    url.searchParams.set('a1', companyWebsite)
  }

  return url.toString()
}

async function readRawBody(req) {
  if (typeof req.body === 'string') {
    return req.body
  }

  if (req.body && Buffer.isBuffer(req.body)) {
    return req.body.toString('utf8')
  }

  if (req.body && typeof req.body === 'object') {
    return JSON.stringify(req.body)
  }

  const chunks = []
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }

  return Buffer.concat(chunks).toString('utf8')
}

function verifyCalendlySignature({ rawBody, signatureHeader, signingKey }) {
  if (!signatureHeader || !signingKey) {
    return false
  }

  const parts = Object.fromEntries(
    signatureHeader.split(',').map((piece) => {
      const [k, v] = piece.split('=')
      return [k?.trim(), v?.trim()]
    }),
  )

  const timestamp = parts.t
  const expected = parts.v1

  if (!timestamp || !expected) {
    return false
  }

  const digest = crypto
    .createHmac('sha256', signingKey)
    .update(`${timestamp}.${rawBody}`)
    .digest('hex')

  try {
    return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(expected))
  } catch {
    return false
  }
}

async function sendConfirmationEmail({ to, fullName }) {
  const apiKey = requiredEnv('RESEND_API_KEY')
  const from = requiredEnv('RESEND_FROM_EMAIL')

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject: 'Your Figure discovery call is confirmed',
      html: `<p>Hi ${fullName || 'there'},</p><p>Your discovery call is confirmed. We look forward to meeting you.</p><p>- Figure Consulting</p>`,
    }),
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Resend error (${response.status}): ${text}`)
  }
}

export {
  buildCalendlyRedirectUrl,
  findLeadByEmail,
  readRawBody,
  sanitizePayload,
  sendConfirmationEmail,
  sendJson,
  upsertLeadByEmail,
  updateLead,
  validateLead,
  verifyCalendlySignature,
}
