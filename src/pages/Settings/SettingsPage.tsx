import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  User, Shield, Lock, Bell, Crown, HelpCircle, Trash2,
  CheckCircle, Loader2, Key, Smartphone, Monitor, Eye,
  Download, CreditCard, ChevronRight, AlertTriangle, Check
} from 'lucide-react';
import Sidebar from '../../components/layout/Sidebar';
import PageTransition from '../../components/shared/PageTransition';
import { useAuth } from '../../contexts/AuthContext';
import { getPasswordStrength, getInitials } from '../../lib/utils';
import { MOCK_USER } from '../../data/mock';

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

export default function SettingsPage() {
  const { user, updateUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'privacy' | 'notifications' | 'membership' | 'support' | 'delete'>('profile');

  // Profile Form State
  const [name, setName] = useState(user?.name || MOCK_USER.name);
  const [phone, setPhone] = useState('+91 98765 43210');
  const [profession, setProfession] = useState('Strategy Lead, McKinsey & Company');
  const [city, setCity] = useState('New Delhi, India');
  const [bio, setBio] = useState('Strategy consultant specializing in behavioral economics and corporate alignment. Passionate about philosophy, long-form conversation, classical architecture, and distance running.');
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  // Security Form State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [twoFactor, setTwoFactor] = useState(false);
  const [passSuccess, setPassSuccess] = useState(false);
  const passStrength = newPass.length > 0 ? getPasswordStrength(newPass) : null;

  // Privacy State
  const [privacyToggles, setPrivacyToggles] = useState({
    profileVisibility: true,
    shareInsights: true,
    memberDirectory: false,
    anonymizedResearch: true
  });

  // Notifications State
  const [notifToggles, setNotifToggles] = useState({
    advisorMessages: true,
    eventReminders: true,
    membershipUpdates: true,
    weeklySummary: true,
    newIntroductions: true
  });
  const [emailFreq, setEmailFreq] = useState<'realtime' | 'daily' | 'weekly'>('daily');

  // Support State
  const [supportSub, setSupportSub] = useState('');
  const [supportMsg, setSupportMsg] = useState('');
  const [supportSent, setSupportSent] = useState(false);

  // Delete State
  const [deleteChecked, setDeleteChecked] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileLoading(true);
    setTimeout(() => {
      updateUser({ name });
      setProfileLoading(false);
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    }, 1000);
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPass || !newPass || newPass !== confirmPass) return;
    setPassSuccess(true);
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    setTimeout(() => setPassSuccess(false), 3000);
  };

  const handleDeleteAccount = () => {
    if (!deleteChecked || deleteInput !== 'DELETE') return;
    logout();
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'privacy', label: 'Privacy & Data', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'membership', label: 'Membership & Tier', icon: Crown },
    { id: 'support', label: 'Concierge Support', icon: HelpCircle },
    { id: 'delete', label: 'Delete Account', icon: Trash2, danger: true },
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
                Settings & Preferences
              </h1>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-soul-text-muted)', marginTop: '0.2rem' }}>
                Manage your confidential membership details, security protocols, and advisory permissions
              </p>
            </motion.div>

            {/* ── Layout with Secondary Navigation ───────────────────────────── */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', alignItems: 'flex-start' }}>
              
              {/* Left Settings Navigation Menu */}
              <motion.div variants={itemVariants} className="soul-card" style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.85rem',
                        padding: '0.85rem 1rem',
                        borderRadius: '12px',
                        border: 'none',
                        background: isActive
                          ? tab.danger
                            ? 'rgba(239, 68, 68, 0.12)'
                            : 'var(--color-soul-primary)'
                          : 'transparent',
                        color: isActive
                          ? tab.danger
                            ? '#ef4444'
                            : '#FFFFFF'
                          : tab.danger
                          ? '#ef4444'
                          : 'var(--color-soul-text)',
                        fontSize: '0.9rem',
                        fontWeight: isActive ? 600 : 500,
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s'
                      }}
                    >
                      <Icon size={18} color={isActive ? (tab.danger ? '#ef4444' : '#C9A86A') : (tab.danger ? '#ef4444' : 'var(--color-soul-text-muted)')} />
                      <span style={{ flex: 1 }}>{tab.label}</span>
                      {isActive && !tab.danger && <ChevronRight size={16} />}
                    </button>
                  );
                })}
              </motion.div>

              {/* Right Content Area */}
              <motion.div variants={itemVariants} className="soul-card" style={{ padding: '2.5rem', minHeight: '600px', gridColumn: 'span 2 / span 2' }}>
                <AnimatePresence mode="wait">
                  
                  {/* ── PROFILE TAB ─────────────────────────────────────────── */}
                  {activeTab === 'profile' && (
                    <motion.div key="profile" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '0.4rem' }}>
                        Personal Details & Bio
                      </h2>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', marginBottom: '2rem' }}>
                        Update how your identity and professional background appear to your advisor
                      </p>

                      {/* Photo Section */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1.5rem', background: 'var(--color-soul-surface)', borderRadius: '16px', marginBottom: '2rem' }}>
                        <div style={{
                          width: '80px', height: '80px', borderRadius: '50%', background: 'var(--color-soul-primary)', color: '#FFFFFF',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 600
                        }}>
                          {getInitials(name)}
                        </div>
                        <div>
                          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-soul-text)', marginBottom: '0.25rem' }}>
                            Confidential Avatar
                          </div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--color-soul-text-muted)', marginBottom: '0.75rem' }}>
                            Initials shown by default to maintain privacy until a curated introduction occurs
                          </div>
                          <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button type="button" className="soul-btn-secondary" style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }} onClick={() => alert('Photo upload dialog')}>
                              Upload Photo
                            </button>
                            <button type="button" className="soul-btn-secondary" style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', opacity: 0.7 }} onClick={() => alert('Avatar reset to initials')}>
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>

                      <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                          <div>
                            <label className="soul-label">Full Name</label>
                            <input className="soul-input" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                          </div>
                          <div>
                            <label className="soul-label">Email Address (Confidential ID)</label>
                            <input className="soul-input" type="email" value={user?.email || MOCK_USER.email} disabled style={{ background: 'var(--color-soul-surface)', opacity: 0.7, cursor: 'not-allowed' }} />
                          </div>
                          <div>
                            <label className="soul-label">Phone Number</label>
                            <input className="soul-input" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                          </div>
                          <div>
                            <label className="soul-label">City & Country</label>
                            <input className="soul-input" type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                          </div>
                        </div>

                        <div>
                          <label className="soul-label">Professional Title</label>
                          <input className="soul-input" type="text" value={profession} onChange={(e) => setProfession(e.target.value)} />
                        </div>

                        <div>
                          <label className="soul-label">Personal Biography</label>
                          <textarea className="soul-input" rows={4} value={bio} onChange={(e) => setBio(e.target.value)} style={{ resize: 'vertical', lineHeight: 1.6 }} />
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid var(--color-soul-border)' }}>
                          {profileSuccess ? (
                            <span style={{ color: '#16a34a', fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <CheckCircle size={18} /> Profile changes saved securely
                            </span>
                          ) : <span />}
                          <button type="submit" disabled={profileLoading} className="soul-btn-primary" style={{ minWidth: '150px', justifyContent: 'center' }}>
                            {profileLoading ? <Loader2 size={16} className="animate-spin" /> : 'Save Profile'}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {/* ── SECURITY TAB ────────────────────────────────────────── */}
                  {activeTab === 'security' && (
                    <motion.div key="security" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '0.4rem' }}>
                        Security Protocols & Sessions
                      </h2>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', marginBottom: '2rem' }}>
                        Protect your private relational data with bank-grade security options
                      </p>

                      <form onSubmit={handleUpdatePassword} style={{ marginBottom: '2.5rem', padding: '1.75rem', background: 'var(--color-soul-surface)', borderRadius: '16px', border: '1px solid var(--color-soul-border)' }}>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '1.25rem' }}>
                          Change Password
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                          <div>
                            <label className="soul-label">Current Password</label>
                            <input className="soul-input" type="password" placeholder="••••••••" value={currentPass} onChange={(e) => setCurrentPass(e.target.value)} />
                          </div>
                          <div>
                            <label className="soul-label">New Password</label>
                            <input className="soul-input" type="password" placeholder="••••••••" value={newPass} onChange={(e) => setNewPass(e.target.value)} />
                            {passStrength && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem' }}>
                                <div style={{ flex: 1, height: '4px', background: 'var(--color-soul-border)', borderRadius: '2px', overflow: 'hidden' }}>
                                  <div style={{ width: `${(passStrength.score + 1) * 20}%`, height: '100%', background: passStrength.color, transition: 'width 0.3s' }} />
                                </div>
                                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: passStrength.color }}>{passStrength.label}</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <label className="soul-label">Confirm New Password</label>
                            <input className="soul-input" type="password" placeholder="••••••••" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} />
                          </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          {passSuccess ? (
                            <span style={{ color: '#16a34a', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                              <CheckCircle size={16} /> Password updated successfully
                            </span>
                          ) : <span />}
                          <button type="submit" className="soul-btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
                            Update Password
                          </button>
                        </div>
                      </form>

                      {/* 2FA Toggle */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'var(--color-soul-surface)', borderRadius: '16px', marginBottom: '2.5rem' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                            <Smartphone size={18} color="var(--color-soul-primary)" />
                            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-soul-text)' }}>Two-Factor Authentication (2FA)</h4>
                          </div>
                          <p style={{ fontSize: '0.825rem', color: 'var(--color-soul-text-muted)', maxWidth: '500px' }}>
                            Require a cryptographic authenticator app code every time you sign in to your confidential dashboard.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setTwoFactor(!twoFactor)}
                          style={{
                            width: '56px', height: '30px', borderRadius: '100px', background: twoFactor ? 'var(--color-soul-primary)' : 'var(--color-soul-border)',
                            position: 'relative', border: 'none', cursor: 'pointer', transition: 'background 0.2s'
                          }}
                        >
                          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#FFFFFF', position: 'absolute', top: '3px', left: twoFactor ? '29px' : '3px', transition: 'left 0.2s' }} />
                        </button>
                      </div>

                      {/* Active Sessions */}
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '1rem' }}>
                          Active Sessions
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                          {[
                            { id: '1', device: 'Web — Chrome on macOS', loc: 'New Delhi, India', time: 'Current Active Session', current: true, icon: Monitor },
                            { id: '2', device: 'Mobile — iOS App on iPhone 15 Pro', loc: 'New Delhi, India', time: 'Dec 10, 2024 · 09:14 PM', current: false, icon: Smartphone }
                          ].map((ses) => (
                            <div key={ses.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--color-soul-border)', background: 'var(--color-soul-card)' }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--color-soul-surface)', color: 'var(--color-soul-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <ses.icon size={20} />
                                </div>
                                <div>
                                  <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-soul-text)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    {ses.device}
                                    {ses.current && <span style={{ padding: '0.15rem 0.6rem', borderRadius: '100px', background: 'rgba(201, 168, 106, 0.18)', color: 'var(--color-soul-primary)', fontSize: '0.7rem', fontWeight: 700 }}>THIS DEVICE</span>}
                                  </div>
                                  <div style={{ fontSize: '0.8rem', color: 'var(--color-soul-text-muted)', marginTop: '0.2rem' }}>
                                    {ses.loc} · {ses.time}
                                  </div>
                                </div>
                              </div>
                              {!ses.current && (
                                <button type="button" className="soul-btn-secondary" style={{ padding: '0.45rem 1rem', fontSize: '0.8rem', color: '#ef4444' }} onClick={() => alert('Session revoked')}>
                                  Revoke
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── PRIVACY TAB ─────────────────────────────────────────── */}
                  {activeTab === 'privacy' && (
                    <motion.div key="privacy" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '0.4rem' }}>
                        Privacy Permissions & Data Control
                      </h2>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', marginBottom: '2rem' }}>
                        SoulMeet operates under strict confidentiality. You control who sees your profile and how data is shared.
                      </p>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                        {[
                          { key: 'profileVisibility' as const, title: 'Profile Visibility to Matched Members', desc: 'Allow your bio and values to be visible only when an advisor proposes a curated Safe Space meeting.' },
                          { key: 'shareInsights' as const, title: 'Advisor Clinical Insights Sharing', desc: 'Allow Dr. Priya Ramanathan to share anonymized compatibility scores with the SoulMeet pairing algorithm.' },
                          { key: 'memberDirectory' as const, title: 'Appear in Sapphire & Diamond Salon Directory', desc: 'Allow other verified tier members to view your name in invitation-only salon attendee lists.' },
                          { key: 'anonymizedResearch' as const, title: 'Contribute to Social Health Research', desc: 'Share completely anonymized psychometric metrics with top academic institutions studying relational wellness.' }
                        ].map((item) => (
                          <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'var(--color-soul-surface)', borderRadius: '16px', gap: '1.5rem' }}>
                            <div>
                              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-soul-text)', marginBottom: '0.2rem' }}>{item.title}</h4>
                              <p style={{ fontSize: '0.825rem', color: 'var(--color-soul-text-muted)' }}>{item.desc}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setPrivacyToggles((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                              style={{ width: '56px', height: '30px', borderRadius: '100px', background: privacyToggles[item.key] ? 'var(--color-soul-primary)' : 'var(--color-soul-border)', position: 'relative', border: 'none', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}
                            >
                              <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#FFFFFF', position: 'absolute', top: '3px', left: privacyToggles[item.key] ? '29px' : '3px', transition: 'left 0.2s' }} />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div style={{ padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--color-soul-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                            <Download size={18} color="var(--color-soul-primary)" />
                            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-soul-text)' }}>Export Your Personal Data Archive</h4>
                          </div>
                          <p style={{ fontSize: '0.825rem', color: 'var(--color-soul-text-muted)' }}>
                            Download a full encrypted JSON/PDF archive of your consultation notes, journal entries, and SoulHealth scores.
                          </p>
                        </div>
                        <button type="button" className="soul-btn-secondary" onClick={() => alert('Data export request initiated. Archive will arrive in your inbox in 15 minutes.')}>
                          Request Data Export
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── NOTIFICATIONS TAB ───────────────────────────────────── */}
                  {activeTab === 'notifications' && (
                    <motion.div key="notifications" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '0.4rem' }}>
                        Communication & Delivery Preferences
                      </h2>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', marginBottom: '2rem' }}>
                        Customize how often SoulMeet sends reminders and reports to your email and device
                      </p>

                      <div style={{ marginBottom: '2.5rem' }}>
                        <label className="soul-label" style={{ marginBottom: '0.75rem' }}>Email Digest Frequency</label>
                        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                          {[
                            { id: 'realtime', label: 'Real-Time Immediate Alerts' },
                            { id: 'daily', label: 'Daily Evening Digest (Recommended)' },
                            { id: 'weekly', label: 'Weekly Monday Summary' }
                          ].map((freq) => (
                            <button
                              key={freq.id}
                              type="button"
                              onClick={() => setEmailFreq(freq.id as any)}
                              style={{
                                padding: '0.75rem 1.5rem', borderRadius: '10px',
                                border: emailFreq === freq.id ? '2px solid var(--color-soul-accent)' : '1px solid var(--color-soul-border)',
                                background: emailFreq === freq.id ? 'var(--color-soul-primary)' : 'var(--color-soul-card)',
                                color: emailFreq === freq.id ? '#FFFFFF' : 'var(--color-soul-text)',
                                fontWeight: emailFreq === freq.id ? 600 : 500, cursor: 'pointer', transition: 'all 0.2s'
                              }}
                            >
                              {freq.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {[
                          { key: 'advisorMessages' as const, title: 'Advisor Consultation Notes', desc: 'Direct messages and clinical summaries shared by Dr. Priya' },
                          { key: 'eventReminders' as const, title: 'Salon & Retreat Invitations', desc: 'Alerts when limited spots open in curated wellness gatherings' },
                          { key: 'membershipUpdates' as const, title: 'Membership & Tier Privileges', desc: 'Concierge announcements and annual renewal notifications' },
                          { key: 'weeklySummary' as const, title: 'Weekly SoulHealth Trajectory Report', desc: 'Analysis of your stress levels, mood trends, and social health progress' },
                          { key: 'newIntroductions' as const, title: 'New Safe Space Match Proposals', desc: 'Immediate alert when your advisor prepares a new connection brief' }
                        ].map((item) => (
                          <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', background: 'var(--color-soul-surface)', borderRadius: '14px', gap: '1.5rem' }}>
                            <div>
                              <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-soul-text)', marginBottom: '0.2rem' }}>{item.title}</h4>
                              <p style={{ fontSize: '0.825rem', color: 'var(--color-soul-text-muted)' }}>{item.desc}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => setNotifToggles((prev) => ({ ...prev, [item.key]: !prev[item.key] }))}
                              style={{ width: '52px', height: '28px', borderRadius: '100px', background: notifToggles[item.key] ? 'var(--color-soul-primary)' : 'var(--color-soul-border)', position: 'relative', border: 'none', cursor: 'pointer', transition: 'background 0.2s', flexShrink: 0 }}
                            >
                              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#FFFFFF', position: 'absolute', top: '3px', left: notifToggles[item.key] ? '27px' : '3px', transition: 'left 0.2s' }} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* ── MEMBERSHIP TAB ──────────────────────────────────────── */}
                  {activeTab === 'membership' && (
                    <motion.div key="membership" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '0.4rem' }}>
                        Membership Tier & Billing
                      </h2>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', marginBottom: '2rem' }}>
                        Review your Sapphire privileges, renewal status, and private concierge benefits
                      </p>

                      {/* Current Tier Card */}
                      <div style={{ padding: '2rem', borderRadius: '20px', background: 'var(--color-soul-primary)', color: '#FFFFFF', marginBottom: '2.5rem', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-hover)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                          <div>
                            <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-soul-accent)' }}>
                              CURRENT MEMBERSHIP TIER
                            </span>
                            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 600, color: '#FFFFFF', marginTop: '0.2rem' }}>
                              Sapphire Member
                            </h3>
                          </div>
                          <div style={{ padding: '0.5rem 1rem', borderRadius: '100px', background: 'rgba(201, 168, 106, 0.2)', border: '1px solid var(--color-soul-accent)', color: 'var(--color-soul-accent)', fontSize: '0.85rem', fontWeight: 600 }}>
                            Active · Renews Jan 15, 2025
                          </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.15)', paddingTop: '1.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <CheckCircle size={18} color="var(--color-soul-accent)" />
                            <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.9)' }}>Dedicated Relationship Psychologist</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <CheckCircle size={18} color="var(--color-soul-accent)" />
                            <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.9)' }}>2 Curated Safe Space Pairings / Month</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <CheckCircle size={18} color="var(--color-soul-accent)" />
                            <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.9)' }}>Access to Sapphire Salons & Dinners</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                            <CheckCircle size={18} color="var(--color-soul-accent)" />
                            <span style={{ fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.9)' }}>Weekly SoulHealth Psychometric Analytics</span>
                          </div>
                        </div>
                      </div>

                      {/* Upgrade Option */}
                      <div style={{ padding: '2rem', borderRadius: '18px', background: 'var(--color-soul-surface)', border: '1.5px solid var(--color-soul-accent)', marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                            <Crown size={20} color="var(--color-soul-accent)" />
                            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-soul-primary)' }}>
                              Upgrade to Diamond Membership
                            </h4>
                          </div>
                          <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', maxWidth: '540px' }}>
                            Includes unlimited sessions with senior psychologists, priority concierge table reservations worldwide, and invitations to private annual retreats.
                          </p>
                        </div>
                        <button type="button" className="soul-btn-primary" style={{ padding: '0.8rem 2rem' }} onClick={() => alert('Upgrade inquiry sent to your private concierge.')}>
                          Request Diamond Upgrade
                        </button>
                      </div>

                      {/* Billing & Payment Methods */}
                      <div>
                        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '1rem' }}>
                          Billing & Payment Method
                        </h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', borderRadius: '14px', border: '1px solid var(--color-soul-border)', background: 'var(--color-soul-card)' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: '48px', height: '32px', borderRadius: '6px', background: '#1e293b', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                              VISA
                            </div>
                            <div>
                              <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-soul-text)' }}>Visa ending in 4242</div>
                              <div style={{ fontSize: '0.8rem', color: 'var(--color-soul-text-muted)' }}>Expires 08/2027 · Primary confidential billing card</div>
                            </div>
                          </div>
                          <button type="button" className="soul-btn-secondary" style={{ padding: '0.45rem 1rem', fontSize: '0.8rem' }} onClick={() => alert('Update card dialog')}>
                            Update Card
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* ── SUPPORT TAB ─────────────────────────────────────────── */}
                  {activeTab === 'support' && (
                    <motion.div key="support" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '0.4rem' }}>
                        Concierge Support & Advisory Help
                      </h2>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', marginBottom: '2rem' }}>
                        Our human concierge team is available 24/7 to assist with scheduling or relational guidance
                      </p>

                      {supportSent ? (
                        <div style={{ padding: '3rem', borderRadius: '16px', background: 'rgba(34, 197, 94, 0.08)', border: '1px solid rgba(34, 197, 94, 0.25)', textAlign: 'center', marginBottom: '2rem' }}>
                          <CheckCircle size={36} color="#16a34a" style={{ margin: '0 auto 1rem' }} />
                          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 600, color: '#16a34a', marginBottom: '0.4rem' }}>
                            Message Received by Concierge
                          </h3>
                          <p style={{ fontSize: '0.9rem', color: 'var(--color-soul-text-muted)', maxWidth: '450px', margin: '0 auto' }}>
                            Your dedicated relationship coordinator has been alerted and will reach out via phone or encrypted message within 2 hours.
                          </p>
                        </div>
                      ) : (
                        <form onSubmit={(e) => { e.preventDefault(); if (supportSub && supportMsg) setSupportSent(true); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
                          <div>
                            <label className="soul-label">Inquiry Subject</label>
                            <input className="soul-input" type="text" placeholder="e.g., Scheduling assistance, Advisor feedback, Salon invitation..." value={supportSub} onChange={(e) => setSupportSub(e.target.value)} />
                          </div>
                          <div>
                            <label className="soul-label">How can our concierge team assist you today?</label>
                            <textarea className="soul-input" rows={4} placeholder="Please share as much detail as you feel comfortable with..." value={supportMsg} onChange={(e) => setSupportMsg(e.target.value)} style={{ resize: 'vertical' }} />
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button type="submit" disabled={!supportSub || !supportMsg} className="soul-btn-primary" style={{ padding: '0.75rem 2.25rem' }}>
                              Send Confidential Message
                            </button>
                          </div>
                        </form>
                      )}

                      <div style={{ padding: '1.75rem', borderRadius: '16px', background: 'var(--color-soul-surface)', border: '1px solid var(--color-soul-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
                        <div>
                          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 600, color: 'var(--color-soul-primary)' }}>
                            Prefer a Private Telephone Consultation?
                          </h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', marginTop: '0.2rem' }}>
                            Schedule a 15-minute call directly with our Senior Member Relationship Director.
                          </p>
                        </div>
                        <button type="button" className="soul-btn-secondary" style={{ padding: '0.65rem 1.5rem' }} onClick={() => alert('Telephone consultation scheduled for tomorrow morning.')}>
                          Schedule Concierge Call
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── DELETE ACCOUNT TAB ──────────────────────────────────── */}
                  {activeTab === 'delete' && (
                    <motion.div key="delete" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem', color: '#ef4444' }}>
                        <AlertTriangle size={24} />
                        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.85rem', fontWeight: 600 }}>
                          Permanently Delete Membership
                        </h2>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', marginBottom: '2rem' }}>
                        Deleting your SoulMeet membership will permanently erase your clinical records, psychometric profile, and verified status.
                      </p>

                      <div style={{ padding: '1.75rem', borderRadius: '16px', background: 'rgba(239, 68, 68, 0.06)', border: '1px solid rgba(239, 68, 68, 0.25)', marginBottom: '2.5rem' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#ef4444', marginBottom: '0.75rem' }}>
                          What happens when you delete your account:
                        </h4>
                        <ul style={{ paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--color-soul-text)' }}>
                          <li>All consultation summaries with Dr. Priya Ramanathan will be permanently purged.</li>
                          <li>Your encrypted identity verification documents will be deleted from our secure servers.</li>
                          <li>Any pending invitations to Sapphire or Diamond salons will be cancelled.</li>
                          <li>Re-entry to SoulMeet in the future will require going through the invitation and review process again.</li>
                        </ul>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '500px' }}>
                        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={deleteChecked}
                            onChange={(e) => setDeleteChecked(e.target.checked)}
                            style={{ marginTop: '3px', width: '16px', height: '16px', cursor: 'pointer' }}
                          />
                          <span style={{ fontSize: '0.875rem', color: 'var(--color-soul-text)', fontWeight: 500 }}>
                            I understand that this action is permanent and completely irreversible.
                          </span>
                        </label>

                        <div>
                          <label className="soul-label" style={{ marginBottom: '0.5rem' }}>
                            Type <strong>DELETE</strong> in all caps to confirm:
                          </label>
                          <input
                            className="soul-input"
                            type="text"
                            placeholder="DELETE"
                            value={deleteInput}
                            onChange={(e) => setDeleteInput(e.target.value)}
                            style={{ borderColor: deleteInput === 'DELETE' ? '#ef4444' : 'var(--color-soul-border)' }}
                          />
                        </div>

                        <button
                          type="button"
                          disabled={!deleteChecked || deleteInput !== 'DELETE'}
                          onClick={handleDeleteAccount}
                          style={{
                            padding: '0.85rem 2rem',
                            borderRadius: '10px',
                            background: deleteChecked && deleteInput === 'DELETE' ? '#ef4444' : 'var(--color-soul-border)',
                            color: '#FFFFFF',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            border: 'none',
                            cursor: deleteChecked && deleteInput === 'DELETE' ? 'pointer' : 'not-allowed',
                            transition: 'all 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <Trash2 size={18} /> Permanently Delete My Account
                        </button>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </motion.div>
            </div>

          </motion.div>
        </PageTransition>
      </main>
    </div>
  );
}
