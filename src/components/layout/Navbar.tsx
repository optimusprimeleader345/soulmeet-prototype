import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Logo from '../shared/Logo';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Membership', href: '#membership' },
  { label: 'Philosophy', href: '#philosophy' },
  { label: 'AI', href: '#ai' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(248,245,241,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-soul-border)' : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Logo variant="compact" size="sm" showTagline={false} />
        </Link>

        {/* Desktop Nav */}
        {isLanding && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hidden md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--color-soul-text-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-soul-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-soul-text-muted)')}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isAuthenticated ? (
            <button className="soul-btn-primary" onClick={() => navigate('/dashboard')} style={{ padding: '0.6rem 1.25rem' }}>
              Dashboard
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                style={{
                  fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 500,
                  color: 'var(--color-soul-primary)', background: 'none', border: 'none',
                  cursor: 'pointer', padding: '0.5rem',
                }}
              >
                Sign In
              </button>
              <button className="soul-btn-primary" onClick={() => navigate('/apply')} style={{ padding: '0.6rem 1.25rem' }}>
                Apply
              </button>
            </>
          )}
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-soul-primary)', display: 'none' }}
            className="md:hidden block"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              overflow: 'hidden',
              background: 'rgba(248,245,241,0.98)',
              borderBottom: '1px solid var(--color-soul-border)',
              padding: '0 2rem 1.5rem',
            }}
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block', padding: '0.75rem 0',
                  fontFamily: 'var(--font-body)', fontSize: '1rem',
                  color: 'var(--color-soul-text)', textDecoration: 'none',
                  borderBottom: '1px solid var(--color-soul-border-light)',
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
