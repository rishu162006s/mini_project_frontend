import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

function RiskRing({ percentage, level }) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (circumference * percentage) / 100

  const palette = {
    Low: { stroke: '#10b981', glow: '#10b981', text: '#6ee7b7' },
    Medium: { stroke: '#f59e0b', glow: '#f59e0b', text: '#fcd34d' },
    High: { stroke: '#f43f5e', glow: '#f43f5e', text: '#fda4af' },
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
          transition={{ duration: 1.8 }}
          style={{ filter: `drop-shadow(0 0 10px ${C.glow}88)` }}
        />
      </svg>

      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}>
        <span style={{ fontSize: '3rem', fontWeight: 900, color: C.stroke }}>
          {Math.round(percentage)}%
        </span>
        <span style={{ fontSize: '0.7rem', color: '#475569' }}>Churn Risk</span>
      </div>
    </div>
  )
}

function ResultCard({ result }) {
  return (
    <div style={{ background: '#1e293b', padding: 20, borderRadius: 12 }}>
      <h2>{result.risk}%</h2>
      <h3>{result.level} Risk</h3>

      <h4>Reasons</h4>
      <ul>
        {result.reasons.map((r, i) => <li key={i}>{r}</li>)}
      </ul>

      <h4>Suggestions</h4>
      <ul>
        {result.suggestions.map((s, i) => <li key={i}>{s}</li>)}
      </ul>
    </div>
  )
}

function PredictionForm({ onResult, setLoading }) {
  const [form, setForm] = useState({
    name: '',
    age: '',
    tenure: '',
    MonthlyCharges: '',
    TotalCharges: '',
    PhoneService: 'Yes',
    InternetService: 'Fiber optic',
    Contract: 'Month-to-month',
  })

  const handleSubmit = async () => {
    setLoading(true)

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

    const data = await res.json()
    onResult(data)
    setLoading(false)
  }

  return (
    <div style={{ background: '#1e293b', padding: 20, borderRadius: 12 }}>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Age" onChange={e => setForm({ ...form, age: e.target.value })} />
      <input placeholder="Tenure" onChange={e => setForm({ ...form, tenure: e.target.value })} />

      <button onClick={handleSubmit}>Predict</button>
    </div>
  )
}

function RecentPredictionsList() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    fetch(`${API_BASE}/predictions`)
      .then(r => r.json())
      .then(d => setHistory(d.slice(0, 6)))
      .catch(console.error)
  }, [])

  return (
    <div style={{ background: '#1e293b', padding: 20, borderRadius: 12 }}>
      <h3>History</h3>
      {history.map((h, i) => (
        <div key={i}>
          {h.customer_name} - {h.risk_percentage}%
        </div>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      <PredictionForm onResult={setResult} setLoading={setLoading} />
      {result ? <ResultCard result={result} /> : <RecentPredictionsList />}
    </div>
  )
}
