import { findLeadByEmail, sendJson, updateLead } from './_lib.js'

function sanitizeText(value, maxLength = 5000) {
  if (typeof value !== 'string') {
    return ''
  }

  return value.trim().replace(/\s+/g, ' ').slice(0, maxLength)
}

function getBearerToken(authHeader) {
  if (!authHeader || typeof authHeader !== 'string') {
    return ''
  }

  const [scheme, token] = authHeader.trim().split(/\s+/, 2)
  if ((scheme || '').toLowerCase() !== 'bearer') {
    return ''
  }

  return token || ''
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { ok: false, error: 'Method not allowed.' })
  }

  try {
    const expectedToken = process.env.BOOKING_ADMIN_TOKEN
    const providedToken =
      getBearerToken(req.headers.authorization) ||
      sanitizeText(req.headers['x-booking-token'], 300)

    if (!expectedToken || !providedToken || providedToken !== expectedToken) {
      return sendJson(res, 401, { ok: false, error: 'Unauthorized.' })
    }

    const body = req.body || {}
    const email = sanitizeText(body.email, 200).toLowerCase()
    const notes = sanitizeText(body.notes, 5000)
    const bookedAtInput = sanitizeText(body.bookedAt, 100)

    if (!email) {
      return sendJson(res, 400, { ok: false, error: 'Email is required.' })
    }

    const lead = await findLeadByEmail(email)
    if (!lead) {
      return sendJson(res, 404, { ok: false, error: 'Lead not found.' })
    }

    const bookedAt = bookedAtInput || new Date().toISOString()
    const nextNotes = notes
      ? notes
      : lead.fields?.notes || 'Marked booked manually from Calendly confirmation email.'

    const updated = await updateLead(lead.id, {
      status: 'Booked',
      bookedAt,
      notes: nextNotes,
    })

    return sendJson(res, 200, {
      ok: true,
      recordId: updated?.id || lead.id,
      email,
      status: 'Booked',
      bookedAt,
    })
  } catch (error) {
    console.error('mark booked error', error)
    return sendJson(res, 500, { ok: false, error: 'Failed to mark booked.' })
  }
}
