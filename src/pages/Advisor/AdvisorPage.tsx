import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  Calendar as CalendarIcon, Clock, Star, CheckCircle, MessageSquare,
  ChevronLeft, ChevronRight, BookOpen, Edit3, Headphones, Check,
  User, Shield, ArrowRight, FileText, MapPin
} from 'lucide-react';
import Sidebar from '../../components/layout/Sidebar';
import PageTransition from '../../components/shared/PageTransition';
import { useAuth } from '../../contexts/AuthContext';
import { MOCK_ADVISORS, MOCK_SESSIONS } from '../../data/mock';
import { getInitials, formatDate } from '../../lib/utils';

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

function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={14}
          fill={star <= Math.round(rating) ? 'var(--color-soul-accent)' : 'none'}
          color={star <= Math.round(rating) ? 'var(--color-soul-accent)' : 'var(--color-soul-border)'}
        />
      ))}
      <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-soul-text)', marginLeft: '0.4rem' }}>
        {rating.toFixed(1)} / 5.0
      </span>
    </div>
  );
}

export default function AdvisorPage() {
  const primaryAdvisor = MOCK_ADVISORS[0];
  const otherAdvisors = MOCK_ADVISORS.slice(1);
  const completedSessions = MOCK_SESSIONS.filter((s) => s.status === 'completed');

  // Calendar State
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 11, 1)); // Dec 2024
  const [selectedDate, setSelectedDate] = useState<number | null>(18);
  const [selectedTime, setSelectedTime] = useState<string>('10:00 AM');
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({});

  const availableDays = [17, 18, 20, 23, 27];
  const timeSlots = ['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'];

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const firstDayIndex = (new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay() + 6) % 7; // Mon=0, Sun=6

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
    setSelectedDate(null);
  };

  const handleConfirmBooking = () => {
    if (!selectedDate || !selectedTime) return;
    setShowSuccess(true);
  };

  const toggleNotes = (id: string) => {
    setExpandedNotes((prev) => ({ ...prev, [id]: !prev[id] }));
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
            <motion.div variants={itemVariants} style={{ marginBottom: '2rem' }}>
              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '2.25rem',
                fontWeight: 600,
                color: 'var(--color-soul-primary)',
              }}>
                My Relationship Advisor
              </h1>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-soul-text-muted)', marginTop: '0.25rem' }}>
                Your personal guide to meaningful connection and relational wellbeing
              </p>
            </motion.div>

            {/* ── Advisor Profile Card ────────────────────────────────────────── */}
            <motion.div
              variants={itemVariants}
              className="soul-card"
              style={{
                padding: '2.5rem',
                marginBottom: '2rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2.5rem',
                alignItems: 'flex-start',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  background: 'var(--color-soul-primary)',
                  color: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.25rem',
                  fontWeight: 600,
                  boxShadow: 'var(--shadow-card)',
                  position: 'relative',
                }}>
                  {primaryAdvisor.avatar ? (
                    <img src={primaryAdvisor.avatar} alt={primaryAdvisor.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                  ) : (
                    'PR'
                  )}
                  <div style={{
                    position: 'absolute',
                    bottom: '4px',
                    right: '4px',
                    background: 'var(--color-soul-card)',
                    borderRadius: '50%',
                    padding: '2px',
                    display: 'flex'
                  }}>
                    <CheckCircle size={20} color="var(--color-soul-accent)" fill="var(--color-soul-accent)" style={{ color: '#fff' }} />
                  </div>
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'var(--color-soul-accent)',
                  background: 'rgba(201, 168, 106, 0.12)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: '100px',
                }}>
                  Verified Specialist
                </span>
              </div>

              <div style={{ flex: '1 1 480px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
                  <div>
                    <h2 style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '1.85rem',
                      fontWeight: 600,
                      color: 'var(--color-soul-primary)',
                    }}>
                      {primaryAdvisor.name}
                    </h2>
                    <p style={{ fontSize: '0.95rem', fontWeight: 500, color: 'var(--color-soul-text-muted)' }}>
                      {primaryAdvisor.title}
                    </p>
                  </div>
                  <StarRating rating={primaryAdvisor.rating} />
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {primaryAdvisor.specialization.map((spec, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '0.35rem 0.85rem',
                        background: 'var(--color-soul-surface)',
                        color: 'var(--color-soul-primary)',
                        borderRadius: '100px',
                        fontSize: '0.8rem',
                        fontWeight: 500,
                      }}
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                <p style={{
                  fontSize: '0.925rem',
                  color: 'var(--color-soul-text)',
                  lineHeight: 1.7,
                  marginBottom: '1.75rem',
                }}>
                  {primaryAdvisor.bio}
                </p>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '1rem',
                  padding: '1.25rem',
                  background: 'var(--color-soul-surface)',
                  borderRadius: '16px',
                  marginBottom: '2rem',
                }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-soul-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                      Sessions Completed
                    </div>
                    <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginTop: '0.2rem' }}>
                      {primaryAdvisor.sessionsCompleted}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-soul-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                      Available Days
                    </div>
                    <div style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--color-soul-text)', marginTop: '0.4rem' }}>
                      {primaryAdvisor.availability.join(', ')}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-soul-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                      Next Opening
                    </div>
                    <div style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--color-soul-accent)', marginTop: '0.4rem' }}>
                      {formatDate(primaryAdvisor.nextAvailable)}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => {
                      const el = document.getElementById('calendar-booking-section');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="soul-btn-primary"
                    style={{ padding: '0.8rem 1.75rem' }}
                  >
                    <CalendarIcon size={18} /> Book Session
                  </button>
                  <button className="soul-btn-secondary" style={{ padding: '0.8rem 1.75rem' }}>
                    <MessageSquare size={18} /> Send Message
                  </button>
                </div>
              </div>
            </motion.div>

            {/* ── Book a Session Calendar & Recommendations Grid ────────────── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
              
              {/* Calendar Section */}
              <motion.div id="calendar-booking-section" variants={itemVariants} className="soul-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-soul-primary)' }}>
                      Book a Session
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)' }}>
                      Select an available date and time for private consultation
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <button
                      onClick={handlePrevMonth}
                      style={{
                        width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--color-soul-border)',
                        background: 'var(--color-soul-card)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: 'var(--color-soul-text)', transition: 'all 0.2s'
                      }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-soul-primary)', minWidth: '130px', textAlign: 'center' }}>
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <button
                      onClick={handleNextMonth}
                      style={{
                        width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--color-soul-border)',
                        background: 'var(--color-soul-card)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', color: 'var(--color-soul-text)', transition: 'all 0.2s'
                      }}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Day headers */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.35rem', marginBottom: '0.75rem' }}>
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                    <div key={d} style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-soul-text-muted)', textTransform: 'uppercase' }}>
                      {d}
                    </div>
                  ))}
                </div>

                {/* Days Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.4rem', marginBottom: '1.75rem' }}>
                  {Array.from({ length: firstDayIndex }).map((_, i) => (
                    <div key={`empty-${i}`} style={{ height: '44px' }} />
                  ))}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const isAvailable = availableDays.includes(day);
                    const isSelected = selectedDate === day;

                    return (
                      <button
                        key={day}
                        disabled={!isAvailable}
                        onClick={() => {
                          setSelectedDate(day);
                          setShowSuccess(false);
                        }}
                        style={{
                          height: '44px',
                          borderRadius: '10px',
                          border: isSelected ? '2px solid var(--color-soul-accent)' : '1px solid var(--color-soul-border)',
                          background: isSelected
                            ? 'var(--color-soul-primary)'
                            : isAvailable
                            ? 'rgba(201, 168, 106, 0.08)'
                            : 'transparent',
                          color: isSelected
                            ? '#FFFFFF'
                            : isAvailable
                            ? 'var(--color-soul-primary)'
                            : 'var(--color-soul-border)',
                          fontWeight: isSelected || isAvailable ? 600 : 400,
                          fontSize: '0.9rem',
                          cursor: isAvailable ? 'pointer' : 'not-allowed',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          position: 'relative'
                        }}
                      >
                        {day}
                        {isAvailable && !isSelected && (
                          <div style={{
                            position: 'absolute',
                            bottom: '4px',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            background: 'var(--color-soul-accent)'
                          }} />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Time Slots */}
                {selectedDate && availableDays.includes(selectedDate) && (
                  <div style={{ marginBottom: '1.75rem' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-soul-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                      Available Slots for Dec {selectedDate}, 2024
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                      {timeSlots.map((slot) => {
                        const isSlotSelected = selectedTime === slot;
                        return (
                          <button
                            key={slot}
                            onClick={() => {
                              setSelectedTime(slot);
                              setShowSuccess(false);
                            }}
                            style={{
                              padding: '0.6rem 1.1rem',
                              borderRadius: '8px',
                              border: isSlotSelected ? '1.5px solid var(--color-soul-primary)' : '1.5px solid var(--color-soul-border)',
                              background: isSlotSelected ? 'var(--color-soul-primary)' : 'var(--color-soul-card)',
                              color: isSlotSelected ? '#FFFFFF' : 'var(--color-soul-text)',
                              fontSize: '0.85rem',
                              fontWeight: isSlotSelected ? 600 : 500,
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.4rem'
                            }}
                          >
                            <Clock size={14} color={isSlotSelected ? '#C9A86A' : 'var(--color-soul-text-muted)'} />
                            {slot}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Success Card or CTA */}
                <AnimatePresence mode="wait">
                  {showSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      style={{
                        padding: '1.25rem',
                        borderRadius: '12px',
                        background: 'rgba(34, 197, 94, 0.08)',
                        border: '1.5px solid rgba(34, 197, 94, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                      }}
                    >
                      <CheckCircle size={24} color="#16a34a" />
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#16a34a' }}>
                          Session Requested Successfully
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-soul-text-muted)', marginTop: '0.2rem' }}>
                          Requested for Dec {selectedDate}, 2024 at {selectedTime} with {primaryAdvisor.name}. You will receive confirmation via notifications.
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <button
                      disabled={!selectedDate || !availableDays.includes(selectedDate)}
                      onClick={handleConfirmBooking}
                      className="soul-btn-primary"
                      style={{
                        width: '100%',
                        justifyContent: 'center',
                        padding: '1rem',
                        opacity: !selectedDate || !availableDays.includes(selectedDate) ? 0.5 : 1,
                        cursor: !selectedDate || !availableDays.includes(selectedDate) ? 'not-allowed' : 'pointer'
                      }}
                    >
                      Confirm Booking for Dec {selectedDate || '—'} · {selectedTime}
                    </button>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Recommendations Section */}
              <motion.div variants={itemVariants} className="soul-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '0.4rem' }}>
                  This Week's Recommendations
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', marginBottom: '1.75rem' }}>
                  Curated exercises and readings prescribed by Dr. Priya Ramanathan
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', flex: 1 }}>
                  {[
                    {
                      icon: BookOpen,
                      title: 'Read: Attached by Amir Levine',
                      desc: 'Chapter 4 & 5: Understanding secure baseline behaviours in high-stakes professional environments.',
                      badge: 'Reading',
                      color: '#C9A86A'
                    },
                    {
                      icon: Edit3,
                      title: 'Practice: 10-Min Daily Reflection',
                      desc: 'Journal before sleeping: "When did I feel most genuinely understood today, and what allowed that to happen?"',
                      badge: 'Exercise',
                      color: '#4A3428'
                    },
                    {
                      icon: Headphones,
                      title: 'Listen: On Being Podcast',
                      desc: 'Bessel van der Kolk episode: The bodily memory of relational isolation and the physiology of trust.',
                      badge: 'Audio',
                      color: '#A8B8A5'
                    }
                  ].map((rec, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '1.25rem',
                        borderRadius: '16px',
                        background: 'var(--color-soul-surface)',
                        border: '1px solid var(--color-soul-border)',
                        display: 'flex',
                        gap: '1.25rem',
                        alignItems: 'flex-start'
                      }}
                    >
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: rec.color,
                        flexShrink: 0,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                      }}>
                        <rec.icon size={20} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                          <span style={{
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            padding: '0.2rem 0.6rem',
                            borderRadius: '100px',
                            background: 'rgba(74, 52, 40, 0.08)',
                            color: 'var(--color-soul-primary)'
                          }}>
                            {rec.badge}
                          </span>
                        </div>
                        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-soul-text)', marginBottom: '0.35rem' }}>
                          {rec.title}
                        </h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', lineHeight: 1.5 }}>
                          {rec.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Previous Sessions History ──────────────────────────────────── */}
            <motion.div variants={itemVariants} className="soul-card" style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '0.35rem' }}>
                Previous Sessions
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', marginBottom: '1.75rem' }}>
                Review past consultation summaries and clinical notes
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {completedSessions.map((ses) => {
                  const isExpanded = expandedNotes[ses.id] || false;
                  return (
                    <div
                      key={ses.id}
                      style={{
                        padding: '1.5rem',
                        borderRadius: '16px',
                        background: 'var(--color-soul-surface)',
                        border: '1px solid var(--color-soul-border)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '12px',
                            background: 'var(--color-soul-primary)',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.1rem',
                            fontWeight: 600
                          }}>
                            {getInitials(ses.advisorName)}
                          </div>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.2rem' }}>
                              <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-soul-text)' }}>
                                {ses.advisorName}
                              </span>
                              <span style={{
                                fontSize: '0.7rem',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                padding: '0.2rem 0.6rem',
                                borderRadius: '100px',
                                background: 'rgba(201, 168, 106, 0.15)',
                                color: 'var(--color-soul-primary)'
                              }}>
                                {ses.type.replace('-', ' ')}
                              </span>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.85rem', color: 'var(--color-soul-text-muted)' }}>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                <CalendarIcon size={14} /> {formatDate(ses.date)}
                              </span>
                              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                <MapPin size={14} /> {ses.venue}
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => toggleNotes(ses.id)}
                          className="soul-btn-secondary"
                          style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem' }}
                        >
                          <FileText size={15} /> {isExpanded ? 'Hide Notes' : 'View Notes'}
                        </button>
                      </div>

                      {isExpanded && ses.notes && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          style={{
                            marginTop: '1.25rem',
                            paddingTop: '1.25rem',
                            borderTop: '1px solid var(--color-soul-border)',
                            fontSize: '0.9rem',
                            color: 'var(--color-soul-text)',
                            lineHeight: 1.6
                          }}
                        >
                          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-soul-accent)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>
                            Clinical Summary & Action Items
                          </div>
                          {ses.notes}
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* ── Other Advisors ──────────────────────────────────────────────── */}
            <motion.div variants={itemVariants}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '0.35rem' }}>
                Other Available Advisors
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', marginBottom: '1.5rem' }}>
                If your relational goals evolve, you can request an advisory transfer at any time
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '1.5rem' }}>
                {otherAdvisors.map((adv) => (
                  <div
                    key={adv.id}
                    className="soul-card soul-card-hover"
                    style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                          <div style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            background: 'var(--color-soul-surface)',
                            color: 'var(--color-soul-primary)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'var(--font-heading)',
                            fontSize: '1.35rem',
                            fontWeight: 600
                          }}>
                            {adv.avatar ? (
                              <img src={adv.avatar} alt={adv.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                            ) : (
                              getInitials(adv.name)
                            )}
                          </div>
                          <div>
                            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 600, color: 'var(--color-soul-primary)' }}>
                              {adv.name}
                            </h4>
                            <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)' }}>
                              {adv.title}
                            </p>
                          </div>
                        </div>
                        <StarRating rating={adv.rating} />
                      </div>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem' }}>
                        {adv.specialization.slice(0, 2).map((s, i) => (
                          <span key={i} style={{ padding: '0.25rem 0.65rem', background: 'var(--color-soul-surface)', color: 'var(--color-soul-primary)', borderRadius: '100px', fontSize: '0.75rem', fontWeight: 500 }}>
                            {s}
                          </span>
                        ))}
                      </div>

                      <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', lineHeight: 1.6, marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {adv.bio}
                      </p>
                    </div>

                    <button
                      disabled
                      className="soul-btn-secondary"
                      style={{ width: '100%', justifyContent: 'center', opacity: 0.6, cursor: 'not-allowed' }}
                    >
                      Request Transfer (Assigned to Dr. Priya)
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

          </motion.div>
        </PageTransition>
      </main>
    </div>
  );
}
