import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  'https://mini-project-backend-2-mo2m.onrender.com'

/* ─── Animated Risk Ring ─────────────────────────────────────── */
function RiskRing({ percentage, level }) {
  const radius       = 52
  const circumference = 2 * Math.PI * radius
  const offset        = circumference - (circumference * percentage) / 100

  const palette = {
    Low:    { stroke: '#10b981', glow: '#10b981', text: '#6ee7b7' },
    Medium: { stroke: '#f59e0b', glow: '#f59e0b', text: '#fcd34d' },
    High:   { stroke: '#f43f5e', glow: '#f43f5e', text: '#fda4af' },
  }
  const C = palette[level] || palette.Low

  return (
    <div style={{ position: 'relative', width: 220, height: 220, margin: '0 auto' }}>
      <svg width="220" height="220" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        {/* Animated arc */}
        <motion.circle
          cx="60" cy="60" r={radius}
          fill="none"
          stroke={C.stroke}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          style={{ filter: `drop-shadow(0 0 10px ${C.glow}88)` }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
          style={{ textAlign: 'center' }}
        >
          <span style={{ fontSize: '3.2rem', fontWeight: 900, color: C.stroke, letterSpacing: '-0.05em', lineHeight: 1, display: 'block' }}>
            {Math.round(percentage)}%
          </span>
          <span style={{ fontSize: '0.68rem', color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', display: 'block', marginTop: '0.3rem' }}>
            Churn Risk
          </span>
        </motion.div>
      </div>
    </div>
  )
}

/* ─── Result Card ────────────────────────────────────────────── */
function ResultCard({ result }) {
  const { risk, level, reasons, suggestions } = result

  const palette = {
    Low:    { stroke: '#10b981', bg: 'rgba(16,185,129,0.08)',  border: 'rgba(16,185,129,0.25)',  label: '#6ee7b7', badgeBg: 'rgba(16,185,129,0.12)',  badgeText: '#6ee7b7' },
    Medium: { stroke: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.25)', label: '#fcd34d', badgeBg: 'rgba(245,158,11,0.12)', badgeText: '#fcd34d' },
    High:   { stroke: '#f43f5e', bg: 'rgba(244,63,94,0.08)',  border: 'rgba(244,63,94,0.25)',  label: '#fda4af', badgeBg: 'rgba(244,63,94,0.12)',  badgeText: '#fda4af' },
  }
  const C = palette[level] || palette.Low

  return (
    <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>

      {/* ── Risk Meter Card ── */}
      <div className="glass-card" style={{ padding: '2.5rem', marginBottom: '1.2rem', borderTop: `3px solid ${C.stroke}`, background: C.bg }}>
        <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.14em', textAlign: 'center', marginBottom: '1.5rem' }}>
          AI Analysis Result
        </div>
        <RiskRing percentage={risk} level={level} />
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <motion.span
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, type: 'spring' }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.45rem 1.4rem', borderRadius: 100,
              fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
              background: C.badgeBg, color: C.badgeText, border: `1px solid ${C.border}`,
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: C.stroke, display: 'inline-block', animation: 'pulse-dot 2s ease-in-out infinite' }} />
            {level} Churn Risk
          </motion.span>
        </div>
      </div>

      {/* ── Top Reasons ── */}
      {reasons && reasons.length > 0 && (
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{ padding: '1.8rem', marginBottom: '1.2rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.2rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(244,63,94,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>🔍</div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#f1f5f9', margin: 0 }}>Top Reasons</h4>
          </div>
          {reasons.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem 1rem', background: 'rgba(244,63,94,0.05)', borderRadius: 12, border: '1px solid rgba(244,63,94,0.1)', marginBottom: '0.5rem' }}
            >
              <span style={{ color: '#f43f5e', fontWeight: 900, flexShrink: 0, marginTop: '0.05rem' }}>•</span>
              <span style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.6 }}>{r}</span>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* ── Suggestions ── */}
      {suggestions && suggestions.length > 0 && (
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          style={{ padding: '1.8rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1.2rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem' }}>💡</div>
            <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#f1f5f9', margin: 0 }}>Suggestions</h4>
          </div>
          {suggestions.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.65 + i * 0.08 }}
              style={{ display: 'flex', gap: '0.75rem', padding: '0.75rem 1rem', background: 'rgba(16,185,129,0.05)', borderRadius: 12, border: '1px solid rgba(16,185,129,0.12)', marginBottom: '0.5rem' }}
            >
              <span style={{ color: '#10b981', fontWeight: 900, flexShrink: 0 }}>✓</span>
              <span style={{ fontSize: '0.86rem', color: '#94a3b8', lineHeight: 1.6 }}>{s}</span>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

/* ─── Prediction Form ────────────────────────────────────────── */
function PredictionForm({ onResult, setLoading }) {
  const [form, setForm] = useState({
    name: '', age: '', tenure: '',
    MonthlyCharges: '', TotalCharges: '',
    PhoneService: 'Yes', InternetService: 'DSL', Contract: 'Month-to-month',
  })
  const [error, setError] = useState('')

  const numericFields = [
    { name: 'age',            label: 'Customer Age',        placeholder: 'e.g. 45',    icon: '👤', min: 18,  max: 120 },
    { name: 'tenure',         label: 'Tenure (months)',     placeholder: 'e.g. 24',    icon: '📅', min: 0 },
    { name: 'MonthlyCharges', label: 'Monthly Charges ($)', placeholder: 'e.g. 70.50', icon: '💳', min: 0, step: '0.01' },
    { name: 'TotalCharges',   label: 'Total Charges ($)',   placeholder: 'e.g. 1680',  icon: '💰', min: 0, step: '0.01' },
  ]
  const selectFields = [
    { name: 'PhoneService',    label: 'Phone Service',    options: ['Yes', 'No'],                             icon: '📞' },
    { name: 'InternetService', label: 'Internet Service', options: ['DSL', 'Fiber optic', 'No'],              icon: '🌐' },
    { name: 'Contract',        label: 'Contract Type',    options: ['Month-to-month', 'One year', 'Two year'],icon: '📋' },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    for (const f of numericFields) {
      if (form[f.name] === '') { setError(`Please fill in "${f.label}".`); return }
    }
    setLoading(true)
    try {
      const payload = {
        name: form.name,
        age: parseFloat(form.age),
        tenure: parseFloat(form.tenure),
        MonthlyCharges: parseFloat(form.MonthlyCharges),
        TotalCharges: parseFloat(form.TotalCharges),
        PhoneService: form.PhoneService,
        InternetService: form.InternetService,
        Contract: form.Contract,
      }
      const resp = await fetch(`${API_BASE}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}))
        throw new Error(err.detail || `Server error (${resp.status})`)
      }
      onResult(await resp.json())
    } catch (err) {
      setError(err.message || 'Failed to connect to server.')
    } finally {
      setLoading(false)
    }
  }

  const labelStyle = {
    display: 'flex', alignItems: 'center', gap: '0.35rem',
    fontSize: '0.68rem', fontWeight: 700, color: '#475569',
    letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: '0.45rem',
  }

  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{ padding: '2.2rem' }}
    >
      {/* Card header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.8rem' }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: 'linear-gradient(135deg, #7C3AED, #2563EB)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.05rem', boxShadow: '0 4px 16px rgba(124,58,237,0.35)', flexShrink: 0,
        }}>🔮</div>
        <div>
          <div style={{ fontWeight: 800, color: '#f1f5f9', fontSize: '1rem' }}>Customer Profile</div>
          <div style={{ fontSize: '0.74rem', color: '#475569' }}>Enter details to predict churn risk</div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div style={{ marginBottom: '1.15rem' }}>
          <label style={labelStyle}><span>👤</span> Customer Name</label>
          <input className="form-input" type="text" placeholder="e.g. Jane Smith" value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })} required />
        </div>

        {/* Numeric 2-col */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          {numericFields.map(f => (
            <div key={f.name}>
              <label style={labelStyle}><span>{f.icon}</span> {f.label}</label>
              <input className="form-input" type="number" placeholder={f.placeholder}
                min={f.min} max={f.max} step={f.step || '1'} value={form[f.name]}
                onChange={e => setForm({ ...form, [f.name]: e.target.value })} required />
            </div>
          ))}
        </div>

        {/* Select 2-col */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          {selectFields.slice(0, 2).map(f => (
            <div key={f.name}>
              <label style={labelStyle}><span>{f.icon}</span> {f.label}</label>
              <select className="form-input" value={form[f.name]} onChange={e => setForm({ ...form, [f.name]: e.target.value })}>
                {f.options.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        {/* Contract full width */}
        <div style={{ marginBottom: '1.4rem' }}>
          <label style={labelStyle}><span>📋</span> Contract Type</label>
          <select className="form-input" value={form.Contract} onChange={e => setForm({ ...form, Contract: e.target.value })}>
            {selectFields[2].options.map(o => <option key={o} value={o}>{o}</option>)}
          </select>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              style={{ background: 'rgba(244,63,94,0.08)', border: '1px solid rgba(244,63,94,0.2)', borderRadius: 12, padding: '0.75rem 1rem', color: '#fb7185', fontSize: '0.83rem', marginBottom: '1rem', fontWeight: 500, overflow: 'hidden' }}
            >{error}</motion.div>
          )}
        </AnimatePresence>

        <button type="submit" className="gradient-btn"
          style={{ width: '100%', padding: '0.95rem', fontSize: '0.95rem', fontFamily: "'Space Grotesk', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          🔮 Predict Churn Risk
        </button>
      </form>
    </motion.div>
  )
}

/* ─── Loading Overlay ────────────────────────────────────────── */
function LoadingOverlay() {
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 999,
        background: 'rgba(11,15,26,0.8)', backdropFilter: 'blur(12px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
      }}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{ width: 52, height: 52, borderRadius: '50%', border: '3px solid rgba(124,58,237,0.15)', borderTopColor: '#7C3AED' }}
      />
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.3rem' }}>Analysing Customer Profile…</p>
        <p style={{ color: '#475569', fontSize: '0.85rem' }}>Running neural network inference</p>
      </div>
    </motion.div>
  )
}

/* ─── Recent Predictions Sidebar ────────────────────────────── */
function RecentPredictionsList() {
  const [history, setHistory] = useState([])
  const [histLoading, setHistLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${API_BASE}/predictions`)
      .then(r => r.json())
      .then(d => setHistory(d.slice(0, 6)))
      .catch(console.error)
      .finally(() => setHistLoading(false))
  }, [])

  const riskColor = pct => pct > 70 ? '#f43f5e' : pct > 40 ? '#f59e0b' : '#10b981'

  return (
    <div className="glass-card" style={{ padding: '2rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#f1f5f9', margin: 0 }}>Recent Activity</h3>
        <button onClick={() => navigate('/analytics')} style={{ background: 'transparent', border: 'none', color: '#a78bfa', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
          View All →
        </button>
      </div>

      {histLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2.5rem' }}>
          <span className="spinner" />
        </div>
      ) : history.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#475569', fontSize: '0.9rem' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.6rem' }}>📊</div>
          No predictions yet. Start analysing customers!
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {history.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                padding: '0.9rem 1rem',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: 14, border: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                transition: 'all 0.25s ease', cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.transform = 'translateY(0)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(37,99,235,0.2))',
                  border: '1px solid rgba(124,58,237,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: '0.9rem', color: '#a78bfa',
                }}>
                  {item.customer_name?.[0]?.toUpperCase() || '?'}
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f1f5f9' }}>{item.customer_name}</div>
                  <div style={{ fontSize: '0.7rem', color: '#475569' }}>{new Date(item.timestamp).toLocaleDateString()}</div>
                </div>
              </div>
              <div style={{
                padding: '0.28rem 0.75rem', borderRadius: 100, fontWeight: 800, fontSize: '0.82rem',
                background: `${riskColor(item.risk_percentage)}15`,
                color: riskColor(item.risk_percentage),
                border: `1px solid ${riskColor(item.risk_percentage)}30`,
              }}>
                {item.risk_percentage}%
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Dashboard Page ─────────────────────────────────────────── */
export default function Dashboard() {
  const navigate  = useNavigate()
  const [result, setResult]   = useState(null)
  const [loading, setLoading] = useState(false)
  const [user, setUser]       = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('churnguard_user')
    if (!stored) { navigate('/auth'); return }
    try { setUser(JSON.parse(stored)) } catch { navigate('/auth') }
  }, [navigate])

  if (!user) return null

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F1A', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient blobs */}
      <div style={{ position: 'fixed', top: '-10%', right: '-5%', width: '35vw', height: '35vw', borderRadius: '50%', filter: 'blur(140px)', opacity: 0.12, background: 'radial-gradient(circle, #7C3AED, transparent)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-10%', left: '-5%', width: '30vw', height: '30vw', borderRadius: '50%', filter: 'blur(130px)', opacity: 0.1, background: 'radial-gradient(circle, #2563EB, transparent)', pointerEvents: 'none', zIndex: 0 }} />

      <Navbar />

      <AnimatePresence>{loading && <LoadingOverlay />}</AnimatePresence>

      <div style={{ maxWidth: 1150, margin: '0 auto', padding: '5.5rem 1.5rem 3rem', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
        >
          <div>
            <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: '0.25rem', color: '#f1f5f9' }}>
              Hey, <span className="gradient-text">{user.name}</span> 👋
            </h1>
            <p style={{ color: '#475569', fontSize: '0.92rem' }}>Analyse a customer profile to see their churn probability.</p>
          </div>
          {result && (
            <motion.button
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              onClick={() => setResult(null)}
              className="gradient-btn-outline"
              style={{ padding: '0.6rem 1.4rem', fontSize: '0.88rem', fontFamily: "'Space Grotesk', sans-serif" }}
            >🔄 New Prediction</motion.button>
          )}
        </motion.div>

        {/* Main grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: result ? '1fr 1fr' : '1.35fr 0.65fr',
          gap: '2rem', alignItems: 'start',
          transition: 'grid-template-columns 0.4s ease',
        }}>
          <PredictionForm onResult={data => setResult(data)} setLoading={setLoading} />

          <AnimatePresence mode="wait">
            {result ? (
              <motion.div key="result" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 30 }} transition={{ duration: 0.5 }}>
                <ResultCard result={result} />
              </motion.div>
            ) : (
              <motion.div key="sidebar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <RecentPredictionsList />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
