import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.25, 0.8, 0.25, 1] },
  }),
}

const features = [
  { icon: '🧠', title: 'Deep Neural Profiling', desc: 'Proprietary neural engine processes dozens of behavioral markers simultaneously, uncovering hidden churn risks.', color: '#a78bfa', span: '2 / span 2', rowSpan: '1 / span 2', hero: true },
  { icon: '⚡', title: 'Sub-ms Performance', desc: 'Blazing-fast predictions optimised for enterprise scale.', color: '#60a5fa' },
  { icon: '🛡️', title: 'Military Encryption', desc: 'State-of-the-art security protecting your data at rest and in transit.', color: '#34d399' },
  { icon: '🎯', title: 'Smart Risk Factors', desc: 'Understand exactly WHY a customer might leave.', color: '#fb7185' },
  { icon: '📊', title: 'Explainable AI', desc: 'Transparent insights — no black boxes, just clear decisions.', color: '#fbbf24', wide: true },
]

const steps = [
  { num: '01', title: 'Enter Customer Data', desc: 'Fill in the profile — age, tenure, charges, services, and contract type.', color: '#a78bfa' },
  { num: '02', title: 'AI Analysis', desc: 'Neural network analyzes the profile across multiple risk dimensions in real-time.', color: '#60a5fa' },
  { num: '03', title: 'Get Insights', desc: 'Receive churn probability, risk factors, and targeted retention strategies.', color: '#34d399' },
]

const stats = [
  { value: '95.2%', label: 'Model Accuracy', icon: '📈' },
  { value: '<50ms', label: 'Response Time',  icon: '⚡' },
  { value: '10k+',  label: 'Predictions',    icon: '🔮' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#0B0F1A', color: '#f1f5f9', position: 'relative', overflow: 'hidden' }}>
      {/* Ambient blobs */}
      <div className="blob" style={{ width: '50vw', height: '50vw', top: '-15%', left: '-10%', opacity: 0.18, background: 'radial-gradient(circle, #7C3AED, transparent 70%)' }} />
      <div className="blob" style={{ width: '40vw', height: '40vw', bottom: '5%', right: '-5%', opacity: 0.14, background: 'radial-gradient(circle, #2563EB, transparent 70%)' }} />

      <Navbar />

      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '7rem 1.5rem 4rem',
        position: 'relative', zIndex: 1,
      }}>
        <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }} style={{ marginBottom: '2rem' }}>
          <span className="badge">
            <span className="badge-dot" />
            Next-Gen Customer Intelligence
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', fontWeight: 900, lineHeight: 0.93, letterSpacing: '-0.05em', maxWidth: 1000, marginBottom: '1.8rem', color: '#f1f5f9' }}
        >
          Stop Churn with<br />
          <span className="gradient-text">Predictive&nbsp;AI</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          style={{ color: '#94a3b8', fontSize: 'clamp(1.1rem, 2.2vw, 1.4rem)', maxWidth: 640, lineHeight: 1.65, marginBottom: '3rem', fontWeight: 400 }}
        >
          Harness neural networks to identify high-risk customers and receive automated
          retention playbooks — before they churn.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '4rem' }}
        >
          <button className="gradient-btn" onClick={() => navigate('/auth')} style={{ padding: '1.05rem 2.8rem', fontSize: '1.05rem' }}>
            Get Started Free ✨
          </button>
          <button
            className="gradient-btn-outline"
            onClick={() => document.getElementById('features').scrollIntoView({ behavior: 'smooth' })}
            style={{ padding: '1.05rem 2.4rem', fontSize: '1rem' }}
          >
            See How It Works →
          </button>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}
        >
          {stats.map((s, i) => (
            <div key={i} className="stat-pill">
              <span>{s.icon}</span>
              <span style={{ background: 'var(--grad-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '1rem', fontWeight: 900 }}>{s.value}</span>
              <span style={{ color: '#475569', fontWeight: 500, fontSize: '0.78rem' }}>{s.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── FEATURES BENTO ── */}
      <section id="features" style={{ padding: '8rem 1.5rem', maxWidth: 1220, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <span className="badge" style={{ marginBottom: '1.2rem', display: 'inline-flex' }}>Features</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 900, letterSpacing: '-0.04em', color: '#f1f5f9' }}>
              Built for <span className="gradient-text">modern teams</span>
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.05rem', marginTop: '1rem' }}>
              Everything you need to reduce churn and protect revenue.
            </p>
          </motion.div>
        </div>

        <div className="bento-grid" style={{ gridAutoRows: 'minmax(200px, auto)' }}>
          {/* Hero card */}
          <motion.div
            className="glass-card glass-card-hover"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ gridColumn: 'span 2', gridRow: 'span 2', padding: '3.5rem', borderColor: 'rgba(124,58,237,0.25)', background: 'rgba(124,58,237,0.06)' }}
          >
            <div style={{ fontSize: '3.2rem', marginBottom: '2rem' }}>🧠</div>
            <h3 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1rem', color: '#f1f5f9' }}>Deep Neural Profiling</h3>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.7 }}>
              Our proprietary neural engine processes dozens of behavioral markers simultaneously,
              uncovering hidden churn risks traditional models miss entirely.
            </p>
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '0.9rem', flexWrap: 'wrap' }}>
              <div style={{ background: 'linear-gradient(135deg, #7C3AED, #2563EB)', padding: '0.55rem 1.3rem', borderRadius: 100, color: '#fff', fontWeight: 800, fontSize: '0.85rem', boxShadow: '0 4px 16px rgba(124,58,237,0.4)' }}>⚡ 95.2% Accuracy</div>
              <div style={{ background: 'rgba(255,255,255,0.04)', padding: '0.55rem 1.3rem', borderRadius: 100, color: '#94a3b8', fontWeight: 700, fontSize: '0.85rem', border: '1px solid rgba(255,255,255,0.08)' }}>Real-time Inference</div>
            </div>
          </motion.div>

          {/* Speed */}
          <motion.div className="glass-card glass-card-hover" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ padding: '2.5rem' }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '1.3rem' }}>⚡</div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.65rem', color: '#f1f5f9' }}>Sub-ms Performance</h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>Blazing-fast predictions optimised for enterprise scale.</p>
          </motion.div>

          {/* Security */}
          <motion.div className="glass-card glass-card-hover" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} style={{ padding: '2.5rem' }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '1.3rem' }}>🛡️</div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.65rem', color: '#f1f5f9' }}>Military Encryption</h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>State-of-the-art security protecting your data at rest & in transit.</p>
          </motion.div>

          {/* Smart */}
          <motion.div className="glass-card glass-card-hover" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ padding: '2.5rem' }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '1.3rem' }}>🎯</div>
            <h4 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.65rem', color: '#f1f5f9' }}>Smart Risk Factors</h4>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>Understand exactly WHY a customer might leave with reason generation.</p>
          </motion.div>

          {/* Wide explainable */}
          <motion.div
            className="glass-card glass-card-hover"
            initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.25 }}
            style={{ gridColumn: 'span 2', padding: '2.5rem 3rem', display: 'flex', alignItems: 'center', gap: '2.5rem' }}
          >
            <div style={{ fontSize: '3.5rem', flexShrink: 0 }}>📊</div>
            <div>
              <h4 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.65rem', color: '#f1f5f9' }}>Explainable Decisions</h4>
              <p style={{ color: '#94a3b8', fontSize: '1rem', lineHeight: 1.6 }}>Transparent AI insights that tell you exactly why a customer is at risk — no black boxes.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '8rem 1.5rem', position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.04)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <span className="badge" style={{ marginBottom: '1.2rem', display: 'inline-flex', background: 'rgba(16,185,129,0.1)', borderColor: 'rgba(16,185,129,0.25)', color: '#6ee7b7' }}>
                <span className="badge-dot" style={{ background: '#10b981' }} /> How It Works
              </span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#f1f5f9' }}>
                Three steps to <span className="gradient-text">save every customer</span>
              </h2>
            </motion.div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
            {steps.map((step, i) => (
              <motion.div
                key={i} className="glass-card"
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                style={{ padding: '2.5rem' }}
              >
                <div style={{ fontSize: '2.8rem', fontWeight: 900, background: 'var(--grad-text)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.2rem' }}>{step.num}</div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.65rem', color: '#f1f5f9' }}>{step.title}</h4>
                <p style={{ color: '#64748b', lineHeight: 1.65, fontSize: '0.92rem' }}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: '8rem 1.5rem', position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          style={{
            maxWidth: 700, margin: '0 auto',
            background: 'linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(37,99,235,0.08) 100%)',
            borderRadius: 32, padding: '5rem 3rem',
            border: '1px solid rgba(124,58,237,0.2)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4), 0 0 40px rgba(124,58,237,0.1)',
          }}
        >
          <div style={{ fontSize: '3.5rem', marginBottom: '1.5rem' }}>🚀</div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-0.03em', color: '#f1f5f9', marginBottom: '1rem' }}>
            Ready to reduce churn <span className="gradient-text">today?</span>
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.05rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
            Join smart businesses using ChurnGuard AI to protect their revenue and grow customer loyalty.
          </p>
          <button className="gradient-btn" onClick={() => navigate('/auth')} style={{ padding: '1.1rem 3.2rem', fontSize: '1.05rem' }}>
            Start Free — No Credit Card Needed
          </button>
        </motion.div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '4rem 2rem 2.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: 'linear-gradient(135deg, #7C3AED, #2563EB)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>🛡️</div>
          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f1f5f9' }}>ChurnGuard</span>
          <span style={{ fontSize: '0.6rem', fontWeight: 800, color: '#fff', background: 'linear-gradient(135deg, #7C3AED, #2563EB)', borderRadius: 6, padding: '0.15rem 0.45rem' }}>AI</span>
        </Link>
        <p style={{ color: '#475569', fontSize: '0.9rem', marginBottom: '0.4rem' }}>Protecting revenue through proactive intelligence.</p>
        <p style={{ color: '#334155', fontSize: '0.8rem' }}>© 2026 ChurnGuard AI — Crafted with ❤️</p>
      </footer>
    </div>
  )
}
