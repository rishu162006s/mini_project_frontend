import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.8, 0.25, 1] } },
  exit:    { opacity: 0, y: -16, transition: { duration: 0.25 } },
}

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [form, setForm]         = useState({ name: '', email: '', password: '' })
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) { setError('Please fill in all fields.'); return }
    if (isSignUp && !form.name)        { setError('Please enter your name.'); return }
    if (form.password.length < 4)      { setError('Password must be at least 4 characters.'); return }

    setLoading(true)
    setTimeout(() => {
      const user = {
        name: form.name || form.email.split('@')[0],
        email: form.email,
        loggedInAt: new Date().toISOString(),
      }
      localStorage.setItem('churnguard_user', JSON.stringify(user))
      navigate('/dashboard')
    }, 900)
  }

  const inputLabel = { display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.4rem' }

  return (
    <div style={{
      minHeight: '100vh', background: '#0B0F1A',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1.5rem', position: 'relative', overflow: 'hidden',
    }}>
      {/* Blobs */}
      <div style={{ position: 'absolute', width: '40vw', height: '40vw', borderRadius: '50%', filter: 'blur(130px)', top: '-15%', left: '-10%', opacity: 0.2, background: 'radial-gradient(circle, #7C3AED, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '35vw', height: '35vw', borderRadius: '50%', filter: 'blur(120px)', bottom: '-10%', right: '-5%', opacity: 0.16, background: 'radial-gradient(circle, #2563EB, transparent 70%)', pointerEvents: 'none' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%', maxWidth: 430,
          background: 'rgba(255,255,255,0.04)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24, padding: '2.8rem 2.4rem',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(124,58,237,0.1)',
          position: 'relative', zIndex: 1,
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.65rem', justifyContent: 'center', marginBottom: '2rem' }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: 'linear-gradient(135deg, #7C3AED, #2563EB)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.05rem', boxShadow: '0 4px 16px rgba(124,58,237,0.4)' }}>🛡️</div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.02em' }}>ChurnGuard</span>
          <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#fff', background: 'linear-gradient(135deg, #7C3AED, #2563EB)', borderRadius: 6, padding: '0.18rem 0.5rem' }}>AI</span>
        </Link>

        {/* Heading */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.55rem', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.025em' }}>
            {isSignUp ? 'Create your account' : 'Welcome back 👋'}
          </h1>
          <p style={{ color: '#475569', fontSize: '0.88rem', marginTop: '0.3rem' }}>
            {isSignUp ? 'Start predicting churn in minutes.' : 'Sign in to your ChurnGuard dashboard.'}
          </p>
        </div>

        {/* Toggle */}
        <div style={{
          display: 'flex', background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 14, padding: 4, marginBottom: '2rem',
        }}>
          {['Sign In', 'Sign Up'].map((label, i) => (
            <button
              key={label}
              onClick={() => { setIsSignUp(i === 1); setError('') }}
              style={{
                flex: 1, padding: '0.62rem', borderRadius: 11, border: 'none',
                fontSize: '0.87rem', fontWeight: 600, cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif",
                background: (isSignUp ? i === 1 : i === 0) ? 'linear-gradient(135deg, #7C3AED, #2563EB)' : 'transparent',
                color: (isSignUp ? i === 1 : i === 0) ? '#fff' : '#475569',
                transition: 'all 0.3s ease',
                boxShadow: (isSignUp ? i === 1 : i === 0) ? '0 2px 12px rgba(124,58,237,0.35)' : 'none',
              }}
            >{label}</button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {/* Name (sign up only) */}
          <AnimatePresence mode="wait">
            {isSignUp && (
              <motion.div key="name" variants={fadeUp} initial="hidden" animate="visible" exit="exit" style={{ marginBottom: '1.1rem' }}>
                <label style={inputLabel}>Full Name</label>
                <input className="form-input" type="text" placeholder="Alex Johnson" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              </motion.div>
            )}
          </AnimatePresence>

          <div style={{ marginBottom: '1.1rem' }}>
            <label style={inputLabel}>Email</label>
            <input className="form-input" type="email" placeholder="alex@company.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={inputLabel}>Password</label>
            <input className="form-input" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: 12, padding: '0.75rem 1rem', color: '#fb7185', fontSize: '0.83rem', marginBottom: '1rem', fontWeight: 500 }}
              >{error}</motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit" className="gradient-btn" disabled={loading}
            style={{ width: '100%', padding: '0.95rem', fontSize: '0.95rem', fontFamily: "'Space Grotesk', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.55rem', opacity: loading ? 0.8 : 1 }}
          >
            {loading ? <><span className="spinner" /> Please wait...</> : (isSignUp ? '✨ Create Account' : '→ Sign In')}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.85rem', color: '#475569' }}>
          {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span onClick={() => { setIsSignUp(!isSignUp); setError('') }} style={{ color: '#a78bfa', cursor: 'pointer', fontWeight: 700 }}>
            {isSignUp ? 'Sign In' : 'Sign Up free'}
          </span>
        </p>
      </motion.div>
    </div>
  )
}
