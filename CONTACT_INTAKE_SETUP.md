# Contact Intake Setup (Vercel + Airtable + Calendly + Resend)

This project supports two modes:
- `Manual mode (no Calendly webhooks)`: works on free Calendly plans.
- `Webhook mode`: auto-marks bookings when `invitee.created` arrives from Calendly.

## 1) Create Airtable base and table
Create a base with a table named `Leads` (or set your own name in env var).

Required fields:
- `fullName` (single line text)
- `email` (email)
- `companyWebsite` (single line text)
- `packageInterest` (single line text)
- `serviceInterest` (single line text)
- `projectDetails` (long text)
- `status` (single select or text)
- `source` (single line text)
- `submittedAt` (date/time)
- `bookedAt` (date/time)
- `calendlyEventUri` (URL or text, only needed for webhook mode)
- `notes` (long text, optional)

## 2) Configure environment variables (Vercel)
Set these in Vercel project settings:

- `AIRTABLE_API_KEY`
- `AIRTABLE_BASE_ID`
- `AIRTABLE_TABLE_NAME`
- `CALENDLY_BOOKING_URL`
- `BOOKING_ADMIN_TOKEN` (required for manual mode endpoint)
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `CALENDLY_WEBHOOK_SIGNING_KEY` (only for webhook mode)

## 3) Manual mode (no webhook)
Use this if you are on a Calendly free plan.

Flow:
1. User submits `/contact`.
2. Lead is upserted in Airtable with `status = Intake Submitted`.
3. User is redirected to Calendly.
4. You receive Calendly confirmation in your inbox.
5. Mark booked manually with the API endpoint below.

Endpoint:
- `POST https://<your-domain>/api/mark-booked`
- Auth header: `Authorization: Bearer <BOOKING_ADMIN_TOKEN>`
- Body:

```json
{
  "email": "lead@example.com",
  "bookedAt": "2026-03-15T14:30:00.000Z",
  "notes": "Booked via Calendly confirmation email"
}
```

`bookedAt` and `notes` are optional. If omitted, `bookedAt` defaults to now.

Example:

```bash
curl -X POST "https://<your-domain>/api/mark-booked" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <BOOKING_ADMIN_TOKEN>" \
  -d '{"email":"lead@example.com"}'
```

## 4) Webhook mode (optional paid Calendly setup)
- In Calendly, create a webhook subscription targeting:
  - `https://<your-domain>/api/calendly-webhook`
- Subscribe to the `invitee.created` event.
- Copy the webhook signing key into `CALENDLY_WEBHOOK_SIGNING_KEY`.

## 5) Configure Resend
- Verify your sending domain in Resend.
- Set `RESEND_FROM_EMAIL` to an address on that domain (example: `hello@yourdomain.com`).

## 6) Deploy and verify
1. Submit the contact form from `/contact`.
2. Confirm a row is created/updated in Airtable with `status = Intake Submitted`.
3. Confirm user is redirected to Calendly.
4. After booking, run `POST /api/mark-booked` with lead email.
5. Confirm Airtable row updates to `status = Booked`.
