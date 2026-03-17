import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'

const links = [
  { to: '/',         label: 'Home' },
  { to: '/work',     label: 'Portfolio' },
  { to: '/pricing',  label: 'Pricing' },
  { to: '/contact',  label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav>
        <div className="nav-inner">
          <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
            Figured Consulting
          </Link>

          <div className="nav-links">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => isActive ? 'active' : ''}
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <button
            className="nav-hamburger"
            onClick={() => setOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span style={open ? { transform: 'rotate(45deg) translate(4px, 4px)' } : {}} />
            <span style={open ? { opacity: 0 } : {}} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="nav-mobile-drawer">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) => isActive ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  )
}
