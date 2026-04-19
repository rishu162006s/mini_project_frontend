import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const location  = useLocation()
  const navigate  = useNavigate()
  const [scrolled, setScrolled] = useState(false)
  const isLoggedIn = localStorage.getItem('churnguard_user')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('churnguard_user')
    navigate('/')
  }

  return (
    <motion.nav
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        padding: '0 2.5rem', height: '66px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: scrolled ? 'rgba(11,15,26,0.9)' : 'rgba(11,15,26,0.5)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        boxShadow: scrolled ? '0 4px 32px rgba(0,0,0,0.4)' : 'none',
        transition: 'all 0.35s ease',
      }}
    >
      {/* ── Logo ── */}
      <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
        {/* Shield icon */}
        <div style={{
          width: 38, height: 38, borderRadius: 11,
          background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.05rem', boxShadow: '0 4px 16px rgba(124,58,237,0.5)',
          flexShrink: 0,
        }}>🛡️</div>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.15rem', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em' }}>
          ChurnGuard
        </span>
        <span style={{
          fontSize: '0.6rem', fontWeight: 800, color: '#fff', letterSpacing: '0.06em',
          background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
          borderRadius: 6, padding: '0.18rem 0.5rem',
        }}>AI</span>
      </Link>

      {/* ── Links ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className={`nav-link${location.pathname === '/dashboard' ? ' active' : ''}`}>
              Dashboard
            </Link>
            <Link
              to="/analytics"
              className={`nav-link${location.pathname === '/analytics' ? ' active' : ''}`}
              style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              <span style={{
                width: 7, height: 7, borderRadius: '50%', background: '#10b981',
                display: 'inline-block', boxShadow: '0 0 8px #10b981',
                animation: 'pulse-dot 2s ease-in-out infinite',
              }} />
              Live Data
            </Link>
            <button
              onClick={handleLogout}
              style={{
                marginLeft: '0.75rem',
                background: 'rgba(244,63,94,0.08)',
                border: '1px solid rgba(244,63,94,0.2)',
                borderRadius: 10, color: '#fb7185',
                fontWeight: 600, fontSize: '0.82rem',
                padding: '0.42rem 1.1rem', cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(244,63,94,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(244,63,94,0.08)'}
            >Sign Out</button>
          </>
        ) : location.pathname === '/' && (
          <>
            <Link to="/auth" className="nav-link">Sign In</Link>
            <Link
              to="/auth"
              className="gradient-btn"
              style={{ textDecoration: 'none', fontSize: '0.85rem', padding: '0.5rem 1.3rem', display: 'inline-block' }}
            >Get Started →</Link>
          </>
        )}
      </div>
    </motion.nav>
  )
}
