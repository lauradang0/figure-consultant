import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <div className="footer-brand-name">Figured Consulting</div>
            <p className="footer-tagline">
              Websites and AI automations that turn visitors into revenue.
              Built by builders, not account managers.
            </p>
          </div>
          <div>
            <div className="footer-col-title">Services</div>
            <div className="footer-links">
              <Link to="/work">Website Redesign</Link>
              <Link to="/work">AI Automations</Link>
              <Link to="/work">Full Transformation</Link>
              <Link to="/pricing">Monthly Retainer</Link>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <div className="footer-links">
              <Link to="/about">About</Link>
              <Link to="/work">Work</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          <div>
            <div className="footer-col-title">Contact</div>
            <div className="footer-links">
              <a href="mailto:figuredconsulting@gmail.com">figuredconsulting@gmail.com</a>
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Figured Consulting. All rights reserved.</span>
          <span>Now accepting Q2 2026 clients</span>
        </div>
      </div>
    </footer>
  )
}
