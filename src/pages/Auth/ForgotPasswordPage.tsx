import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowLeft, CheckCircle, Loader2, Send } from 'lucide-react'
import PageTransition from '../../components/shared/PageTransition'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [step, setStep] = useState<'form' | 'success'>('form')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!email.trim()) {
      setError('Please enter your email address.')
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email.trim())) {
      setError('Please enter a valid email address.')
      return
    }

    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    setStep('success')
  }

  return (
    <PageTransition>
      <div
        style={{
          minHeight: '100vh',
          background: 'var(--color-soul-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          fontFamily: 'var(--font-body)',
        }}
      >
        {/* Background decoration */}
        <div
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              right: '-10%',
              width: '500px',
              height: '500px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-20%',
              left: '-10%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)',
            }}
          />
        </div>

        <div style={{ width: '100%', maxWidth: '440px', position: 'relative', zIndex: 1 }}>
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: '1.5rem' }}
          >
            <Link
              to="/login"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--color-soul-text-muted)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                transition: 'color 0.2s',
              }}
            >
              <ArrowLeft size={16} />
              Back to Login
            </Link>
          </motion.div>

          <AnimatePresence mode="wait">
            {step === 'form' ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                <div
                  className="soul-card"
                  style={{
                    padding: '2.5rem',
                    borderRadius: '20px',
                    border: '1px solid var(--color-soul-border)',
                  }}
                >
                  {/* Icon header */}
                  <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                    <div
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.1))',
                        border: '1px solid var(--color-soul-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 1rem',
                      }}
                    >
                      <Mail size={28} style={{ color: 'var(--color-soul-primary)' }} />
                    </div>
                    <h1
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.8rem',
                        fontWeight: 700,
                        color: 'var(--color-soul-text)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      Forgot Password?
                    </h1>
                    <p style={{ color: 'var(--color-soul-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                      No worries! Enter your email address and we'll send you a link to reset your password.
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
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label className="soul-label" htmlFor="forgot-email">
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
                          id="forgot-email"
                          type="email"
                          className="soul-input"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{ paddingLeft: '2.5rem', width: '100%', boxSizing: 'border-box' }}
                          autoComplete="email"
                          autoFocus
                        />
                      </div>
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
                      {loading ? (
                        <Loader2 size={18} style={{ animation: 'forgotSpin 1s linear infinite' }} />
                      ) : (
                        <Send size={18} />
                      )}
                      {loading ? 'Sending…' : 'Send Reset Link'}
                    </button>
                  </form>

                  <p
                    style={{
                      textAlign: 'center',
                      marginTop: '1.5rem',
                      fontSize: '0.875rem',
                      color: 'var(--color-soul-text-muted)',
                    }}
                  >
                    Remember your password?{' '}
                    <Link
                      to="/login"
                      style={{ color: 'var(--color-soul-primary)', fontWeight: 600, textDecoration: 'none' }}
                    >
                      Sign in
                    </Link>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div
                  className="soul-card"
                  style={{
                    padding: '2.5rem',
                    borderRadius: '20px',
                    border: '1px solid var(--color-soul-border)',
                    textAlign: 'center',
                  }}
                >
                  {/* Success icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, type: 'spring', stiffness: 200 }}
                    style={{ marginBottom: '1.5rem' }}
                  >
                    <div
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'rgba(34,197,94,0.1)',
                        border: '2px solid rgba(34,197,94,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto',
                      }}
                    >
                      <CheckCircle size={40} style={{ color: '#22c55e' }} />
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >
                    <h2
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.8rem',
                        fontWeight: 700,
                        color: 'var(--color-soul-text)',
                        marginBottom: '0.75rem',
                      }}
                    >
                      Check your inbox
                    </h2>
                    <p
                      style={{
                        color: 'var(--color-soul-text-muted)',
                        fontSize: '0.9rem',
                        lineHeight: 1.7,
                        marginBottom: '0.5rem',
                      }}
                    >
                      We've sent a password reset link to
                    </p>
                    <p
                      style={{
                        color: 'var(--color-soul-primary)',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        marginBottom: '1.5rem',
                        wordBreak: 'break-all',
                      }}
                    >
                      {email}
                    </p>
                    <p
                      style={{
                        color: 'var(--color-soul-text-muted)',
                        fontSize: '0.85rem',
                        lineHeight: 1.6,
                        marginBottom: '2rem',
                      }}
                    >
                      The link will expire in 30 minutes. If you don't see the email, check your spam folder.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      <button
                        type="button"
                        onClick={() => { setStep('form'); setEmail(''); setError(''); }}
                        className="soul-btn-secondary"
                        style={{
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                        }}
                      >
                        Try a different email
                      </button>
                      <Link
                        to="/login"
                        className="soul-btn-primary"
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '0.75rem',
                          borderRadius: '12px',
                          fontSize: '0.9rem',
                          textDecoration: 'none',
                          textAlign: 'center',
                          boxSizing: 'border-box',
                        }}
                      >
                        Back to Login
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <style>{`
          @keyframes forgotSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        `}</style>
      </div>
    </PageTransition>
  )
}
