import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

/* ✅ FIXED: Always use backend env first */
const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') ||
  'https://mini-project-backend-2-mo2m.onrender.com'

/* ─── Animated Risk Ring ─────────────────────────────────────── */
function RiskRing({ percentage, level }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (circumference * percentage) / 100

  const palette = {
    Low: { stroke: '#10b981', glow: '#10b981' },
    Medium: { stroke: '#f59e0b', glow: '#f59e0b' },
    High: { stroke: '#f43f5e', glow: '#f43f5e' },
  }

  const C = palette[level] || palette.Low

  return (
    <div style={{ position: 'relative', width: 220, height: 220, margin: '0 auto' }}>
      <svg width="220" height="220" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="60" cy="60" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />

        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={C.stroke}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5 }}
          style={{ filter: `drop-shadow(0 0 10px ${C.glow})` }}
        />
      </svg>

      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <span style={{ fontSize: 40, fontWeight: 900, color: C.stroke }}>
          {Math.round(percentage)}%
        </span>
        <span style={{ fontSize: 12, color: '#94a3b8' }}>Churn Risk</span>
      </div>
    </div>
  )
}

/* ─── Result Card (UNCHANGED UI) ────────────────────────────── */
function ResultCard({ result }) {
  return (
    <div style={{ background: '#111827', padding: 20, borderRadius: 12 }}>
      <RiskRing percentage={result.risk} level={result.level} />

      <h3 style={{ marginTop: 20 }}>{result.level} Risk</h3>

      <h4>Reasons</h4>
      <ul>
        {result.reasons?.map((r, i) => <li key={i}>{r}</li>)}
      </ul>

      <h4>Suggestions</h4>
      <ul>
        {result.suggestions?.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
  )
}

/* ─── FORM ─────────────────────────────────────────────────── */
function PredictionForm({ onResult, setLoading }) {
  const [form, setForm] = useState({
    name: '',
    age: '',
    tenure: '',
    MonthlyCharges: '',
    TotalCharges: '',
    PhoneService: 'Yes',
    InternetService: 'DSL',
    Contract: 'Month-to-month',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch(`${API_BASE}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          age: Number(form.age),
          tenure: Number(form.tenure),
          MonthlyCharges: Number(form.MonthlyCharges),
          TotalCharges: Number(form.TotalCharges),
        }),
      })

      /* ❗ FIX: better error handling */
      const text = await res.text()
      let data
      try {
        data = JSON.parse(text)
      } catch {
        throw new Error('Backend returned invalid JSON')
      }

      if (!res.ok) throw new Error(data.detail || 'API error')

      onResult(data)
    } catch (err) {
      alert(err.message)
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: '#111827', padding: 20, borderRadius: 12 }}>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Age" onChange={e => setForm({ ...form, age: e.target.value })} />
      <input placeholder="Tenure" onChange={e => setForm({ ...form, tenure: e.target.value })} />

      <button type="submit">Predict</button>
    </form>
  )
}

/* ─── HISTORY (FIXED API) ─────────────────────────────────── */
function History() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    fetch(`${API_BASE}/predictions`)
      .then(async (r) => {
        const text = await r.text()
        try {
          return JSON.parse(text)
        } catch {
          return []
        }
      })
      .then((d) => setHistory(Array.isArray(d) ? d.slice(0, 6) : []))
      .catch(() => setHistory([]))
  }, [])

  return (
    <div style={{ background: '#111827', padding: 20, borderRadius: 12 }}>
      <h3>History</h3>

      {history.length === 0 ? (
        <p>No history found</p>
      ) : (
        history.map((h, i) => (
          <div key={i}>
            {h.customer_name} - {h.risk_percentage}%
          </div>
        ))
      )}
    </div>
  )
}

/* ─── MAIN DASHBOARD ───────────────────────────────────────── */
export default function Dashboard() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <PredictionForm onResult={setResult} setLoading={setLoading} />

      {result ? <ResultCard result={result} /> : <History />}
    </div>
  )
}
