import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Bell, Calendar, Star, Crown, Heart, CheckCircle, Check,
  Sliders, ArrowRight, Shield, MessageSquare
} from 'lucide-react';
import Sidebar from '../../components/layout/Sidebar';
import PageTransition from '../../components/shared/PageTransition';
import { MOCK_NOTIFICATIONS } from '../../data/mock';
import type { Notification } from '../../types';

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

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'advisor' | 'event' | 'membership'>('all');

  // Preferences state
  const [prefs, setPrefs] = useState({
    advisorMessages: true,
    eventReminders: true,
    membershipUpdates: true,
    weeklyDigest: true,
    newIntroductions: true
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const togglePref = (key: keyof typeof prefs) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredNotifications = notifications.filter((n) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'unread') return !n.read;
    if (activeTab === 'advisor') return n.type === 'advisor';
    if (activeTab === 'event') return n.type === 'event';
    if (activeTab === 'membership') return n.type === 'membership';
    return true;
  });

  const getIconForType = (type: Notification['type']) => {
    switch (type) {
      case 'advisor':
        return { icon: Calendar, color: '#4A3428', bg: 'rgba(74, 52, 40, 0.12)' };
      case 'event':
        return { icon: Star, color: '#C9A86A', bg: 'rgba(201, 168, 106, 0.15)' };
      case 'membership':
        return { icon: Crown, color: '#6B4C3B', bg: 'rgba(107, 76, 59, 0.12)' };
      case 'connection':
        return { icon: Heart, color: '#A8B8A5', bg: 'rgba(168, 184, 165, 0.2)' };
      default:
        return { icon: Bell, color: '#8A7968', bg: 'rgba(138, 121, 104, 0.12)' };
    }
  };

  const formatTime = (ts: string) => {
    const date = new Date(ts);
    const now = new Date();
    const diffHours = Math.round((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffHours < 24) return `${Math.max(1, diffHours)}h ago`;
    const diffDays = Math.round(diffHours / 24);
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'unread', label: `Unread (${unreadCount})` },
    { id: 'advisor', label: 'Advisor' },
    { id: 'event', label: 'Events' },
    { id: 'membership', label: 'Membership' },
  ];

  return (
    <div className="app-layout">
      <Sidebar />

      <main className="main-content" style={{ minHeight: '100vh', overflowY: 'auto', padding: '2rem' }}>
        <PageTransition>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            style={{ maxWidth: '1000px', margin: '0 auto' }}
          >
            {/* ── Header Row ─────────────────────────────────────────────────── */}
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <h1 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.25rem',
                  fontWeight: 600,
                  color: 'var(--color-soul-primary)',
                }}>
                  Notifications
                </h1>
                {unreadCount > 0 && (
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '100px',
                    background: 'var(--color-soul-accent)',
                    color: '#FFFFFF',
                    fontSize: '0.8rem',
                    fontWeight: 700
                  }}>
                    {unreadCount} Unread
                  </span>
                )}
              </div>

              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="soul-btn-secondary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
                >
                  <Check size={16} /> Mark all as read
                </button>
              )}
            </motion.div>

            {/* ── Tab Navigation ────────────────────────────────────────────── */}
            <motion.div
              variants={itemVariants}
              style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap',
                marginBottom: '2rem',
                borderBottom: '1px solid var(--color-soul-border)',
                paddingBottom: '1rem'
              }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: '100px',
                    border: activeTab === tab.id ? '1.5px solid var(--color-soul-primary)' : '1px solid var(--color-soul-border)',
                    background: activeTab === tab.id ? 'var(--color-soul-primary)' : 'var(--color-soul-card)',
                    color: activeTab === tab.id ? '#FFFFFF' : 'var(--color-soul-text)',
                    fontSize: '0.85rem',
                    fontWeight: activeTab === tab.id ? 600 : 500,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </motion.div>

            {/* ── Notification List ─────────────────────────────────────────── */}
            <motion.div variants={itemVariants} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
              <AnimatePresence mode="popLayout">
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notif) => {
                    const iconMeta = getIconForType(notif.type);
                    const IconComponent = iconMeta.icon;

                    return (
                      <motion.div
                        key={notif.id}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        onClick={() => !notif.read && handleMarkAsRead(notif.id)}
                        className="soul-card"
                        style={{
                          padding: '1.5rem',
                          background: notif.read ? 'var(--color-soul-card)' : 'var(--color-soul-surface)',
                          border: notif.read ? '1px solid var(--color-soul-border)' : '1.5px solid var(--color-soul-accent)',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '1.5rem',
                          flexWrap: 'wrap'
                        }}
                      >
                        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flex: '1 1 400px' }}>
                          <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: '14px',
                            background: iconMeta.bg,
                            color: iconMeta.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <IconComponent size={22} />
                          </div>

                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                              <h4 style={{
                                fontSize: '1rem',
                                fontWeight: notif.read ? 600 : 700,
                                color: 'var(--color-soul-primary)'
                              }}>
                                {notif.title}
                              </h4>
                              {!notif.read && (
                                <span style={{
                                  width: '8px',
                                  height: '8px',
                                  borderRadius: '50%',
                                  background: 'var(--color-soul-accent)',
                                  display: 'inline-block'
                                }} />
                              )}
                            </div>
                            <p style={{
                              fontSize: '0.9rem',
                              color: 'var(--color-soul-text)',
                              lineHeight: 1.5,
                              marginBottom: '0.5rem',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}>
                              {notif.message}
                            </p>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-soul-text-muted)', fontWeight: 500 }}>
                              {formatTime(notif.timestamp)}
                            </span>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          {notif.actionLabel && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMarkAsRead(notif.id);
                                if (notif.actionRoute) navigate(notif.actionRoute);
                              }}
                              className="soul-btn-primary"
                              style={{ padding: '0.55rem 1.15rem', fontSize: '0.8rem' }}
                            >
                              {notif.actionLabel} <ArrowRight size={14} />
                            </button>
                          )}
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="soul-card"
                    style={{
                      padding: '4rem 2rem',
                      textAlign: 'center',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: 'var(--color-soul-surface)',
                      color: 'var(--color-soul-text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem'
                    }}>
                      <Bell size={28} />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '0.4rem' }}>
                      All Caught Up
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-soul-text-muted)' }}>
                      No notifications in this category right now. You're up to date.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* ── Notification Preferences Card ─────────────────────────────── */}
            <motion.div variants={itemVariants} className="soul-card" style={{ padding: '2.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <Sliders size={20} color="var(--color-soul-accent)" />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 600, color: 'var(--color-soul-primary)' }}>
                  Notification Preferences
                </h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', marginBottom: '2rem' }}>
                Control how and when SoulMeet communicates with your private channels
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {[
                  {
                    key: 'advisorMessages' as const,
                    title: 'Advisor Notes & Consultation Updates',
                    desc: 'Real-time alerts when Dr. Priya Ramanathan shares notes or scheduling requests'
                  },
                  {
                    key: 'eventReminders' as const,
                    title: 'Curated Salon & Retreat Openings',
                    desc: 'Priority invitations to intimate gatherings for Sapphire & Diamond members'
                  },
                  {
                    key: 'newIntroductions' as const,
                    title: 'Safe Space Pairing Briefs',
                    desc: 'Immediate notifications when a curated member alignment brief is ready'
                  },
                  {
                    key: 'weeklyDigest' as const,
                    title: 'Weekly SoulHealth Summary',
                    desc: 'Every Monday morning: your emotional metrics and psychological trajectory report'
                  },
                  {
                    key: 'membershipUpdates' as const,
                    title: 'Membership & Concierge Announcements',
                    desc: 'Important status updates regarding tier renewals and private lounge privileges'
                  }
                ].map((pref) => (
                  <div
                    key={pref.key}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '1.25rem',
                      borderRadius: '14px',
                      background: 'var(--color-soul-surface)',
                      border: '1px solid var(--color-soul-border)',
                      gap: '1.5rem'
                    }}
                  >
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-soul-text)', marginBottom: '0.2rem' }}>
                        {pref.title}
                      </h4>
                      <p style={{ fontSize: '0.825rem', color: 'var(--color-soul-text-muted)' }}>
                        {pref.desc}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => togglePref(pref.key)}
                      style={{
                        width: '52px',
                        height: '28px',
                        borderRadius: '100px',
                        background: prefs[pref.key] ? 'var(--color-soul-primary)' : 'var(--color-soul-border)',
                        position: 'relative',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'background 0.2s',
                        flexShrink: 0
                      }}
                    >
                      <div
                        style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          background: '#FFFFFF',
                          position: 'absolute',
                          top: '3px',
                          left: prefs[pref.key] ? '27px' : '3px',
                          transition: 'left 0.2s',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.15)'
                        }}
                      />
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
