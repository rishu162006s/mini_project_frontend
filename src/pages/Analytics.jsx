import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from '../components/Navbar'

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

/* ─── Helpers ────────────────────────────────────────────────── */
const riskLevel  = pct => pct > 70 ? 'High' : pct > 40 ? 'Medium' : 'Low'
const riskPalette = {
  Low:    { color: '#10b981', bg: 'rgba(16,185,129,0.1)',  border: 'rgba(16,185,129,0.22)',  text: '#6ee7b7' },
  Medium: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.22)', text: '#fcd34d' },
  High:   { color: '#f43f5e', bg: 'rgba(244,63,94,0.1)',  border: 'rgba(244,63,94,0.22)',  text: '#fda4af' },
}

/* ─── Stat Card ──────────────────────────────────────────────── */
function StatCard({ icon, label, value, accent, delay }) {
  return (
    <motion.div
      className="glass-card"
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{ padding: '1.8rem', borderTop: `3px solid ${accent}` }}
    >
      <div style={{ width: 44, height: 44, borderRadius: 13, background: `${accent}18`, border: `1px solid ${accent}28`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.35rem', marginBottom: '1rem' }}>{icon}</div>
      <div style={{ fontSize: '2.2rem', fontWeight: 900, color: '#f1f5f9', lineHeight: 1, marginBottom: '0.3rem' }}>{value}</div>
      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.09em' }}>{label}</div>
    </motion.div>
  )
}

/* ─── Record Table Row ─────────────────────────────────────────── */
function RecordTableRow({ record, index }) {
  const risk  = record.risk_percentage
  const level = riskLevel(risk)
  const C     = riskPalette[level]

  return (
    <motion.tr
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      style={{ borderLeft: `3px solid ${C.color}` }}
    >
      {/* Customer */}
      <td>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: `linear-gradient(135deg, ${C.bg}, rgba(124,58,237,0.08))`,
            border: `1px solid ${C.border}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: '0.9rem', color: C.color,
          }}>
            {record.customer_name?.[0]?.toUpperCase() || '?'}
          </div>
          <div>
            <div style={{ fontWeight: 700, color: '#f1f5f9' }}>{record.customer_name}</div>
            <div style={{ fontSize: '0.73rem', color: '#475569' }}>Age {record.age}</div>
          </div>
        </div>
      </td>

      {/* Date */}
      <td>
        <div style={{ color: '#cbd5e1' }}>{new Date(record.timestamp).toLocaleDateString()}</div>
        <div style={{ fontSize: '0.73rem', color: '#475569' }}>{new Date(record.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
      </td>

      {/* Financials / Context */}
      <td>
        <div style={{ color: '#cbd5e1' }}>${record.monthly_charges}/mo</div>
        <div style={{ fontSize: '0.73rem', color: '#475569' }}>{record.tenure} mos tenure</div>
      </td>

      {/* Prediction History Column */}
      <td>
        <span style={{ 
          padding: '0.25rem 0.75rem', 
          borderRadius: '100px', 
          fontSize: '0.75rem', 
          fontWeight: 700,
          background: record.churn ? 'rgba(244,63,94,0.1)' : 'rgba(16,185,129,0.1)',
          color: record.churn ? '#fda4af' : '#6ee7b7',
          border: `1px solid ${record.churn ? 'rgba(244,63,94,0.2)' : 'rgba(16,185,129,0.2)'}`
        }}>
          {record.churn ? 'Likely to Churn' : 'Retained'}
        </span>
      </td>

      {/* Risk Badge */}
      <td style={{ textAlign: 'right' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 900, color: C.color, lineHeight: 1 }}>{risk}%</div>
        <div style={{ fontSize: '0.65rem', fontWeight: 800, color: C.text, textTransform: 'uppercase', marginTop: '0.2rem' }}>{level} Risk</div>
      </td>
    </motion.tr>
  )
}

/* ─── Mini Bar Chart ─────────────────────────────────────────── */
function MiniBarChart({ records }) {
  if (!records.length) return null
  const buckets = [
    { label: '0–30%', count: records.filter(r => r.risk_percentage <= 30).length,  color: '#10b981' },
    { label: '31–60%', count: records.filter(r => r.risk_percentage > 30 && r.risk_percentage <= 60).length, color: '#f59e0b' },
    { label: '61–100%', count: records.filter(r => r.risk_percentage > 60).length, color: '#f43f5e' },
  ]
  const max = Math.max(...buckets.map(b => b.count), 1)

  return (
    <div className="glass-card" style={{ padding: '1.8rem', marginBottom: '1.5rem' }}>
      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.4rem' }}>Risk Distribution</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '0.75rem', height: 80 }}>
        {buckets.map((b, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: b.color }}>{b.count}</span>
            <motion.div
              initial={{ height: 0 }} animate={{ height: `${(b.count / max) * 100}%` }}
              transition={{ duration: 0.9, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: '100%', background: `${b.color}33`, border: `1px solid ${b.color}55`, borderRadius: 6, minHeight: 4, position: 'relative', overflow: 'hidden' }}
            >
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%', background: `${b.color}66`, borderRadius: 6 }} />
            </motion.div>
            <span style={{ fontSize: '0.62rem', color: '#475569', fontWeight: 600 }}>{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Analytics Page ─────────────────────────────────────────── */
export default function Analytics() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter]   = useState('All')

  const fetchRecords = async () => {
    try {
      const resp = await fetch(`${API_BASE}/predictions`)
      if (resp.ok) setRecords(await resp.json())
    } catch (err) { console.error('Failed to fetch records:', err) }
    finally { setLoading(false) }
  }

  useEffect(() => {
    fetchRecords()
    const id = setInterval(fetchRecords, 6000)
    return () => clearInterval(id)
  }, [])

  const avgRisk   = records.length ? (records.reduce((a, r) => a + r.risk_percentage, 0) / records.length).toFixed(1) : '—'
  const highCount = records.filter(r => r.risk_percentage > 70).length
  const midCount  = records.filter(r => r.risk_percentage > 40 && r.risk_percentage <= 70).length
  const safeCount = records.filter(r => r.risk_percentage <= 40).length

  const FILTERS    = ['All', 'High', 'Medium', 'Low']
  const filtered   = filter === 'All' ? records : records.filter(r => riskLevel(r.risk_percentage) === filter)

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F1A', color: '#f1f5f9', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient blobs */}
      <div style={{ position: 'fixed', top: '-8%', right: '-5%', width: '35vw', height: '35vw', borderRadius: '50%', filter: 'blur(140px)', opacity: 0.12, background: 'radial-gradient(circle, #7C3AED, transparent)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', bottom: '-8%', left: '-5%', width: '30vw', height: '30vw', borderRadius: '50%', filter: 'blur(130px)', opacity: 0.1, background: 'radial-gradient(circle, #2563EB, transparent)', pointerEvents: 'none', zIndex: 0 }} />

      <Navbar />

      <div style={{ maxWidth: 1050, margin: '0 auto', padding: '6rem 1.5rem 5rem', position: 'relative', zIndex: 1 }}>

        {/* Page header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="badge" style={{ marginBottom: '0.8rem', display: 'inline-flex', background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.25)', color: '#6ee7b7' }}>
              <span className="badge-dot" style={{ background: '#10b981' }} />
              Live Analytics
            </span>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.04em', margin: 0, color: '#f1f5f9' }}>
              Prediction <span className="gradient-text">History</span>
            </h1>
            <p style={{ color: '#475569', marginTop: '0.5rem', fontSize: '0.92rem' }}>
              Real-time churn predictions across your customer base.
            </p>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#f1f5f9', lineHeight: 1, background: 'var(--grad-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              {records.length}
            </div>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Total Predictions</div>
          </motion.div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '1.2rem', marginBottom: '1.8rem' }}>
          <StatCard icon="📊" label="Avg Risk Score"  value={`${avgRisk}%`} accent="#7C3AED" delay={0.0} />
          <StatCard icon="🚨" label="High Risk"       value={highCount}      accent="#f43f5e" delay={0.08} />
          <StatCard icon="⚠️"  label="Medium Risk"    value={midCount}       accent="#f59e0b" delay={0.16} />
          <StatCard icon="🛡️" label="Retention Safe" value={safeCount}      accent="#10b981" delay={0.24} />
        </div>

        {/* Mini bar chart */}
        {records.length > 0 && <MiniBarChart records={records} />}

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '0.55rem', marginBottom: '1.8rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.45rem 1.2rem', borderRadius: 100, border: 'none',
                fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer',
                fontFamily: "'Space Grotesk', sans-serif", transition: 'all 0.25s ease',
                background: filter === f ? 'linear-gradient(135deg, #7C3AED, #2563EB)' : 'rgba(255,255,255,0.04)',
                color: filter === f ? '#fff' : '#475569',
                boxShadow: filter === f ? '0 4px 16px rgba(124,58,237,0.35)' : 'none',
                border: filter === f ? 'none' : '1px solid rgba(255,255,255,0.07)',
              }}
            >
              {f} {f !== 'All' && `(${records.filter(r => riskLevel(r.risk_percentage) === f).length})`}
            </button>
          ))}
          <button
            onClick={fetchRecords}
            style={{
              marginLeft: 'auto', padding: '0.45rem 1.1rem', borderRadius: 100,
              background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)',
              color: '#a78bfa', fontSize: '0.82rem', fontWeight: 700, cursor: 'pointer',
              fontFamily: "'Space Grotesk', sans-serif", transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(124,58,237,0.08)'}
          >↺ Refresh</button>
        </div>

        {/* Records list */}
        <div style={{ minHeight: 400 }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem', gap: '1.2rem' }}>
              <motion.div
                animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                style={{ width: 44, height: 44, borderRadius: '50%', border: '3px solid rgba(124,58,237,0.15)', borderTopColor: '#7C3AED' }}
              />
              <span style={{ color: '#475569', fontSize: '0.9rem' }}>Loading predictions…</span>
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              style={{ textAlign: 'center', padding: '5rem 2rem', background: 'rgba(255,255,255,0.02)', borderRadius: 24, border: '1px solid rgba(255,255,255,0.05)' }}
            >
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📭</div>
              <p style={{ color: '#475569', fontSize: '1rem' }}>
                {filter === 'All' ? 'No predictions yet. Start analysing customers to see data here.' : `No ${filter} risk customers found.`}
              </p>
            </motion.div>
          ) : (
            <div className="glass-table-container">
              <table className="glass-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Profile</th>
                    <th>Prediction History</th>
                    <th style={{ textAlign: 'right' }}>Risk Score</th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="popLayout">
                    {filtered.map((record, i) => (
                      <RecordTableRow key={record.id} record={record} index={i} />
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
