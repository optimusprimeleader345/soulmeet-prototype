import React, { useState } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Bell, Calendar, Flame, Heart, BookOpen, Users, Star,
  ArrowRight, MessageSquare, ChevronRight, CheckCircle,
  MapPin, Clock, Activity, Zap,
} from 'lucide-react';
import Sidebar from '../../components/layout/Sidebar';
import PageTransition from '../../components/shared/PageTransition';
import { useAuth } from '../../contexts/AuthContext';
import {
  MOCK_USER,
  MOCK_ADVISORS,
  MOCK_SESSIONS,
  MOCK_EVENTS,
  MOCK_NOTIFICATIONS,
} from '../../data/mock';
import { getGreeting, formatDate, getInitials } from '../../lib/utils';

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants = {
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

// ─── Ring Progress SVG ───────────────────────────────────────────────────────

function RingProgress({ score, size = 80, strokeWidth = 7 }: { score: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-soul-border)"
        strokeWidth={strokeWidth}
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="var(--color-soul-accent)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
      />
    </svg>
  );
}

// ─── Star Rating ─────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          fill={star <= Math.round(rating) ? 'var(--color-soul-accent)' : 'none'}
          color={star <= Math.round(rating) ? 'var(--color-soul-accent)' : 'var(--color-soul-border)'}
        />
      ))}
    </div>
  );
}

// ─── Activity Items ───────────────────────────────────────────────────────────

const activityItems = [
  {
    id: 1,
    icon: BookOpen,
    color: '#C9A86A',
    title: 'Session notes shared by Dr. Priya Ramanathan',
    subtitle: 'Your Dec 5th session notes are now available',
    time: '2 hours ago',
  },
  {
    id: 2,
    icon: Calendar,
    color: '#4A3428',
    title: 'Upcoming session confirmed',
    subtitle: 'Dec 18 · The Oberoi, New Delhi · 10:00 AM',
    time: 'Yesterday',
  },
  {
    id: 3,
    icon: Users,
    color: '#A8B8A5',
    title: 'Curated introduction ready',
    subtitle: 'Your advisor has identified a meaningful connection',
    time: '3 days ago',
  },
  {
    id: 4,
    icon: Heart,
    color: '#C9A86A',
    title: 'SoulHealth score improved',
    subtitle: 'Your wellbeing score rose by 12% this month',
    time: '5 days ago',
  },
  {
    id: 5,
    icon: Activity,
    color: '#A8B8A5',
    title: 'New event: Winter Solitude Retreat',
    subtitle: 'Aman Bagh, Rajasthan · Jan 17–20 · 3 spots left',
    time: '1 week ago',
  },
];

// ─── Quick Actions ────────────────────────────────────────────────────────────

const quickActions = [
  { label: 'Book Session', icon: Calendar, color: 'var(--color-soul-primary)', bg: 'rgba(74,52,40,0.08)' },
  { label: 'Journal', icon: BookOpen, color: '#8B6914', bg: 'rgba(201,168,106,0.12)' },
  { label: 'View Health', icon: Heart, color: '#4A6647', bg: 'rgba(168,184,165,0.2)' },
  { label: 'Browse Events', icon: Zap, color: 'var(--color-soul-primary)', bg: 'rgba(74,52,40,0.08)' },
];

// ─── Event Type Badge ─────────────────────────────────────────────────────────

function eventTypeBadge(type: string) {
  const map: Record<string, { label: string; color: string; bg: string }> = {
    retreat: { label: 'Retreat', color: '#4A6647', bg: 'rgba(168,184,165,0.25)' },
    workshop: { label: 'Workshop', color: '#8B6914', bg: 'rgba(201,168,106,0.15)' },
    gathering: { label: 'Gathering', color: 'var(--color-soul-primary)', bg: 'rgba(74,52,40,0.08)' },
    webinar: { label: 'Webinar', color: '#5B4E8A', bg: 'rgba(91,78,138,0.1)' },
  };
  return map[type] ?? { label: type, color: 'var(--color-soul-text-muted)', bg: 'var(--color-soul-surface)' };
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { user } = useAuth();
  const currentUser = user ?? MOCK_USER;
  const firstName = currentUser.name.split(' ')[0];
  const greeting = getGreeting();
  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !n.read).length;
  const upcomingSession = MOCK_SESSIONS.find((s) => s.status === 'upcoming');
  const today = new Date();

  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar />

      <main
        className="main-content"
        style={{ minHeight: '100vh', overflowY: 'auto', padding: '2rem' }}
      >
        <PageTransition>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{ maxWidth: '1200px', margin: '0 auto' }}
          >

            {/* ── Header Row ──────────────────────────────────────────────── */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.75rem',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <h1
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '2rem',
                    fontWeight: 600,
                    color: 'var(--color-soul-primary)',
                    lineHeight: 1.15,
                  }}
                >
                  {greeting}, {firstName}
                </h1>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-soul-text-muted)', marginTop: '0.25rem' }}>
                  {today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                {/* Notification bell */}
                <div style={{ position: 'relative' }}>
                  <button
                    onClick={() => setNotifOpen(!notifOpen)}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      border: '1px solid var(--color-soul-border)',
                      background: 'var(--color-soul-card)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: 'var(--color-soul-text-muted)',
                      transition: 'background 0.2s',
                      position: 'relative',
                    }}
                  >
                    <Bell size={18} />
                    {unreadCount > 0 && (
                      <span
                        style={{
                          position: 'absolute',
                          top: '6px',
                          right: '6px',
                          width: '16px',
                          height: '16px',
                          borderRadius: '50%',
                          background: '#C9A86A',
                          color: 'var(--color-soul-primary)',
                          fontSize: '0.6rem',
                          fontWeight: 700,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '2px solid var(--color-soul-card)',
                        }}
                      >
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {notifOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      style={{
                        position: 'absolute',
                        top: '52px',
                        right: 0,
                        width: '340px',
                        background: 'var(--color-soul-card)',
                        border: '1px solid var(--color-soul-border)',
                        borderRadius: '16px',
                        boxShadow: 'var(--shadow-modal)',
                        zIndex: 100,
                        overflow: 'hidden',
                      }}
                    >
                      <div style={{ padding: '1rem 1.25rem 0.75rem', borderBottom: '1px solid var(--color-soul-border)' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-soul-primary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                          Notifications
                        </span>
                      </div>
                      {MOCK_NOTIFICATIONS.slice(0, 4).map((n) => (
                        <div
                          key={n.id}
                          style={{
                            padding: '0.875rem 1.25rem',
                            borderBottom: '1px solid var(--color-soul-border-light)',
                            background: n.read ? 'transparent' : 'rgba(201,168,106,0.05)',
                          }}
                        >
                          <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-soul-text)', marginBottom: '0.2rem' }}>
                            {n.title}
                          </div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--color-soul-text-muted)', lineHeight: 1.5 }}>
                            {n.message.slice(0, 75)}…
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </div>

                {/* Avatar */}
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    background: 'var(--color-soul-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-soul-accent)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    border: '2px solid var(--color-soul-accent)',
                  }}
                >
                  {getInitials(currentUser.name)}
                </div>
              </div>
            </motion.div>

            {/* ── Welcome Card ─────────────────────────────────────────────── */}
            <motion.div
              variants={itemVariants}
              className="soul-card"
              style={{
                marginBottom: '1.5rem',
                padding: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '1.5rem',
                flexWrap: 'wrap',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '5px',
                  background: 'linear-gradient(180deg, var(--color-soul-accent), #8B6914)',
                  borderRadius: '4px 0 0 4px',
                }}
              />

              <div style={{ flex: 1, paddingLeft: '0.75rem' }}>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    color: 'var(--color-soul-primary)',
                    marginBottom: '0.5rem',
                  }}
                >
                  Welcome back, {firstName}
                </h2>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-soul-text-muted)', marginBottom: '1.25rem', maxWidth: '480px', lineHeight: 1.6 }}>
                  Your advisor <strong style={{ color: 'var(--color-soul-primary)' }}>Dr. Priya Ramanathan</strong> has a note for you regarding your upcoming session on Dec 18th.
                </p>
                <button className="soul-btn-primary" style={{ fontSize: '0.85rem', padding: '0.625rem 1.5rem' }}>
                  View Session <ArrowRight size={14} />
                </button>
              </div>

              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <span className="soul-badge soul-badge-accent" style={{ fontSize: '0.8rem', padding: '0.4rem 1rem', marginBottom: '0.75rem', display: 'inline-flex' }}>
                  ✦ {currentUser.membershipTier} Member
                </span>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-soul-text-muted)', marginTop: '0.5rem' }}>
                  Member since {formatDate(currentUser.joinedAt)}
                </div>
                {currentUser.isVerified && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', justifyContent: 'flex-end', marginTop: '0.4rem' }}>
                    <CheckCircle size={12} color="#4A6647" />
                    <span style={{ fontSize: '0.72rem', color: '#4A6647', fontWeight: 600 }}>Verified</span>
                  </div>
                )}
              </div>
            </motion.div>

            {/* ── Stats Row ─────────────────────────────────────────────────── */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '1.25rem',
                marginBottom: '1.5rem',
              }}
            >
              {/* SoulHealth Score */}
              <motion.div variants={itemVariants} className="soul-card soul-card-hover" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-soul-text-muted)', marginBottom: '0.5rem' }}>
                      SoulHealth Score
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '3rem',
                        fontWeight: 700,
                        color: 'var(--color-soul-primary)',
                        lineHeight: 1,
                        marginBottom: '0.3rem',
                      }}
                    >
                      84
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#4A6647', fontWeight: 600 }}>
                      ↑ +5 this month
                    </div>
                  </div>
                  <div style={{ position: 'relative', width: 80, height: 80 }}>
                    <RingProgress score={84} />
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        color: 'var(--color-soul-accent)',
                      }}
                    >
                      A
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Upcoming Session */}
              <motion.div variants={itemVariants} className="soul-card soul-card-hover" style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-soul-text-muted)', marginBottom: '0.75rem' }}>
                  Upcoming Session
                </div>
                {upcomingSession ? (
                  <>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-soul-primary)', marginBottom: '0.25rem' }}>
                      {new Date(upcomingSession.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-soul-text)', marginBottom: '0.2rem' }}>
                      {upcomingSession.advisorName}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-soul-text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '0.2rem' }}>
                      <MapPin size={11} /> {upcomingSession.venue.split('—')[0].trim()}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-soul-text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem', marginBottom: '1rem' }}>
                      <Clock size={11} /> {upcomingSession.time} AM
                    </div>
                    <button className="soul-btn-accent" style={{ fontSize: '0.78rem', padding: '0.5rem 1.25rem' }}>
                      Join <ArrowRight size={12} />
                    </button>
                  </>
                ) : (
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-soul-text-muted)' }}>No upcoming sessions</p>
                )}
              </motion.div>

              {/* Streak */}
              <motion.div variants={itemVariants} className="soul-card soul-card-hover" style={{ padding: '1.5rem' }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-soul-text-muted)', marginBottom: '0.75rem' }}>
                  Check-In Streak
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <Flame size={32} color="#C9A86A" fill="rgba(201,168,106,0.2)" />
                  <div
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '3rem',
                      fontWeight: 700,
                      color: 'var(--color-soul-primary)',
                      lineHeight: 1,
                    }}
                  >
                    47
                  </div>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-soul-text-muted)', lineHeight: 1.5 }}>
                  Consecutive days of check-ins
                </div>
                <div
                  style={{
                    marginTop: '0.875rem',
                    background: 'rgba(201,168,106,0.1)',
                    borderRadius: '8px',
                    padding: '0.4rem 0.75rem',
                    display: 'inline-block',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    color: '#8B6914',
                  }}
                >
                  🏆 Personal best!
                </div>
              </motion.div>
            </div>

            {/* ── Two-column section ───────────────────────────────────────── */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr',
                gap: '1.25rem',
                marginBottom: '1.5rem',
              }}
            >
              {/* Recent Activity */}
              <motion.div variants={itemVariants} className="soul-card" style={{ padding: '1.5rem' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    color: 'var(--color-soul-primary)',
                    marginBottom: '1.25rem',
                    fontWeight: 600,
                  }}
                >
                  Recent Activity
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {activityItems.map((item, idx) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.875rem',
                        padding: '0.875rem 0',
                        borderBottom: idx < activityItems.length - 1 ? '1px solid var(--color-soul-border-light)' : 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <div
                        style={{
                          width: '36px',
                          height: '36px',
                          borderRadius: '10px',
                          background: `${item.color}18`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <item.icon size={16} color={item.color} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-soul-text)', marginBottom: '0.15rem' }}>
                          {item.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-soul-text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.subtitle}
                        </div>
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--color-soul-text-muted)', flexShrink: 0, paddingTop: '0.1rem' }}>
                        {item.time}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div variants={itemVariants} className="soul-card" style={{ padding: '1.5rem' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.2rem',
                    color: 'var(--color-soul-primary)',
                    marginBottom: '1.25rem',
                    fontWeight: 600,
                  }}
                >
                  Quick Actions
                </h3>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.75rem',
                  }}
                >
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        padding: '1.125rem 0.75rem',
                        borderRadius: '14px',
                        background: action.bg,
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                        (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-hover)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                      }}
                    >
                      <action.icon size={20} color={action.color} />
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: action.color, textAlign: 'center', lineHeight: 1.2 }}>
                        {action.label}
                      </span>
                    </button>
                  ))}
                </div>

                <div
                  style={{
                    marginTop: '1rem',
                    padding: '0.875rem',
                    background: 'rgba(201,168,106,0.08)',
                    borderRadius: '12px',
                    border: '1px solid rgba(201,168,106,0.2)',
                  }}
                >
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--color-soul-text-muted)', marginBottom: '0.35rem' }}>
                    Today's Prompt
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-soul-primary)', fontStyle: 'italic', lineHeight: 1.5 }}>
                    "What is one conversation you've been avoiding?"
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── Events Preview ────────────────────────────────────────────── */}
            <motion.div variants={itemVariants} style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.3rem',
                    color: 'var(--color-soul-primary)',
                    fontWeight: 600,
                  }}
                >
                  Upcoming Events
                </h3>
                <button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.8rem',
                    color: 'var(--color-soul-accent)',
                    fontWeight: 600,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  View all <ChevronRight size={14} />
                </button>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '1.25rem',
                  overflowX: 'auto',
                  paddingBottom: '0.5rem',
                }}
              >
                {MOCK_EVENTS.slice(0, 3).map((event) => {
                  const badge = eventTypeBadge(event.type);
                  const spotsLeft = event.capacity - event.enrolled;
                  return (
                    <div
                      key={event.id}
                      className="soul-card soul-card-hover"
                      style={{
                        minWidth: '280px',
                        padding: '1.375rem',
                        flexShrink: 0,
                        cursor: 'pointer',
                      }}
                    >
                      {event.image && (
                        <div style={{ height: '120px', borderRadius: '12px', overflow: 'hidden', marginBottom: '0.875rem' }}>
                          <img src={event.image} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        </div>
                      )}
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '0.2rem 0.65rem',
                            borderRadius: '100px',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            background: badge.bg,
                            color: badge.color,
                          }}
                        >
                          {badge.label}
                        </span>
                        <span
                          style={{
                            fontSize: '0.7rem',
                            color: spotsLeft <= 3 ? '#C0392B' : 'var(--color-soul-text-muted)',
                            fontWeight: spotsLeft <= 3 ? 700 : 400,
                          }}
                        >
                          {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left
                        </span>
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--font-heading)',
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          color: 'var(--color-soul-primary)',
                          marginBottom: '0.4rem',
                          lineHeight: 1.3,
                        }}
                      >
                        {event.title}
                      </div>
                      <div
                        style={{
                          fontSize: '0.78rem',
                          color: 'var(--color-soul-text-muted)',
                          lineHeight: 1.5,
                          marginBottom: '0.875rem',
                          overflow: 'hidden',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                        } as React.CSSProperties}
                      >
                        {event.description}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--color-soul-text-muted)', marginBottom: '0.3rem' }}>
                        <Calendar size={11} />
                        {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: 'var(--color-soul-text-muted)' }}>
                        <MapPin size={11} />
                        {event.location}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* ── Advisor Card ─────────────────────────────────────────────── */}
            <motion.div
              variants={itemVariants}
              className="soul-card"
              style={{ padding: '1.75rem' }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.2rem',
                  color: 'var(--color-soul-primary)',
                  marginBottom: '1.25rem',
                  fontWeight: 600,
                }}
              >
                Your Relationship Advisor
              </h3>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: 'var(--color-soul-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-soul-accent)',
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    flexShrink: 0,
                    border: '3px solid var(--color-soul-accent)',
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.25rem' }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.3rem',
                        fontWeight: 600,
                        color: 'var(--color-soul-primary)',
                      }}
                    >
                      Dr. Priya Ramanathan
                    </div>
                    <span className="soul-badge soul-badge-green">Verified Advisor</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', marginBottom: '0.5rem' }}>
                    Relationship Psychologist · 14 years experience
                  </div>
                  <StarRating rating={4.9} />
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-soul-text-muted)', marginTop: '0.35rem' }}>
                    4.9 · 347 sessions completed
                  </div>

                  <div
                    style={{
                      marginTop: '0.875rem',
                      padding: '0.75rem 1rem',
                      background: 'var(--color-soul-surface)',
                      borderRadius: '12px',
                      fontSize: '0.82rem',
                      color: 'var(--color-soul-text)',
                      lineHeight: 1.6,
                      maxWidth: '520px',
                    }}
                  >
                    Dr. Priya brings 14 years of clinical experience helping high-achieving professionals navigate the emotional complexity of modern relationships. She specialises in attachment-based therapy and social health restoration.
                  </div>

                  <div
                    style={{
                      marginTop: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.8rem',
                      color: 'var(--color-soul-text-muted)',
                    }}
                  >
                    <Calendar size={13} />
                    <span>Next session: <strong style={{ color: 'var(--color-soul-primary)' }}>Dec 18, 2024 · 10:00 AM · The Oberoi, New Delhi</strong></span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', flexShrink: 0 }}>
                  <button className="soul-btn-primary" style={{ fontSize: '0.82rem', padding: '0.625rem 1.25rem', whiteSpace: 'nowrap' }}>
                    <MessageSquare size={14} /> Message Advisor
                  </button>
                  <button className="soul-btn-secondary" style={{ fontSize: '0.82rem', padding: '0.625rem 1.25rem', whiteSpace: 'nowrap' }}>
                    <Calendar size={14} /> Book Session
                  </button>
                </div>
              </div>
            </motion.div>

          </motion.div>
        </PageTransition>
      </main>
    </div>
  );
}
