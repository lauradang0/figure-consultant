import {
  buildCalendlyRedirectUrl,
  sanitizePayload,
  sendJson,
  upsertLeadByEmail,
  validateLead,
} from './_lib.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { ok: false, error: 'Method not allowed.' })
  }

  try {
    const payload = sanitizePayload(req.body || {})
    const validationError = validateLead(payload)

    if (validationError) {
      return sendJson(res, 400, { ok: false, error: validationError })
    }

    const submittedAt = new Date().toISOString()

    await upsertLeadByEmail(payload.email, {
      fullName: `${payload.firstName} ${payload.lastName}`.trim(),
      email: payload.email,
      companyWebsite: payload.companyWebsite,
      packageInterest: payload.packageInterest,
      serviceInterest: payload.serviceInterest,
      projectDetails: payload.projectDetails,
      status: 'Intake Submitted',
      source: 'Website',
      submittedAt,
    })

    const redirectUrl = buildCalendlyRedirectUrl(payload)
    return sendJson(res, 200, { ok: true, redirectUrl })
  } catch (error) {
    console.error('contact error', error)
    return sendJson(res, 500, { ok: false, error: 'Failed to submit form.' })
  }
}
