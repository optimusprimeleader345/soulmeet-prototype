import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, Mail, MessageCircle } from 'lucide-react';
import Logo from '../shared/Logo';

const footerLinks = {
  Platform: ['Dashboard', 'SoulHealth', 'Find Advisor', 'Events'],
  Company: ['About Us', 'Philosophy', 'Careers', 'Press'],
  Support: ['Help Center', 'Privacy Policy', 'Terms of Service', 'Contact'],
};

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--color-soul-primary)',
      color: 'rgba(255,255,255,0.75)',
      padding: '4rem 2rem 2rem',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '1.25rem' }}>
              <Logo variant="full" size="md" color="white" />
            </div>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1.5rem', color: 'rgba(255,255,255,0.6)' }}>
              An exclusive Social Health Companion for professionals seeking meaningful human connection.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[Globe, Mail, MessageCircle].map((Icon, i) => (
                <a key={i} href="#" style={{
                  width: '34px', height: '34px', borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)', transition: 'background 0.2s, color 0.2s', textDecoration: 'none',
                }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(201,168,106,0.25)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-soul-accent)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)'; }}
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 style={{
                fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600,
                letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-soul-accent)',
                marginBottom: '1rem',
              }}>
                {section}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" style={{
                      fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#fff')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)')}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-soul-accent)',
              marginBottom: '1rem',
            }}>
              The Quiet Letter
            </h4>
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem', lineHeight: 1.6 }}>
              Monthly reflections on social health, connection, and the art of meaningful relationship.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  flex: 1, padding: '0.625rem 0.875rem', borderRadius: '8px',
                  background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)',
                  color: '#fff', fontSize: '0.875rem', outline: 'none',
                  fontFamily: 'var(--font-body)',
                }}
              />
              <button style={{
                padding: '0.625rem 1rem', borderRadius: '8px',
                background: 'var(--color-soul-accent)', color: 'var(--color-soul-primary)',
                border: 'none', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
            © 2024 SoulMeet. All rights reserved. Built with care for human connection.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['Privacy', 'Terms', 'Accessibility'].map((label) => (
              <a key={label} href="#" style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>{label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
