import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Heart, User, Calendar, MessageSquare,
  Bell, Settings, LogOut, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { getInitials } from '../../lib/utils';
import Logo from '../shared/Logo';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Soul Health', icon: Heart, to: '/soul-health' },
  { label: 'My Profile', icon: User, to: '/profile' },
  { label: 'My Advisor', icon: Calendar, to: '/advisor' },
  { label: 'Safe Space', icon: MessageSquare, to: '/safe-space' },
  { label: 'Notifications', icon: Bell, to: '/notifications' },
  { label: 'Settings', icon: Settings, to: '/settings' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      style={{
        background: 'var(--color-soul-card)',
        borderRight: '1px solid var(--color-soul-border)',
        height: '100vh',
        position: 'sticky',
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        flexShrink: 0,
        zIndex: 50,
      }}
    >
      {/* Header */}
      <div style={{ padding: '1.5rem 1rem 1rem', borderBottom: '1px solid var(--color-soul-border-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start' }}>
          <Logo
            variant={collapsed ? 'mark' : 'compact'}
            size="sm"
            showTagline={false}
          />
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', overflowY: 'auto' }}>
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            style={{ justifyContent: collapsed ? 'center' : 'flex-start' }}
            title={collapsed ? item.label : undefined}
          >
            <item.icon size={18} style={{ flexShrink: 0 }} />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div style={{ padding: '0.75rem', borderTop: '1px solid var(--color-soul-border-light)' }}>
        {/* User info */}
        {user && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.625rem',
            padding: '0.625rem', borderRadius: '12px', marginBottom: '0.5rem',
            background: 'var(--color-soul-surface)',
            justifyContent: collapsed ? 'center' : 'flex-start',
          }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'var(--color-soul-accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              color: 'var(--color-soul-primary)', fontSize: '0.75rem', fontWeight: 700,
              overflow: 'hidden',
            }}>
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
              ) : (
                getInitials(user.name)
              )}
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-soul-primary)', whiteSpace: 'nowrap' }}>{user.name.split(' ')[0]}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--color-soul-text-muted)', whiteSpace: 'nowrap' }}>{user.membershipTier}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="sidebar-link"
          style={{ width: '100%', justifyContent: collapsed ? 'center' : 'flex-start', border: 'none', cursor: 'pointer' }}
          title={collapsed ? 'Sign Out' : undefined}
        >
          <LogOut size={18} style={{ flexShrink: 0 }} />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                style={{ whiteSpace: 'nowrap' }}
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '0.5rem', marginTop: '0.25rem', borderRadius: '8px', border: 'none',
            background: 'none', cursor: 'pointer', color: 'var(--color-soul-text-muted)',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--color-soul-surface)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'none')}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </motion.aside>
  );
}
