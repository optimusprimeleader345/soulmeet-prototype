import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  CheckCircle, Edit3, Shield, Star, Calendar,
  Eye, Users, Heart, MessageSquare,
} from 'lucide-react';
import Sidebar from '../../components/layout/Sidebar';
import PageTransition from '../../components/shared/PageTransition';
import { useAuth } from '../../contexts/AuthContext';
import { MOCK_USER, MOCK_ADVISORS } from '../../data/mock';
import { getInitials, formatDate } from '../../lib/utils';

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' as const } },
};

// ─── Section Heading ──────────────────────────────────────────────────────────

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.2rem',
        fontWeight: 600,
        color: 'var(--color-soul-primary)',
        marginBottom: '1rem',
      }}
    >
      {children}
    </h3>
  );
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────

function ToggleSwitch({
  id,
  checked,
  onChange,
  label,
  description,
}: {
  id: string;
  checked: boolean;
  onChange: () => void;
  label: string;
  description: string;
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: '1.5rem',
        padding: '1rem 0',
        borderBottom: '1px solid var(--color-soul-border-light)',
      }}
    >
      <div>
        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-soul-text)', marginBottom: '0.2rem' }}>
          {label}
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--color-soul-text-muted)', lineHeight: 1.5 }}>
          {description}
        </div>
      </div>

      <label
        htmlFor={id}
        style={{
          position: 'relative',
          display: 'inline-block',
          width: '46px',
          height: '26px',
          flexShrink: 0,
          cursor: 'pointer',
        }}
      >
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          style={{ opacity: 0, width: 0, height: 0, position: 'absolute' }}
        />
        <span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '13px',
            background: checked ? 'var(--color-soul-accent)' : 'var(--color-soul-border)',
            transition: 'background 0.25s ease',
          }}
        />
        <span
          style={{
            position: 'absolute',
            left: checked ? '22px' : '3px',
            top: '3px',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: checked ? 'var(--color-soul-primary)' : '#fff',
            boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
            transition: 'left 0.25s ease',
          }}
        />
      </label>
    </div>
  );
}

// ─── Star Rating ──────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={13}
          fill={star <= Math.round(rating) ? 'var(--color-soul-accent)' : 'none'}
          color={star <= Math.round(rating) ? 'var(--color-soul-accent)' : 'var(--color-soul-border)'}
        />
      ))}
    </div>
  );
}

// ─── Values & Interests Data ──────────────────────────────────────────────────

const coreValues = [
  'Authenticity',
  'Depth over breadth',
  'Intellectual curiosity',
  'Kindness',
  'Honesty',
  'Presence',
];

const interests = [
  'Philosophy',
  'Architecture',
  'Classical music',
  'Distance running',
  'Cooking',
  'Travel writing',
];

const goals = [
  {
    title: 'Deepen existing friendships',
    description: 'Invest meaningfully in the relationships I already have — showing up with more presence and intentionality.',
    icon: Heart,
    color: '#C9A86A',
    bg: 'rgba(201,168,106,0.1)',
  },
  {
    title: 'Find a thinking partner',
    description: 'Connect with someone who loves to wrestle with ideas — philosophy, systems, the nature of things.',
    icon: Users,
    color: '#4A3428',
    bg: 'rgba(74,52,40,0.08)',
  },
  {
    title: 'Build community around shared values',
    description: 'Be part of a small, intentional group of people who value depth, honesty, and genuine human connection.',
    icon: Shield,
    color: '#4A6647',
    bg: 'rgba(168,184,165,0.2)',
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { user } = useAuth();
  const currentUser = user ?? MOCK_USER;

  const [privacySettings, setPrivacySettings] = useState({
    profileVisible: true,
    allowIntroductions: true,
    shareHealthWithAdvisor: true,
  });

  const toggle = (key: keyof typeof privacySettings) => {
    setPrivacySettings((prev) => ({ ...prev, [key]: !prev[key] }));
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
            style={{ maxWidth: '960px', margin: '0 auto' }}
          >

            {/* ── Profile Header Card ──────────────────────────────────────── */}
            <motion.div
              variants={itemVariants}
              className="soul-card"
              style={{
                padding: '2rem',
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1.75rem',
                flexWrap: 'wrap',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background gradient */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(201,168,106,0.04) 0%, transparent 60%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Avatar */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'var(--color-soul-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-soul-accent)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  flexShrink: 0,
                  border: '3px solid var(--color-soul-accent)',
                  letterSpacing: '0.02em',
                  overflow: 'hidden',
                }}
              >
                {currentUser.avatar ? (
                  <img src={currentUser.avatar} alt={currentUser.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  getInitials(currentUser.name)
                )}
              </div>

              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <h1
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.85rem',
                        fontWeight: 600,
                        color: 'var(--color-soul-primary)',
                        lineHeight: 1.15,
                        marginBottom: '0.25rem',
                      }}
                    >
                      {currentUser.name}
                    </h1>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-soul-text-muted)', marginBottom: '0.75rem' }}>
                      Strategy Lead, McKinsey &amp; Company · New Delhi, India
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                      {/* Verified badge */}
                      {currentUser.isVerified && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <CheckCircle size={15} color="#4A6647" />
                          <span style={{ fontSize: '0.78rem', color: '#4A6647', fontWeight: 700 }}>Verified Member</span>
                        </div>
                      )}
                      {/* Membership tier */}
                      <span className="soul-badge soul-badge-accent">
                        ✦ {currentUser.membershipTier}
                      </span>
                      {/* Join date */}
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-soul-text-muted)' }}>
                        Member since {formatDate(currentUser.joinedAt)}
                      </span>
                    </div>
                  </div>

                  <button
                    className="soul-btn-secondary"
                    style={{ fontSize: '0.82rem', padding: '0.6rem 1.25rem', whiteSpace: 'nowrap' }}
                  >
                    <Edit3 size={14} /> Edit Profile
                  </button>
                </div>
              </div>
            </motion.div>

            {/* ── About ────────────────────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="soul-card" style={{ padding: '1.75rem', marginBottom: '1.25rem' }}>
              <SectionHeading>About</SectionHeading>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-soul-text)', lineHeight: 1.8 }}>
                  I'm Aryan — a 34-year-old strategy consultant based in Delhi, currently working at McKinsey where I focus on organisational transformation and long-range planning. My days are shaped by complex problems and sharp conversations, but I've come to realise that the most meaningful exchanges happen outside the boardroom: over a slow dinner, on a long run, or in the middle of a rainstorm somewhere you didn't plan to be.
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-soul-text)', lineHeight: 1.8 }}>
                  I came to SoulMeet because I was tired of shallow connection — of being surrounded by people and still feeling unseen. I love philosophy, architecture, classical music (Arvo Pärt has a permanent residence in my mind), and the kind of conversation that changes how you see something. I believe depth is a discipline, and I'm here to practise it — with intention, with honesty, and without the usual small talk.
                </p>
              </div>
            </motion.div>

            {/* ── Values ───────────────────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="soul-card" style={{ padding: '1.75rem', marginBottom: '1.25rem' }}>
              <SectionHeading>Core Values</SectionHeading>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
                {coreValues.map((val) => (
                  <span key={val} className="soul-badge soul-badge-accent" style={{ fontSize: '0.82rem', padding: '0.4rem 1rem' }}>
                    {val}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* ── Interests ────────────────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="soul-card" style={{ padding: '1.75rem', marginBottom: '1.25rem' }}>
              <SectionHeading>Interests</SectionHeading>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
                {interests.map((interest) => (
                  <span key={interest} className="soul-badge soul-badge-muted" style={{ fontSize: '0.82rem', padding: '0.4rem 1rem' }}>
                    {interest}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* ── Goals ────────────────────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="soul-card" style={{ padding: '1.75rem', marginBottom: '1.25rem' }}>
              <SectionHeading>Connection Goals</SectionHeading>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {goals.map((goal) => (
                  <div
                    key={goal.title}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '1rem',
                      padding: '1.125rem',
                      borderRadius: '14px',
                      background: goal.bg,
                      border: `1px solid ${goal.color}22`,
                    }}
                  >
                    <div
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        background: `${goal.color}22`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <goal.icon size={18} color={goal.color} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-soul-primary)', marginBottom: '0.25rem' }}>
                        {goal.title}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-soul-text-muted)', lineHeight: 1.6 }}>
                        {goal.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Advisor Card ─────────────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="soul-card" style={{ padding: '1.75rem', marginBottom: '1.25rem' }}>
              <SectionHeading>Your Advisor</SectionHeading>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
                {/* Advisor Avatar */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'var(--color-soul-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-soul-accent)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    flexShrink: 0,
                    border: '2px solid var(--color-soul-accent)',
                    overflow: 'hidden',
                  }}
                >
                  {MOCK_ADVISORS[0]?.avatar ? (
                    <img src={MOCK_ADVISORS[0].avatar} alt="Dr. Priya Ramanathan" style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    'PR'
                  )}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                    <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-soul-primary)' }}>
                      Dr. Priya Ramanathan
                    </span>
                    <span className="soul-badge soul-badge-green">Verified</span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-soul-text-muted)', marginBottom: '0.4rem' }}>
                    Relationship Psychologist · 14 years experience
                  </div>
                  <StarRating rating={4.9} />
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-soul-text-muted)', marginTop: '0.2rem' }}>
                    4.9 · 347 sessions · Next: Dec 18, 2024
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.625rem', flexShrink: 0, flexWrap: 'wrap' }}>
                  <button className="soul-btn-primary" style={{ fontSize: '0.8rem', padding: '0.55rem 1.1rem' }}>
                    <MessageSquare size={13} /> Message
                  </button>
                  <button className="soul-btn-secondary" style={{ fontSize: '0.8rem', padding: '0.55rem 1.1rem' }}>
                    <Calendar size={13} /> Book
                  </button>
                </div>
              </div>
            </motion.div>

            {/* ── Privacy Settings ─────────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="soul-card" style={{ padding: '1.75rem', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '0.25rem' }}>
                <SectionHeading>Privacy Settings</SectionHeading>
              </div>
              <p style={{ fontSize: '0.78rem', color: 'var(--color-soul-text-muted)', marginBottom: '0.5rem', lineHeight: 1.5 }}>
                Your privacy is foundational to SoulMeet. These settings are applied immediately and can be changed at any time.
              </p>

              <ToggleSwitch
                id="profile-visibility"
                checked={privacySettings.profileVisible}
                onChange={() => toggle('profileVisible')}
                label="Profile Visibility"
                description="Allow your advisor and curated matches to view your profile details and values."
              />
              <ToggleSwitch
                id="allow-introductions"
                checked={privacySettings.allowIntroductions}
                onChange={() => toggle('allowIntroductions')}
                label="Allow Introductions"
                description="Enable your advisor to initiate curated introductions with other members on your behalf."
              />
              <ToggleSwitch
                id="share-health"
                checked={privacySettings.shareHealthWithAdvisor}
                onChange={() => toggle('shareHealthWithAdvisor')}
                label="Share SoulHealth with Advisor"
                description="Share your SoulHealth metrics and check-in data with Dr. Priya Ramanathan to inform your sessions."
              />

              <div
                style={{
                  marginTop: '1rem',
                  padding: '0.875rem 1rem',
                  background: 'rgba(74,52,40,0.04)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.625rem',
                }}
              >
                <Shield size={16} color="var(--color-soul-text-muted)" style={{ flexShrink: 0, marginTop: '1px' }} />
                <div style={{ fontSize: '0.78rem', color: 'var(--color-soul-text-muted)', lineHeight: 1.6 }}>
                  All data is encrypted end-to-end. SoulMeet never sells or shares personal information with third parties. Your advisor has signed a comprehensive confidentiality agreement.
                </div>
              </div>
            </motion.div>

            {/* ── Activity Stats Footer ─────────────────────────────────────── */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '1rem',
                paddingBottom: '1rem',
              }}
            >
              {[
                { label: 'Sessions Completed', value: '2', icon: Calendar, color: '#C9A86A' },
                { label: 'Check-In Streak', value: '47 days', icon: Heart, color: '#4A6647' },
                { label: 'SoulHealth Score', value: '84/100', icon: Eye, color: '#4A3428' },
                { label: 'Member Since', value: 'Sep 2024', icon: Shield, color: '#8B7355' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="soul-card"
                  style={{ padding: '1.125rem', textAlign: 'center' }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: `${stat.color}14`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 0.625rem',
                    }}
                  >
                    <stat.icon size={16} color={stat.color} />
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-soul-primary)', lineHeight: 1, marginBottom: '0.25rem' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--color-soul-text-muted)', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

          </motion.div>
        </PageTransition>
      </main>
    </div>
  );
}
