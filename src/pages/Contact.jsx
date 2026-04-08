import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSEO } from '../hooks/useSEO'

const PACKAGE_OPTIONS = [
  { value: 'starter', label: 'Starter ($999)' },
  { value: 'growth', label: 'Growth ($2,500)' },
  { value: 'custom', label: "Custom - Let's talk" },
  { value: 'retainer', label: 'Monthly Retainer' },
  { value: 'not-sure', label: 'Not sure yet' },
]

const SERVICE_OPTIONS = [
  { value: 'website-redesign', label: 'Website Redesign' },
  { value: 'ai-automations', label: 'AI Automations' },
  { value: 'full-transformation', label: 'Full Transformation' },
  { value: 'not-sure', label: 'Not sure yet' },
]

function normalizePackageParam(packageParam) {
  if (['retainer-standard', 'retainer-growth'].includes(packageParam)) {
    return 'retainer'
  }

  return PACKAGE_OPTIONS.some((option) => option.value === packageParam)
    ? packageParam
    : ''
}

export default function Contact() {
  useSEO({
    title: 'Contact — Book a Free Discovery Call | Figured Consulting',
    description: 'Book a free 30-minute discovery call. Tell us about your project and we\'ll map out a custom plan within 48 hours. No commitment required.',
  })
  const [searchParams] = useSearchParams()

  const defaultPackage = useMemo(() => normalizePackageParam(searchParams.get('package') || ''), [searchParams])

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyWebsite: '',
    packageInterest: defaultPackage,
    serviceInterest: '',
    projectDetails: '',
    website: '',
    formStartedAt: Date.now(),
  })

  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')

  function updateField(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (status === 'submitting') {
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data?.ok || !data?.redirectUrl) {
        throw new Error(data?.error || 'Unable to submit right now. Please try again.')
      }

      window.location.href = data.redirectUrl
    } catch (error) {
      setStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Unable to submit right now. Please try again.')
    }
  }

  const submitLabel = status === 'submitting' ? 'Submitting...' : 'Book my free call ->'

  return (
    <>
      <section className="page-header">
        <div className="container">
          <div className="label">Contact</div>
          <h1 className="page-header-title">
            Let's build something<br />great together
          </h1>
          <p className="page-header-sub">
            Whether you know exactly what you need or are still figuring it
            out - we're happy to help.
          </p>
        </div>
      </section>

      <section className="contact-section">
        <div className="container">
          <form className="contact-form-inner" onSubmit={handleSubmit}>
            <div className="label" style={{ marginBottom: 52 }}>Book a discovery call</div>

            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={formData.website}
              onChange={(event) => updateField('website', event.target.value)}
              style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
            />

            <div className="contact-form-grid">
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  className="contact-form-input"
                  type="text"
                  placeholder="Jordan"
                  value={formData.firstName}
                  onChange={(event) => updateField('firstName', event.target.value)}
                  required
                />
              </div>
              <div className="contact-form-field">
                <label className="contact-form-label" htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  className="contact-form-input"
                  type="text"
                  placeholder="Lee"
                  value={formData.lastName}
                  onChange={(event) => updateField('lastName', event.target.value)}
                  required
                />
              </div>
            </div>

            <div className="contact-form-field">
              <label className="contact-form-label" htmlFor="email">Email</label>
              <input
                id="email"
                className="contact-form-input"
                type="email"
                placeholder="jordan@company.com"
                value={formData.email}
                onChange={(event) => updateField('email', event.target.value)}
                required
              />
            </div>

            <div className="contact-form-field">
              <label className="contact-form-label" htmlFor="companyWebsite">Company / Website</label>
              <input
                id="companyWebsite"
                className="contact-form-input"
                type="text"
                placeholder="Acme Inc. / acme.co"
                value={formData.companyWebsite}
                onChange={(event) => updateField('companyWebsite', event.target.value)}
              />
            </div>

            <div className="contact-form-field">
              <label className="contact-form-label" htmlFor="packageInterest">Package interest</label>
              <select
                id="packageInterest"
                className="contact-form-input"
                style={{ cursor: 'pointer' }}
                value={formData.packageInterest}
                onChange={(event) => updateField('packageInterest', event.target.value)}
                required
              >
                <option value="" disabled>Select a package</option>
                {PACKAGE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="contact-form-field">
              <label className="contact-form-label" htmlFor="serviceInterest">What are you looking for?</label>
              <select
                id="serviceInterest"
                className="contact-form-input"
                style={{ cursor: 'pointer' }}
                value={formData.serviceInterest}
                onChange={(event) => updateField('serviceInterest', event.target.value)}
                required
              >
                <option value="" disabled>Select a service</option>
                {SERVICE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>

            <div className="contact-form-field">
              <label className="contact-form-label" htmlFor="projectDetails">Tell us about your project</label>
              <textarea
                id="projectDetails"
                className="contact-form-input"
                placeholder="What does your business do? What problem are you trying to solve?"
                style={{ height: 110 }}
                value={formData.projectDetails}
                onChange={(event) => updateField('projectDetails', event.target.value)}
                required
              />
            </div>

            {errorMessage ? (
              <p style={{ color: '#b00020', margin: '12px 0 0', fontSize: 13 }}>
                {errorMessage}
              </p>
            ) : null}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
              <button className="contact-submit" type="submit" disabled={status === 'submitting'}>
                {submitLabel}
              </button>
              <span style={{ fontSize: 11, color: '#888', letterSpacing: '0.04em' }}>
                hello@figureconsulting.co
              </span>
            </div>
          </form>
        </div>
      </section>
    </>
  )
}
