import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Eye, EyeOff, Loader2, Globe2, Apple } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import PageTransition from '../../components/shared/PageTransition'
import Logo from '../../components/shared/Logo'

const DecorativePanel: React.FC = () => (
  <div
    style={{
      flex: 1,
      background: 'linear-gradient(135deg, var(--color-soul-primary) 0%, #7c3aed 60%, var(--color-soul-accent) 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '3rem',
      position: 'relative',
      overflow: 'hidden',
      minHeight: '100vh',
    }}
  >
    <svg
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.08 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {[...Array(12)].map((_, i) => (
        <circle
          key={i}
          cx={`${(i % 4) * 33 + 16}%`}
          cy={`${Math.floor(i / 4) * 34 + 17}%`}
          r={`${60 + (i % 3) * 30}`}
          fill="none"
          stroke="white"
          strokeWidth="1.5"
        />
      ))}
      {[...Array(8)].map((_, i) => (
        <circle
          key={`filled-${i}`}
          cx={`${(i % 4) * 25 + 12}%`}
          cy={`${Math.floor(i / 4) * 50 + 25}%`}
          r={`${4 + (i % 3) * 3}`}
          fill="white"
          opacity="0.3"
        />
      ))}
    </svg>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '480px' }}
    >
      <div style={{ marginBottom: '1.5rem' }}>
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            fontSize: '2.5rem',
          }}
        >
          🌸
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <Logo variant="hero" size="xl" color="white" />
      </div>
      <p
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.1rem',
          color: 'rgba(255,255,255,0.7)',
          marginBottom: '2.5rem',
          fontStyle: 'italic',
        }}
      >
        Where souls find their match
      </p>

      <blockquote
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.4rem',
          fontWeight: 400,
          color: 'rgba(255,255,255,0.9)',
          lineHeight: 1.6,
          fontStyle: 'italic',
          borderLeft: '3px solid rgba(255,255,255,0.4)',
          paddingLeft: '1.5rem',
          textAlign: 'left',
          marginBottom: '2rem',
        }}
      >
        "The best love is the kind that awakens the soul; that makes us reach for more, that plants a fire in our hearts."
      </blockquote>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', fontFamily: 'var(--font-body)' }}>
        — Nicholas Sparks
      </p>

      <div
        style={{
          marginTop: '3rem',
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {['10K+ Members', 'AI-Powered Matches', 'Safe & Private'].map((tag) => (
          <span
            key={tag}
            style={{
              padding: '0.4rem 1rem',
              borderRadius: '20px',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.25)',
              color: 'white',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-body)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  </div>
)

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [toastMsg, setToastMsg] = useState('')

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    try {
      await login(email.trim(), password)
      navigate('/dashboard')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Invalid credentials. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    showToast(`${provider} login is coming soon!`)
  }

  return (
    <PageTransition>
      <div
        style={{
          display: 'flex',
          minHeight: '100vh',
          background: 'var(--color-soul-bg)',
          fontFamily: 'var(--font-body)',
        }}
      >
        <div className="auth-left-panel">
          <DecorativePanel />
        </div>

        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: 'var(--color-soul-bg)',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ width: '100%', maxWidth: '440px' }}
          >
            {toastMsg && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  background: '#1e293b',
                  color: 'white',
                  padding: '0.75rem 1rem',
                  borderRadius: '10px',
                  marginBottom: '1rem',
                  fontSize: '0.9rem',
                  textAlign: 'center',
                }}
              >
                {toastMsg}
              </motion.div>
            )}

            <div
              className="soul-card"
              style={{
                padding: '2.5rem',
                borderRadius: '20px',
                border: '1px solid var(--color-soul-border)',
              }}
            >
              <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center' }}>
                  <Logo variant="full" size="md" color="primary" orientation="vertical" />
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.3rem',
                    fontWeight: 400,
                    color: 'var(--color-soul-text)',
                    fontStyle: 'italic',
                  }}
                >
                  Welcome back
                </p>
                <p style={{ color: 'var(--color-soul-text-muted)', fontSize: '0.88rem', marginTop: '0.25rem' }}>
                  Sign in to continue your journey
                </p>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: 'rgba(239,68,68,0.1)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    color: '#ef4444',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    fontSize: '0.875rem',
                    marginBottom: '1rem',
                  }}
                >
                  {error}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div style={{ marginBottom: '1.1rem' }}>
                  <label className="soul-label" htmlFor="login-email">
                    Email Address
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail
                      size={16}
                      style={{
                        position: 'absolute',
                        left: '0.85rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--color-soul-text-muted)',
                      }}
                    />
                    <input
                      id="login-email"
                      type="email"
                      className="soul-input"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ paddingLeft: '2.5rem', width: '100%', boxSizing: 'border-box' }}
                      autoComplete="email"
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '0.75rem' }}>
                  <label className="soul-label" htmlFor="login-password">
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      className="soul-input"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ paddingRight: '2.8rem', width: '100%', boxSizing: 'border-box' }}
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '0.85rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--color-soul-text-muted)',
                        padding: 0,
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.5rem',
                  }}
                >
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      color: 'var(--color-soul-text-muted)',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{ accentColor: 'var(--color-soul-primary)' }}
                    />
                    Remember me
                  </label>
                  <Link
                    to="/forgot-password"
                    style={{ fontSize: '0.875rem', color: 'var(--color-soul-primary)', textDecoration: 'none' }}
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className="soul-btn-primary"
                  disabled={loading}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.85rem',
                    fontSize: '1rem',
                    borderRadius: '12px',
                    opacity: loading ? 0.75 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading && (
                    <Loader2
                      size={18}
                      style={{ animation: 'loginSpin 1s linear infinite' }}
                    />
                  )}
                  {loading ? 'Signing in…' : 'Sign In'}
                </button>
              </form>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  margin: '1.5rem 0',
                }}
              >
                <div style={{ flex: 1, height: '1px', background: 'var(--color-soul-border)' }} />
                <span style={{ fontSize: '0.8rem', color: 'var(--color-soul-text-muted)', whiteSpace: 'nowrap' }}>
                  or continue with
                </span>
                <div style={{ flex: 1, height: '1px', background: 'var(--color-soul-border)' }} />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Google')}
                  className="soul-btn-secondary"
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.7rem',
                    borderRadius: '10px',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                  }}
                >
                  <Globe2 size={16} />
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => handleSocialLogin('Apple')}
                  className="soul-btn-secondary"
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.7rem',
                    borderRadius: '10px',
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                  }}
                >
                  <Apple size={16} />
                  Apple
                </button>
              </div>

              <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-soul-text-muted)' }}>
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  style={{ color: 'var(--color-soul-primary)', fontWeight: 600, textDecoration: 'none' }}
                >
                  Sign up
                </Link>
              </p>

              <div
                style={{
                  marginTop: '1.25rem',
                  background: 'rgba(251,191,36,0.1)',
                  border: '1px solid rgba(251,191,36,0.35)',
                  borderRadius: '10px',
                  padding: '0.85rem 1rem',
                  fontSize: '0.8rem',
                  color: 'var(--color-soul-text-muted)',
                }}
              >
                <p style={{ fontWeight: 600, color: '#d97706', marginBottom: '0.3rem' }}>🔑 Demo Credentials</p>
                <p style={{ marginBottom: '0.15rem' }}>
                  <strong>Email:</strong> demo@soulmeet.com
                </p>
                <p>
                  <strong>Password:</strong> Demo@1234
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <style>{`
          .auth-left-panel { display: none; }
          @media (min-width: 769px) { .auth-left-panel { display: flex; } }
          @keyframes loginSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </PageTransition>
  )
}
