import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Shield, Star, Users, TrendingUp, ChevronDown, Quote, CheckCircle } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import PageTransition from '../../components/shared/PageTransition';
import Logo from '../../components/shared/Logo';
import { TESTIMONIALS, FAQ_ITEMS } from '../../data/mock';

// ─── Animated counter ──────────────────────────────────────────────────────────
function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = React.useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 20);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── Section: Hero ─────────────────────────────────────────────────────────────
function Hero() {
  const navigate = useNavigate();
  return (
    <section id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', background: 'var(--color-soul-bg)' }}>
      {/* Subtle bg circles */}
      <div style={{ position: 'absolute', top: '10%', right: '5%', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(201,168,106,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', left: '2%', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(168,184,165,0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '6rem 2rem 4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="soul-badge soul-badge-accent" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
              <Shield size={12} />
              Invitation Only — Now Accepting Applications
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 5vw, 3.75rem)', fontWeight: 500, color: 'var(--color-soul-primary)', lineHeight: 1.15, marginBottom: '1.5rem' }}
          >
            From the Labour<br />
            of Loneliness<br />
            <em style={{ color: 'var(--color-soul-accent)', fontStyle: 'italic' }}>to the Solace</em><br />
            of Solitude.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            style={{ fontSize: '1.05rem', color: 'var(--color-soul-text-muted)', lineHeight: 1.75, marginBottom: '2.5rem', maxWidth: '480px' }}
          >
            SoulMeet is an exclusive Social Health Companion for high-achieving professionals. 
            We curate meaningful human connections — not through algorithms, but through the art 
            of careful listening and expert human guidance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
          >
            <button className="soul-btn-primary" onClick={() => navigate('/signup')} style={{ fontSize: '0.9rem', padding: '0.875rem 2rem' }}>
              Apply for Membership <ArrowRight size={16} />
            </button>
            <button className="soul-btn-secondary" onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} style={{ fontSize: '0.9rem', padding: '0.875rem 2rem' }}>
              Learn More <ChevronDown size={16} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{ display: 'flex', gap: '2rem', marginTop: '3rem', flexWrap: 'wrap' }}
          >
            {[{ label: 'Verified Members', value: '2,400+' }, { label: 'Satisfaction Rate', value: '97%' }, { label: 'Cities', value: '18' }].map((s) => (
              <div key={s.label}>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 600, color: 'var(--color-soul-primary)' }}>{s.value}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-soul-text-muted)', marginTop: '0.125rem' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — decorative illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{ position: 'relative' }}
          className="hidden md:block"
        >
          <div style={{
            background: 'var(--color-soul-card)',
            borderRadius: '28px',
            padding: '2.5rem',
            boxShadow: '0 16px 48px rgba(74,52,40,0.1)',
            border: '1px solid var(--color-soul-border)',
          }}>
            {/* Premium Lifestyle Hero Photograph (Two professionals in resort lounge, warm sunlight) */}
            <div style={{ marginBottom: '2rem', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 12px 32px rgba(74,52,40,0.12)', position: 'relative' }}>
              <img
                src="/images/Couple.jpg"
                alt="Couple connecting in luxury resort lounge"
                style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(74,52,40,0.35) 0%, transparent 60%)' }} />
            </div>

            {/* Quote card with Logo */}
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--color-soul-border)' }}>
                <Logo variant="full" size="md" />
              </div>
              <Quote size={28} color="var(--color-soul-accent)" style={{ opacity: 0.6, marginBottom: '1rem' }} />
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontStyle: 'italic', color: 'var(--color-soul-primary)', lineHeight: 1.5 }}>
                "The quality of your relationships is the quality of your life."
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-soul-text-muted)', marginTop: '0.75rem' }}>— Esther Perel</p>
            </div>

            {/* Stats */}
            {[
              { label: 'SoulHealth Score', value: 84, color: 'var(--color-soul-accent)' },
              { label: 'Relationship Depth', value: 72, color: 'var(--color-soul-secondary)' },
              { label: 'Wellbeing Growth', value: 91, color: 'var(--color-soul-primary)' },
            ].map((stat) => (
              <div key={stat.label} style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-soul-text-muted)', fontWeight: 500 }}>{stat.label}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-soul-primary)' }}>{stat.value}%</span>
                </div>
                <div style={{ height: '6px', background: 'var(--color-soul-surface)', borderRadius: '3px', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.value}%` }}
                    transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
                    style={{ height: '100%', background: stat.color, borderRadius: '3px' }}
                  />
                </div>
              </div>
            ))}

            {/* Member avatars */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem', padding: '1rem', background: 'var(--color-soul-surface)', borderRadius: '12px' }}>
              <div style={{ display: 'flex' }}>
                {['AM', 'RK', 'NJ'].map((initials, i) => (
                  <div key={initials} style={{
                    width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #fff',
                    background: i === 0 ? 'var(--color-soul-primary)' : i === 1 ? 'var(--color-soul-accent)' : 'var(--color-soul-secondary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.65rem', fontWeight: 700, color: i === 1 ? 'var(--color-soul-primary)' : '#fff',
                    marginLeft: i > 0 ? '-8px' : 0,
                  }}>{initials}</div>
                ))}
              </div>
              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-soul-primary)' }}>New introductions this week</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-soul-text-muted)' }}>3 curated connections made</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Stats ────────────────────────────────────────────────────────────
function Stats() {
  const stats = [
    { icon: Users, value: 2400, suffix: '+', label: 'Verified Members', desc: 'Professionals from 18 cities' },
    { icon: Star, value: 97, suffix: '%', label: 'Member Satisfaction', desc: 'Consistently above 95%' },
    { icon: TrendingUp, value: 84, suffix: '%', label: 'Wellbeing Improvement', desc: 'After 3 months with SoulMeet' },
    { icon: Shield, value: 12000, suffix: '+', label: 'Meaningful Conversations', desc: 'Facilitated since inception' },
  ];

  return (
    <section id="about" style={{ padding: '6rem 2rem', background: 'var(--color-soul-card)', borderTop: '1px solid var(--color-soul-border)', borderBottom: '1px solid var(--color-soul-border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-soul-accent)', marginBottom: '1rem' }}>The Evidence</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-soul-primary)', fontWeight: 500 }}>
            Connection, measured carefully
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="soul-card soul-card-hover"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              style={{ padding: '2rem', textAlign: 'center' }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'rgba(201,168,106,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                <stat.icon size={22} color="var(--color-soul-accent)" />
              </div>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '0.25rem' }}>
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ fontWeight: 600, color: 'var(--color-soul-text)', marginBottom: '0.375rem', fontSize: '0.925rem' }}>{stat.label}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-soul-text-muted)' }}>{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: How It Works ─────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    { num: '01', title: 'Apply', desc: 'Submit your thoughtful application. Each one is reviewed personally by our membership team.' },
    { num: '02', title: 'Assessment', desc: 'Complete a 25-minute psychometric and values assessment grounded in attachment theory.' },
    { num: '03', title: 'Relationship Advisor', desc: 'Be matched with your personal Relationship Advisor who will guide every introduction.' },
    { num: '04', title: 'Meaningful Connection', desc: 'Meet your curated introductions in safe, beautiful spaces designed for depth and ease.' },
  ];

  return (
    <section id="philosophy" style={{ padding: '6rem 2rem', background: 'var(--color-soul-bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-soul-accent)', marginBottom: '1rem' }}>The Process</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-soul-primary)', fontWeight: 500, marginBottom: '1rem' }}>
            How SoulMeet works
          </h2>
          <p style={{ color: 'var(--color-soul-text-muted)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Every step is designed with intention. Nothing is rushed. Everything is human.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2rem' }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              className="soul-card soul-card-hover"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}
            >
              <div style={{
                position: 'absolute', top: '-10px', right: '-10px',
                fontFamily: 'var(--font-heading)', fontSize: '5rem', fontWeight: 700,
                color: 'rgba(201,168,106,0.06)', lineHeight: 1, pointerEvents: 'none',
              }}>
                {step.num}
              </div>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: 'var(--color-soul-primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>
                <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1rem', color: 'var(--color-soul-accent)', fontWeight: 600 }}>{step.num}</span>
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-soul-primary)', marginBottom: '0.75rem', fontWeight: 500 }}>{step.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-soul-text-muted)', lineHeight: 1.65 }}>{step.desc}</p>
              {i < steps.length - 1 && (
                <div style={{ position: 'absolute', right: '-1rem', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }} className="hidden md:block">
                  <ArrowRight size={16} color="var(--color-soul-accent)" style={{ opacity: 0.5 }} />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: Benefits ─────────────────────────────────────────────────────────
function Benefits() {
  const navigate = useNavigate();
  const benefits = [
    { title: 'Personal Relationship Advisor', desc: 'A dedicated expert who understands your emotional landscape, attachment style, and what you truly need in a connection.' },
    { title: 'Curated Introductions', desc: 'No algorithms. No swiping. Each introduction is personally selected by your advisor after careful consideration.' },
    { title: 'SoulHealth Tracking', desc: 'A private dashboard that tracks your emotional wellbeing, meaningful conversations, and relationship growth over time.' },
    { title: 'Safe Space Sessions', desc: 'Structured conversation experiences at curated partner venues — quiet, beautiful spaces designed for depth.' },
    { title: 'Member Events', desc: 'Intimate gatherings, retreats, and workshops for members at the world\'s finest venues — curated for connection.' },
    { title: 'Complete Privacy', desc: 'End-to-end encrypted profiles, confidentiality agreements for all advisors, and zero data sharing — ever.' },
  ];

  return (
    <section id="membership" style={{ padding: '6rem 2rem', background: 'var(--color-soul-card)', borderTop: '1px solid var(--color-soul-border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-soul-accent)', marginBottom: '1rem' }}>Membership</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-soul-primary)', fontWeight: 500, marginBottom: '1rem' }}>
            Everything you need,<br />nothing you don't
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              className="soul-card soul-card-hover"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              style={{ padding: '1.75rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
            >
              <div style={{ flexShrink: 0, marginTop: '0.125rem' }}>
                <CheckCircle size={20} color="var(--color-soul-accent)" />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--color-soul-primary)', marginBottom: '0.5rem', fontWeight: 500 }}>{b.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-soul-text-muted)', lineHeight: 1.65 }}>{b.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center' }}
        >
          <button className="soul-btn-primary" onClick={() => navigate('/signup')} style={{ fontSize: '0.95rem', padding: '0.9rem 2.5rem' }}>
            Apply for Membership <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Section: Testimonials ─────────────────────────────────────────────────────
function Testimonials() {
  const [active, setActive] = React.useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  const t = TESTIMONIALS[active];

  return (
    <section style={{ padding: '6rem 2rem', background: 'var(--color-soul-primary)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-soul-accent)', marginBottom: '1rem' }}>Member Stories</p>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#fff', fontWeight: 500, marginBottom: '3rem' }}>
          Heard from our members
        </h2>

        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: '2.5rem' }}
        >
          <Quote size={32} color="var(--color-soul-accent)" style={{ opacity: 0.5, margin: '0 auto 1.5rem' }} />
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', lineHeight: 1.6, marginBottom: '2rem' }}>
            "{t.quote}"
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {t.avatar && (
              <img
                src={t.avatar}
                alt={t.name}
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '1rem',
                  border: '2px solid var(--color-soul-accent)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                }}
              />
            )}
            <div style={{ fontWeight: 600, color: '#fff', marginBottom: '0.25rem' }}>{t.name}</div>
            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.55)' }}>{t.title} · {t.location}</div>
            <div className="soul-badge soul-badge-accent" style={{ display: 'inline-flex', marginTop: '0.75rem' }}>{t.tier} Member</div>
          </div>
        </motion.div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? '24px' : '8px', height: '8px', borderRadius: '4px',
                background: i === active ? 'var(--color-soul-accent)' : 'rgba(255,255,255,0.25)',
                border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                padding: 0,
              }}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Section: FAQ ──────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = React.useState<number | null>(null);

  return (
    <section id="contact" style={{ padding: '6rem 2rem', background: 'var(--color-soul-bg)' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-soul-accent)', marginBottom: '1rem' }}>Questions</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-soul-primary)', fontWeight: 500 }}>Frequently asked</h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {FAQ_ITEMS.map((item, i) => (
            <motion.div
              key={i}
              className="soul-card"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              style={{ overflow: 'hidden' }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{
                  width: '100%', padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left',
                }}
              >
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-soul-primary)', flex: 1, paddingRight: '1rem' }}>
                  {item.question}
                </span>
                <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={18} color="var(--color-soul-accent)" />
                </motion.div>
              </button>
              <motion.div
                initial={false}
                animate={{ height: open === i ? 'auto' : 0, opacity: open === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ overflow: 'hidden' }}
              >
                <p style={{ padding: '0 1.5rem 1.25rem', fontSize: '0.9rem', color: 'var(--color-soul-text-muted)', lineHeight: 1.7 }}>
                  {item.answer}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AI Section ────────────────────────────────────────────────────────────────
function AISection() {
  return (
    <section id="ai" style={{ padding: '6rem 2rem', background: 'var(--color-soul-surface)', borderTop: '1px solid var(--color-soul-border)', borderBottom: '1px solid var(--color-soul-border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-soul-accent)', marginBottom: '1rem' }}>AI + Human Intelligence</p>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', color: 'var(--color-soul-primary)', fontWeight: 500, marginBottom: '1.25rem' }}>
            Technology in service<br />of humanity
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-soul-text-muted)', lineHeight: 1.75, marginBottom: '1.5rem' }}>
            SoulMeet uses AI not to replace human judgement, but to enrich it. Our SoulHealth system surfaces emotional patterns, 
            tracks wellbeing over time, and surfaces insights for your Relationship Advisor — who then applies the irreplaceable 
            intelligence of human empathy.
          </p>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-soul-text-muted)', lineHeight: 1.75 }}>
            Every introduction remains a human decision. Every session remains a human conversation. AI is the compass; your advisor is the guide.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="soul-card" style={{ overflow: 'hidden' }}>
            <div style={{ height: '150px', position: 'relative', overflow: 'hidden' }}>
              <img
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
                alt="AI + Human Intelligence abstract luxury visualization"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, var(--color-soul-card) 100%)' }} />
            </div>
            <div style={{ padding: '0.5rem 2rem 2rem 2rem' }}>
              {[
                { label: 'Attachment Style Analysis', desc: 'Grounded in Bowlby & Ainsworth research' },
              { label: 'Conversation Pattern Recognition', desc: 'Identifies depth, reciprocity, and authenticity signals' },
              { label: 'Wellbeing Trend Forecasting', desc: 'Predicts burnout risk before it becomes visible' },
              { label: 'Compatibility Mapping', desc: 'Values-first, not interest-first — aligned at the level of character' },
            ].map((feature, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', padding: '1rem 0', borderBottom: i < 3 ? '1px solid var(--color-soul-border-light)' : 'none' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-soul-accent)', flexShrink: 0, marginTop: '6px' }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-soul-primary)', marginBottom: '0.25rem' }}>{feature.label}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-soul-text-muted)' }}>{feature.desc}</div>
                </div>
              </div>
            ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CTA Banner ────────────────────────────────────────────────────────────────
function CTABanner() {
  const navigate = useNavigate();
  return (
    <section style={{ padding: '5rem 2rem', background: 'var(--color-soul-bg)', textAlign: 'center' }}>
      <div style={{ maxWidth: '620px', margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-soul-primary)', fontWeight: 500, marginBottom: '1.25rem' }}>
            Ready to invest in<br />your social health?
          </h2>
          <p style={{ color: 'var(--color-soul-text-muted)', marginBottom: '2.5rem', lineHeight: 1.7, fontSize: '1rem' }}>
            Membership is by application only. We review every submission personally and accept members who are genuinely committed to the work of meaningful connection.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="soul-btn-primary" onClick={() => navigate('/signup')} style={{ fontSize: '0.95rem', padding: '0.9rem 2.5rem' }}>
              Apply for Membership <ArrowRight size={16} />
            </button>
            <button className="soul-btn-secondary" onClick={() => navigate('/login')} style={{ fontSize: '0.95rem', padding: '0.9rem 2rem' }}>
              Sign In
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── Main ──────────────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <PageTransition>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <HowItWorks />
        <Benefits />
        <AISection />
        <Testimonials />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </PageTransition>
  );
}
