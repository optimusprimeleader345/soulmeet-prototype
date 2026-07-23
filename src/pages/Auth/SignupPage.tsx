import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Eye, EyeOff, User, Lock, Loader2, Globe2, Apple } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import { getPasswordStrength } from '../../lib/utils'
import PageTransition from '../../components/shared/PageTransition'
import Logo from '../../components/shared/Logo'

interface StrengthMeta {
  label: string
  color: string
  width: string
}

function getStrengthMeta(score: number): StrengthMeta {
  switch (score) {
    case 0:
      return { label: 'Very Weak', color: '#ef4444', width: '10%' }
    case 1:
      return { label: 'Weak', color: '#f97316', width: '25%' }
    case 2:
      return { label: 'Fair', color: '#eab308', width: '50%' }
    case 3:
      return { label: 'Strong', color: '#22c55e', width: '75%' }
    case 4:
      return { label: 'Very Strong', color: '#16a34a', width: '100%' }
    default:
      return { label: '', color: 'transparent', width: '0%' }
  }
}

const DecorativePanel: React.FC = () => (
  <div
    style={{
      flex: 1,
      background: 'linear-gradient(135deg, #7c3aed 0%, var(--color-soul-primary) 50%, var(--color-soul-accent) 100%)',
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
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.07 }}
      xmlns="http://www.w3.org/2000/svg"
    >
      {[...Array(14)].map((_, i) => (
        <circle
          key={i}
          cx={`${(i % 4) * 33 + 16}%`}
          cy={`${Math.floor(i / 4) * 28 + 14}%`}
          r={`${55 + (i % 3) * 25}`}
          fill="none"
          stroke="white"
          strokeWidth="1.5"
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
        <Logo variant="hero" size="xl" color="white" />
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '3.5rem',
          fontWeight: 700,
          color: 'white',
          marginBottom: '0.75rem',
          letterSpacing: '-0.02em',
        }}
      >
        Begin Your Journey
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.2rem',
          color: 'rgba(255,255,255,0.8)',
          marginBottom: '2rem',
          fontStyle: 'italic',
          lineHeight: 1.6,
        }}
      >
        "Every love story is beautiful, but ours is my favourite."
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
        {[
          { icon: '🤝', title: 'Genuine Connections', desc: 'Meet people who share your values and vision' },
          { icon: '🔒', title: 'Safe & Verified', desc: 'All profiles are manually reviewed for authenticity' },
          { icon: '🧠', title: 'AI Compatibility', desc: 'Our algorithm finds your ideal soul match' },
        ].map((item) => (
          <div
            key={item.title}
            style={{
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '1rem',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{item.icon}</span>
            <div>
              <p style={{ color: 'white', fontWeight: 600, marginBottom: '0.2rem', fontFamily: 'var(--font-body)' }}>
                {item.title}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontFamily: 'var(--font-body)' }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
)

export default function SignupPage() {
  const navigate = useNavigate()
  const { signup } = useAuth()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [toastMsg, setToastMsg] = useState('')

  const strengthScore = password.length > 0 ? getPasswordStrength(password).score : -1
  const strengthMeta = strengthScore >= 0 ? getStrengthMeta(strengthScore) : null

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(''), 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!fullName.trim() || !email.trim() || !password || !confirmPassword) {
      setError('Please fill in all fields.')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (!agreedToTerms) {
      setError('Please accept the Terms of Service and Privacy Policy.')
      return
    }

    setLoading(true)
    try {
      await signup(fullName.trim(), email.trim(), password)
      navigate('/verify-otp')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create account. Please try again.'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = (provider: string) => {
    showToast(`${provider} signup is coming soon!`)
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
            overflowY: 'auto',
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ width: '100%', maxWidth: '440px', paddingBottom: '2rem' }}
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
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: 'var(--color-soul-text)',
                    marginBottom: '0.25rem',
                  }}
                >
                  Create Account
                </h2>
                <p style={{ color: 'var(--color-soul-text-muted)', fontSize: '0.88rem' }}>
                  Join thousands of souls finding meaningful connections
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
                {/* Full Name */}
                <div style={{ marginBottom: '1rem' }}>
                  <label className="soul-label" htmlFor="signup-name">
                    Full Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <User
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
                      id="signup-name"
                      type="text"
                      className="soul-input"
                      placeholder="Your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      style={{ paddingLeft: '2.5rem', width: '100%', boxSizing: 'border-box' }}
                      autoComplete="name"
                    />
                  </div>
                </div>

                {/* Email */}
                <div style={{ marginBottom: '1rem' }}>
                  <label className="soul-label" htmlFor="signup-email">
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
                      id="signup-email"
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

                {/* Password */}
                <div style={{ marginBottom: '0.5rem' }}>
                  <label className="soul-label" htmlFor="signup-password">
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock
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
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      className="soul-input"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ paddingLeft: '2.5rem', paddingRight: '2.8rem', width: '100%', boxSizing: 'border-box' }}
                      autoComplete="new-password"
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

                {/* Password strength bar */}
                {strengthMeta && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    style={{ marginBottom: '1rem' }}
                  >
                    <div
                      style={{
                        height: '4px',
                        borderRadius: '2px',
                        background: 'var(--color-soul-border)',
                        overflow: 'hidden',
                        marginBottom: '0.3rem',
                      }}
                    >
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: strengthMeta.width }}
                        transition={{ duration: 0.4 }}
                        style={{
                          height: '100%',
                          borderRadius: '2px',
                          background: strengthMeta.color,
                        }}
                      />
                    </div>
                    <p style={{ fontSize: '0.78rem', color: strengthMeta.color, textAlign: 'right' }}>
                      {strengthMeta.label}
                    </p>
                  </motion.div>
                )}

                {/* Confirm Password */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label className="soul-label" htmlFor="signup-confirm">
                    Confirm Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Lock
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
                      id="signup-confirm"
                      type={showConfirm ? 'text' : 'password'}
                      className="soul-input"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      style={{ paddingLeft: '2.5rem', paddingRight: '2.8rem', width: '100%', boxSizing: 'border-box' }}
                      autoComplete="new-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
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
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <p style={{ color: '#ef4444', fontSize: '0.78rem', marginTop: '0.25rem' }}>
                      Passwords do not match
                    </p>
                  )}
                </div>

                {/* Terms checkbox */}
                <div style={{ marginBottom: '1.5rem' }}>
                  <label
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.6rem',
                      cursor: 'pointer',
                      fontSize: '0.84rem',
                      color: 'var(--color-soul-text-muted)',
                      lineHeight: 1.5,
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      style={{ accentColor: 'var(--color-soul-primary)', marginTop: '2px', flexShrink: 0 }}
                    />
                    <span>
                      I agree to the{' '}
                      <Link
                        to="/terms"
                        style={{ color: 'var(--color-soul-primary)', textDecoration: 'none' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link
                        to="/privacy"
                        style={{ color: 'var(--color-soul-primary)', textDecoration: 'none' }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        Privacy Policy
                      </Link>
                    </span>
                  </label>
                </div>

                {/* Submit */}
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
                    <Loader2 size={18} style={{ animation: 'signupSpin 1s linear infinite' }} />
                  )}
                  {loading ? 'Creating account…' : 'Create Account'}
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
                Already have an account?{' '}
                <Link
                  to="/login"
                  style={{ color: 'var(--color-soul-primary)', fontWeight: 600, textDecoration: 'none' }}
                >
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </div>

        <style>{`
          .auth-left-panel { display: none; }
          @media (min-width: 769px) { .auth-left-panel { display: flex; } }
          @keyframes signupSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </PageTransition>
  )
}
