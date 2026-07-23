import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Shield, Calendar, Clock, MapPin, Navigation, User, Heart,
  MessageCircle, Sparkles, CheckCircle, Edit3, Star, Check,
  AlertCircle, FileText, ChevronRight
} from 'lucide-react';
import Sidebar from '../../components/layout/Sidebar';
import PageTransition from '../../components/shared/PageTransition';
import { useAuth } from '../../contexts/AuthContext';
import { getInitials } from '../../lib/utils';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

function InteractiveStarRating({
  rating,
  onRate
}: {
  rating: number;
  onRate: (rate: number) => void;
}) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hovered ?? rating);
        return (
          <button
            key={star}
            type="button"
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onRate(star)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '0.2rem',
              transition: 'transform 0.15s'
            }}
          >
            <Star
              size={22}
              fill={isFilled ? 'var(--color-soul-accent)' : 'none'}
              color={isFilled ? 'var(--color-soul-accent)' : 'var(--color-soul-border)'}
            />
          </button>
        );
      })}
      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-soul-text-muted)', marginLeft: '0.5rem' }}>
        {rating > 0 ? `${rating} / 5` : 'Select rating'}
      </span>
    </div>
  );
}

export default function SafeSpacePage() {
  const [reflectionText, setReflectionText] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  // Feedback Form State
  const [overallRating, setOverallRating] = useState(0);
  const [depthRating, setDepthRating] = useState(0);
  const [oneWord, setOneWord] = useState('');
  const [meetAgain, setMeetAgain] = useState<boolean | null>(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;
    setReflectionSaved(true);
    setTimeout(() => setReflectionSaved(false), 4000);
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (overallRating === 0 || depthRating === 0 || !oneWord.trim() || meetAgain === null) return;
    setFeedbackSubmitted(true);
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content" style={{ minHeight: '100vh', overflowY: 'auto', padding: '2rem' }}>
        <PageTransition>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{ maxWidth: '1200px', margin: '0 auto' }}
          >
            {/* ── Page Header ────────────────────────────────────────────────── */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '2rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                  <span style={{
                    padding: '0.3rem 0.8rem',
                    borderRadius: '100px',
                    background: 'rgba(201, 168, 106, 0.15)',
                    color: 'var(--color-soul-primary)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}>
                    <Shield size={13} color="var(--color-soul-accent)" />
                    Upcoming — Dec 18, 2024
                  </span>
                  <span style={{
                    padding: '0.3rem 0.8rem',
                    borderRadius: '100px',
                    background: sessionCompleted ? 'rgba(34, 197, 94, 0.12)' : 'rgba(74, 52, 40, 0.08)',
                    color: sessionCompleted ? '#16a34a' : 'var(--color-soul-text-muted)',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}>
                    {sessionCompleted ? 'Marked Completed' : 'Session Confirmed'}
                  </span>
                </div>
                <h1 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.25rem',
                  fontWeight: 600,
                  color: 'var(--color-soul-primary)',
                }}>
                  Safe Space Session
                </h1>
                <p style={{ fontSize: '0.95rem', color: 'var(--color-soul-text-muted)', marginTop: '0.2rem' }}>
                  A discreet, advisor-curated dialogue designed for deep human alignment
                </p>
              </div>

              <button
                onClick={() => setSessionCompleted(!sessionCompleted)}
                className={sessionCompleted ? 'soul-btn-secondary' : 'soul-btn-primary'}
                style={{ padding: '0.75rem 1.5rem', fontSize: '0.85rem' }}
              >
                {sessionCompleted ? (
                  <><Check size={16} /> Reopen Pre-Session View</>
                ) : (
                  <><CheckCircle size={16} /> Mark Session Complete</>
                )}
              </button>
            </motion.div>

            {/* ── Session Overview Card ───────────────────────────────────────── */}
            <motion.div
              variants={itemVariants}
              className="soul-card"
              style={{
                padding: '2.5rem',
                marginBottom: '2rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2.5rem',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ flex: '1 1 450px' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-soul-accent)', marginBottom: '0.5rem' }}>
                  Session Format
                </div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '1.25rem' }}>
                  Deep Dive Conversation
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-soul-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-soul-primary)' }}>
                      <Calendar size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-soul-text-muted)', fontWeight: 600 }}>DATE & TIME</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-soul-text)' }}>Wed, Dec 18 · 10:00 AM</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-soul-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-soul-primary)' }}>
                      <Clock size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-soul-text-muted)', fontWeight: 600 }}>DURATION</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-soul-text)' }}>90 Minutes</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-soul-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
                      <CheckCircle size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-soul-text-muted)', fontWeight: 600 }}>STATUS</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#16a34a' }}>Confirmed by both parties</div>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'var(--color-soul-surface)', border: '1px solid var(--color-soul-border)', display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <MapPin size={20} color="var(--color-soul-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-soul-primary)' }}>
                      The Oberoi, New Delhi — The Library Lounge
                    </div>
                    <div style={{ fontSize: '0.825rem', color: 'var(--color-soul-text-muted)', marginTop: '0.2rem', lineHeight: 1.5 }}>
                      Dr. Zakir Hussain Marg, Delhi Golf Club, New Delhi, 110003. Check in with the concierge under 'SoulMeet Confidential Reservation'.
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div style={{
                flex: '1 1 320px',
                height: '240px',
                borderRadius: '16px',
                background: 'var(--color-soul-surface)',
                border: '1.5px solid var(--color-soul-border)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: '1.5rem',
                textAlign: 'center'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-soul-primary)',
                  boxShadow: 'var(--shadow-card)',
                  marginBottom: '1rem'
                }}>
                  <Navigation size={24} color="var(--color-soul-accent)" />
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '0.25rem' }}>
                  Discrete Location Verified
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-soul-text-muted)', marginBottom: '1.25rem' }}>
                  Private table reserved in the quieter corner of the lounge.
                </p>
                <button
                  onClick={() => alert('Opening navigation directions to The Oberoi, New Delhi')}
                  className="soul-btn-secondary"
                  style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}
                >
                  View on Maps <ChevronRight size={14} />
                </button>
              </div>
            </motion.div>

            {/* ── Connection Brief Card & Conversation Guide ─────────────────── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              
              {/* Connection Brief */}
              <motion.div variants={itemVariants} className="soul-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                    <Heart size={16} color="var(--color-soul-accent)" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-soul-accent)' }}>
                      About Your Connection
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '0.4rem' }}>
                    Riya Khanna
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', marginBottom: '1.75rem' }}>
                    Your advisor has shared this brief to help you feel at ease and grounded before arrival
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', padding: '1.25rem', background: 'var(--color-soul-surface)', borderRadius: '16px', marginBottom: '1.75rem' }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'var(--color-soul-primary)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.6rem',
                      fontWeight: 600,
                      flexShrink: 0
                    }}>
                      RK
                    </div>
                    <div>
                      <div style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-soul-text)' }}>
                        Strategy Lead, McKinsey & Company
                      </div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', marginTop: '0.2rem' }}>
                        Sapphire Member · Verified Profile · Based in New Delhi
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '1.75rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-soul-text)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                      What You Have In Common
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {['Philosophy & Ethics', 'Long-form Thinking', 'Classical Architecture'].map((val, idx) => (
                        <span key={idx} style={{
                          padding: '0.4rem 1rem',
                          background: 'rgba(201, 168, 106, 0.12)',
                          color: 'var(--color-soul-primary)',
                          borderRadius: '100px',
                          fontSize: '0.85rem',
                          fontWeight: 600
                        }}>
                          {val}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div style={{ padding: '1.25rem', borderRadius: '14px', background: 'rgba(74, 52, 40, 0.05)', borderLeft: '4px solid var(--color-soul-primary)' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-soul-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                    Suggested Conversation Opener
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--color-soul-text)', fontStyle: 'italic', lineHeight: 1.6 }}>
                    "You might begin by asking about her recent work on behavioural strategy, or what drew her toward exploring philosophy outside corporate hours."
                  </p>
                </div>
              </motion.div>

              {/* Conversation Guide */}
              <motion.div variants={itemVariants} className="soul-card" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                    <Sparkles size={16} color="var(--color-soul-accent)" />
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-soul-accent)' }}>
                      Conversation Guide
                    </span>
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '0.4rem' }}>
                    Curated Dialogue Prompts
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', marginBottom: '1.75rem' }}>
                    Prepared exclusively by Dr. Priya Ramanathan for this specific pairing
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.75rem' }}>
                    {[
                      'What does a truly meaningful day look like for you when work is stripped away?',
                      'What is something you believe about human ambition that most people in your field do not?',
                      'When was the last time you felt genuinely seen by someone in your professional or personal life?',
                      'What are you currently unlearning about yourself or the way you relate to others?'
                    ].map((prompt, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: 'var(--color-soul-surface)',
                          color: 'var(--color-soul-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1rem',
                          fontWeight: 700,
                          flexShrink: 0
                        }}>
                          {idx + 1}
                        </div>
                        <p style={{ fontSize: '0.95rem', color: 'var(--color-soul-text)', lineHeight: 1.6 }}>
                          {prompt}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ padding: '1rem 1.25rem', borderRadius: '12px', background: 'var(--color-soul-surface)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <AlertCircle size={18} color="var(--color-soul-text-muted)" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-soul-text-muted)' }}>
                    These are gentle suggestions. Let the conversation breathe naturally without checking them like a checklist.
                  </span>
                </div>
              </motion.div>
            </div>

            {/* ── Pre-Session Reflection Journal ────────────────────────────── */}
            {!sessionCompleted ? (
              <motion.div variants={itemVariants} className="soul-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  <Edit3 size={16} color="var(--color-soul-accent)" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-soul-accent)' }}>
                    Pre-Session Reflection
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '0.4rem' }}>
                  Take a Moment Before Arriving
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', marginBottom: '1.5rem' }}>
                  Clarify your internal intention. This entry remains strictly private between you and your advisor.
                </p>

                <form onSubmit={handleSaveReflection}>
                  <textarea
                    className="soul-input"
                    rows={4}
                    placeholder="What are you hoping to feel or understand after this conversation? Are there any social guards you'd like to consciously relax today?"
                    value={reflectionText}
                    onChange={(e) => setReflectionText(e.target.value)}
                    style={{ resize: 'vertical', marginBottom: '1.25rem', fontSize: '0.95rem', lineHeight: 1.6 }}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                    <AnimatePresence mode="wait">
                      {reflectionSaved ? (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#16a34a', fontSize: '0.875rem', fontWeight: 600 }}
                        >
                          <CheckCircle size={18} /> Reflection saved securely to your private journal
                        </motion.div>
                      ) : (
                        <span style={{ fontSize: '0.8rem', color: 'var(--color-soul-text-muted)' }}>
                          Encrypted with bank-grade privacy standards
                        </span>
                      )}
                    </AnimatePresence>

                    <button type="submit" className="soul-btn-primary" style={{ padding: '0.75rem 2rem' }}>
                      Save Reflection
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              /* ── Post-Session Feedback Form ──────────────────────────────── */
              <motion.div variants={itemVariants} className="soul-card" style={{ padding: '2.5rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                  <CheckCircle size={16} color="#16a34a" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#16a34a' }}>
                    Post-Session Review
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '0.4rem' }}>
                  Reflect on Your Experience
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', marginBottom: '2rem' }}>
                  Your honest appraisal allows Dr. Priya to refine future introductions and track relational growth
                </p>

                {feedbackSubmitted ? (
                  <div style={{
                    padding: '2rem',
                    borderRadius: '16px',
                    background: 'rgba(34, 197, 94, 0.08)',
                    border: '1px solid rgba(34, 197, 94, 0.25)',
                    textAlign: 'center'
                  }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#16a34a', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                      <Check size={28} />
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: '#16a34a', marginBottom: '0.5rem' }}>
                      Feedback Submitted Successfully
                    </h4>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-soul-text-muted)', maxWidth: '500px', margin: '0 auto' }}>
                      Thank you for sharing your reflection. Dr. Priya Ramanathan will review your insights and prepare tailored follow-up notes.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitFeedback} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                      <div>
                        <label className="soul-label" style={{ marginBottom: '0.5rem' }}>
                          Overall Experience
                        </label>
                        <InteractiveStarRating rating={overallRating} onRate={setOverallRating} />
                      </div>
                      <div>
                        <label className="soul-label" style={{ marginBottom: '0.5rem' }}>
                          Depth of Conversation
                        </label>
                        <InteractiveStarRating rating={depthRating} onRate={setDepthRating} />
                      </div>
                    </div>

                    <div>
                      <label className="soul-label" style={{ marginBottom: '0.5rem' }}>
                        One word or phrase to describe this session
                      </label>
                      <input
                        className="soul-input"
                        type="text"
                        placeholder="e.g., Grounding, Intellectual, Unhurried, Nourishing..."
                        value={oneWord}
                        onChange={(e) => setOneWord(e.target.value)}
                      />
                    </div>

                    <div>
                      <label className="soul-label" style={{ marginBottom: '0.75rem' }}>
                        Would you be open to meeting Riya again for future dialogue?
                      </label>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                          type="button"
                          onClick={() => setMeetAgain(true)}
                          style={{
                            padding: '0.75rem 2rem',
                            borderRadius: '10px',
                            border: meetAgain === true ? '2px solid var(--color-soul-accent)' : '1px solid var(--color-soul-border)',
                            background: meetAgain === true ? 'var(--color-soul-primary)' : 'var(--color-soul-card)',
                            color: meetAgain === true ? '#FFFFFF' : 'var(--color-soul-text)',
                            fontWeight: meetAgain === true ? 600 : 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <Check size={16} /> Yes, definitely
                        </button>
                        <button
                          type="button"
                          onClick={() => setMeetAgain(false)}
                          style={{
                            padding: '0.75rem 2rem',
                            borderRadius: '10px',
                            border: meetAgain === false ? '2px solid var(--color-soul-accent)' : '1px solid var(--color-soul-border)',
                            background: meetAgain === false ? 'var(--color-soul-primary)' : 'var(--color-soul-card)',
                            color: meetAgain === false ? '#FFFFFF' : 'var(--color-soul-text)',
                            fontWeight: meetAgain === false ? 600 : 500,
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                        >
                          No, prefer different matches
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid var(--color-soul-border)' }}>
                      <button
                        type="submit"
                        disabled={overallRating === 0 || depthRating === 0 || !oneWord.trim() || meetAgain === null}
                        className="soul-btn-primary"
                        style={{
                          padding: '0.85rem 2.5rem',
                          opacity: overallRating === 0 || depthRating === 0 || !oneWord.trim() || meetAgain === null ? 0.5 : 1,
                          cursor: overallRating === 0 || depthRating === 0 || !oneWord.trim() || meetAgain === null ? 'not-allowed' : 'pointer'
                        }}
                      >
                        Submit Confidential Feedback
                      </button>
                    </div>
                  </form>
                )}
              </motion.div>
            )}

          </motion.div>
        </PageTransition>
      </main>
    </div>
  );
}
