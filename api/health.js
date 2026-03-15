import { sendJson } from './_lib.js'

function isSet(name) {
  const value = process.env[name]
  return typeof value === 'string' && value.trim().length > 0
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return sendJson(res, 405, { ok: false, error: 'Method not allowed.' })
  }

  const required = {
    AIRTABLE_API_KEY: isSet('AIRTABLE_API_KEY'),
    AIRTABLE_BASE_ID: isSet('AIRTABLE_BASE_ID'),
    AIRTABLE_TABLE_NAME: isSet('AIRTABLE_TABLE_NAME'),
    CALENDLY_BOOKING_URL: isSet('CALENDLY_BOOKING_URL'),
  }

  const optional = {
    BOOKING_ADMIN_TOKEN: isSet('BOOKING_ADMIN_TOKEN'),
    RESEND_API_KEY: isSet('RESEND_API_KEY'),
    RESEND_FROM_EMAIL: isSet('RESEND_FROM_EMAIL'),
    CALENDLY_WEBHOOK_SIGNING_KEY: isSet('CALENDLY_WEBHOOK_SIGNING_KEY'),
  }

  const missingRequired = Object.entries(required)
    .filter(([, present]) => !present)
    .map(([name]) => name)

  const mode = optional.CALENDLY_WEBHOOK_SIGNING_KEY ? 'webhook' : 'manual'

  return sendJson(res, 200, {
    ok: missingRequired.length === 0,
    mode,
    required,
    optional,
    missingRequired,
  })
}
