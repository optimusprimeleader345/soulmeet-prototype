import React, { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShieldCheck, Loader2, RefreshCw, ArrowLeft } from 'lucide-react'
import PageTransition from '../../components/shared/PageTransition'

const OTP_LENGTH = 6
const RESEND_COUNTDOWN = 30

export default function OTPVerificationPage() {
  const navigate = useNavigate()

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [countdown, setCountdown] = useState(RESEND_COUNTDOWN)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)

  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(OTP_LENGTH).fill(null))

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown])

  const focusInput = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(OTP_LENGTH - 1, index))
    inputRefs.current[clamped]?.focus()
  }, [])

  const handleChange = useCallback(
    (index: number, value: string) => {
      // Only allow digits
      const digit = value.replace(/\D/g, '').slice(-1)
      setOtp((prev) => {
        const next = [...prev]
        next[index] = digit
        return next
      })
      if (digit && index < OTP_LENGTH - 1) {
        focusInput(index + 1)
      }
      setError('')
    },
    [focusInput]
  )

  const handleKeyDown = useCallback(
    (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace') {
        if (otp[index]) {
          setOtp((prev) => {
            const next = [...prev]
            next[index] = ''
            return next
          })
        } else if (index > 0) {
          focusInput(index - 1)
          setOtp((prev) => {
            const next = [...prev]
            next[index - 1] = ''
            return next
          })
        }
      } else if (e.key === 'ArrowLeft' && index > 0) {
        focusInput(index - 1)
      } else if (e.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
        focusInput(index + 1)
      }
    },
    [otp, focusInput]
  )

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault()
      const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
      if (!pasted) return
      const next = Array(OTP_LENGTH).fill('')
      pasted.split('').forEach((char, i) => {
        next[i] = char
      })
      setOtp(next)
      setError('')
      // Focus the next empty slot or last slot
      const nextFocus = Math.min(pasted.length, OTP_LENGTH - 1)
      focusInput(nextFocus)
    },
    [focusInput]
  )

  const handleVerify = async () => {
    const code = otp.join('')
    if (code.length < OTP_LENGTH) {
      setError('Please enter all 6 digits.')
      return
    }
    setError('')
    setLoading(true)
    // Simulate verification — accept any 6 digits
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setLoading(false)
    navigate('/apply')
  }

  const handleResend = async () => {
    if (countdown > 0 || resendLoading) return
    setResendLoading(true)
    setResendSuccess(false)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setResendLoading(false)
    setResendSuccess(true)
    setCountdown(RESEND_COUNTDOWN)
    setOtp(Array(OTP_LENGTH).fill(''))
    focusInput(0)
    setTimeout(() => setResendSuccess(false), 3000)
  }

  const filledCount = otp.filter((d) => d !== '').length

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
        {/* Background blobs */}
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          <div
            style={{
              position: 'absolute',
              top: '-15%',
              left: '-10%',
              width: '450px',
              height: '450px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-15%',
              right: '-10%',
              width: '400px',
              height: '400px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(236,72,153,0.06) 0%, transparent 70%)',
            }}
          />
        </div>

        <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            style={{ marginBottom: '1.5rem' }}
          >
            <Link
              to="/signup"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--color-soul-text-muted)',
                textDecoration: 'none',
                fontSize: '0.875rem',
              }}
            >
              <ArrowLeft size={16} />
              Back to Sign Up
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <div
              className="soul-card"
              style={{
                padding: '2.5rem',
                borderRadius: '20px',
                border: '1px solid var(--color-soul-border)',
              }}
            >
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1, type: 'spring', stiffness: 200 }}
                  style={{ marginBottom: '1.25rem' }}
                >
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(139,92,246,0.15), rgba(236,72,153,0.1))',
                      border: '1px solid var(--color-soul-border)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                    }}
                  >
                    <ShieldCheck size={32} style={{ color: 'var(--color-soul-primary)' }} />
                  </div>
                </motion.div>

                <h1
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.8rem',
                    fontWeight: 700,
                    color: 'var(--color-soul-text)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Verify your identity
                </h1>
                <p style={{ color: 'var(--color-soul-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  We sent a 6-digit code to your email address. Enter it below to continue.
                </p>
              </div>

              {/* Error message */}
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
                    marginBottom: '1.25rem',
                    textAlign: 'center',
                  }}
                >
                  {error}
                </motion.div>
              )}

              {/* Resend success */}
              {resendSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    background: 'rgba(34,197,94,0.1)',
                    border: '1px solid rgba(34,197,94,0.3)',
                    color: '#22c55e',
                    borderRadius: '10px',
                    padding: '0.75rem 1rem',
                    fontSize: '0.875rem',
                    marginBottom: '1.25rem',
                    textAlign: 'center',
                  }}
                >
                  ✓ A new code has been sent to your email!
                </motion.div>
              )}

              {/* OTP input boxes */}
              <div
                style={{
                  display: 'flex',
                  gap: '0.6rem',
                  justifyContent: 'center',
                  marginBottom: '1.75rem',
                }}
              >
                {otp.map((digit, index) => (
                  <motion.input
                    key={index}
                    ref={(el) => { inputRefs.current[index] = el }}
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    onFocus={(e) => e.target.select()}
                    autoFocus={index === 0}
                    className="otp-input"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    style={{
                      width: '48px',
                      height: '56px',
                      textAlign: 'center',
                      fontSize: '1.4rem',
                      fontWeight: 700,
                      fontFamily: 'var(--font-body)',
                      borderRadius: '12px',
                      border: digit
                        ? '2px solid var(--color-soul-primary)'
                        : '2px solid var(--color-soul-border)',
                      background: 'var(--color-soul-card)',
                      color: 'var(--color-soul-text)',
                      outline: 'none',
                      transition: 'border-color 0.2s, box-shadow 0.2s',
                      boxShadow: digit
                        ? '0 0 0 3px rgba(139,92,246,0.15)'
                        : 'none',
                      cursor: 'text',
                    }}
                  />
                ))}
              </div>

              {/* Progress indicator */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div
                  style={{
                    height: '3px',
                    borderRadius: '2px',
                    background: 'var(--color-soul-border)',
                    overflow: 'hidden',
                  }}
                >
                  <motion.div
                    animate={{ width: `${(filledCount / OTP_LENGTH) * 100}%` }}
                    transition={{ duration: 0.3 }}
                    style={{
                      height: '100%',
                      borderRadius: '2px',
                      background: 'linear-gradient(90deg, var(--color-soul-primary), var(--color-soul-accent))',
                    }}
                  />
                </div>
                <p
                  style={{
                    textAlign: 'right',
                    fontSize: '0.78rem',
                    color: 'var(--color-soul-text-muted)',
                    marginTop: '0.3rem',
                  }}
                >
                  {filledCount} / {OTP_LENGTH} digits entered
                </p>
              </div>

              {/* Verify button */}
              <button
                type="button"
                onClick={handleVerify}
                disabled={loading || filledCount < OTP_LENGTH}
                className="soul-btn-primary"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.9rem',
                  fontSize: '1rem',
                  borderRadius: '12px',
                  marginBottom: '1.25rem',
                  opacity: loading || filledCount < OTP_LENGTH ? 0.65 : 1,
                  cursor: loading || filledCount < OTP_LENGTH ? 'not-allowed' : 'pointer',
                  transition: 'opacity 0.2s',
                }}
              >
                {loading ? (
                  <>
                    <Loader2 size={18} style={{ animation: 'otpSpin 1s linear infinite' }} />
                    Verifying…
                  </>
                ) : (
                  <>
                    <ShieldCheck size={18} />
                    Verify Code
                  </>
                )}
              </button>

              {/* Resend */}
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-soul-text-muted)', marginBottom: '0.5rem' }}>
                  Didn't receive the code?
                </p>
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={countdown > 0 || resendLoading}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    background: 'none',
                    border: 'none',
                    cursor: countdown > 0 || resendLoading ? 'not-allowed' : 'pointer',
                    color: countdown > 0 || resendLoading ? 'var(--color-soul-text-muted)' : 'var(--color-soul-primary)',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    padding: 0,
                    transition: 'color 0.2s',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {resendLoading ? (
                    <Loader2 size={14} style={{ animation: 'otpSpin 1s linear infinite' }} />
                  ) : (
                    <RefreshCw size={14} />
                  )}
                  {countdown > 0 ? `Resend code in ${countdown}s` : resendLoading ? 'Sending…' : 'Resend code'}
                </button>
              </div>

              {/* Security notice */}
              <div
                style={{
                  marginTop: '1.5rem',
                  padding: '0.75rem 1rem',
                  background: 'rgba(139,92,246,0.06)',
                  border: '1px solid rgba(139,92,246,0.15)',
                  borderRadius: '10px',
                  fontSize: '0.8rem',
                  color: 'var(--color-soul-text-muted)',
                  textAlign: 'center',
                  lineHeight: 1.5,
                }}
              >
                🔒 This code expires in 10 minutes. Never share your OTP with anyone.
              </div>
            </div>
          </motion.div>
        </div>

        <style>{`
          @keyframes otpSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
          .otp-input:focus {
            border-color: var(--color-soul-primary) !important;
            box-shadow: 0 0 0 3px rgba(139,92,246,0.2) !important;
          }
        `}</style>
      </div>
    </PageTransition>
  )
}
