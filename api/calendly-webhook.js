import {
  findLeadByEmail,
  readRawBody,
  sendConfirmationEmail,
  sendJson,
  updateLead,
  verifyCalendlySignature,
} from './_lib.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { ok: false, error: 'Method not allowed.' })
  }

  try {
    const rawBody = await readRawBody(req)
    const signatureHeader = req.headers['calendly-webhook-signature']
    const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY

    const validSignature = verifyCalendlySignature({
      rawBody,
      signatureHeader,
      signingKey,
    })

    if (!validSignature) {
      return sendJson(res, 401, { ok: false, error: 'Invalid signature.' })
    }

    const eventData = JSON.parse(rawBody)
    if (eventData.event !== 'invitee.created') {
      return sendJson(res, 200, { ok: true, ignored: true })
    }

    const payload = eventData.payload || {}
    const email = (payload.email || '').trim().toLowerCase()
    if (!email) {
      return sendJson(res, 200, { ok: true, ignored: true })
    }

    const lead = await findLeadByEmail(email)
    if (!lead) {
      return sendJson(res, 200, { ok: true, ignored: true })
    }

    const calendlyEventUri = payload.scheduled_event?.uri || ''
    const alreadyHandled =
      lead.fields?.status === 'Booked' &&
      lead.fields?.calendlyEventUri &&
      lead.fields.calendlyEventUri === calendlyEventUri

    if (alreadyHandled) {
      return sendJson(res, 200, { ok: true, duplicate: true })
    }

    const bookedAt = payload.created_at || new Date().toISOString()

    const updated = await updateLead(lead.id, {
      status: 'Booked',
      bookedAt,
      calendlyEventUri,
    })

    await sendConfirmationEmail({
      to: email,
      fullName: updated?.fields?.fullName || payload.name || '',
    })

    return sendJson(res, 200, { ok: true })
  } catch (error) {
    console.error('calendly webhook error', error)
    return sendJson(res, 500, { ok: false, error: 'Webhook handling failed.' })
  }
}
