import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
  TrendingUp, TrendingDown, Activity, Brain, Star,
} from 'lucide-react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  RadarChart, PolarGrid, PolarAngleAxis, Radar,
  PieChart, Pie, Cell,
  CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import Sidebar from '../../components/layout/Sidebar';
import PageTransition from '../../components/shared/PageTransition';
import {
  SOUL_HEALTH_DATA,
  RELATIONSHIP_HEALTH_DATA,
  WELLBEING_CATEGORIES,
} from '../../data/mock';

// ─── Animation Variants ──────────────────────────────────────────────────────

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

// ─── Ring Progress ───────────────────────────────────────────────────────────

function ScoreRing({ score, size = 140, strokeWidth = 10 }: { score: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="var(--color-soul-border)" strokeWidth={strokeWidth} />
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
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.4 }}
      />
    </svg>
  );
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: 'var(--color-soul-card)',
          border: '1px solid var(--color-soul-border)',
          borderRadius: '12px',
          padding: '0.75rem 1rem',
          boxShadow: 'var(--shadow-card)',
          fontFamily: 'var(--font-body)',
        }}
      >
        <div style={{ fontSize: '0.75rem', color: 'var(--color-soul-text-muted)', marginBottom: '0.35rem', fontWeight: 600 }}>{label}</div>
        {payload.map((entry) => (
          <div key={entry.name} style={{ fontSize: '0.85rem', color: entry.color, fontWeight: 600 }}>
            {entry.name}: {entry.value}
          </div>
        ))}
      </div>
    );
  }
  return null;
}

// ─── Chart Card Wrapper ────────────────────────────────────────────────────────

function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <motion.div variants={itemVariants} className="soul-card" style={{ padding: '1.5rem' }}>
      <div style={{ marginBottom: '1.25rem' }}>
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '0.2rem' }}>
          {title}
        </h3>
        {subtitle && (
          <p style={{ fontSize: '0.75rem', color: 'var(--color-soul-text-muted)' }}>{subtitle}</p>
        )}
      </div>
      {children}
    </motion.div>
  );
}

// ─── Radar Data format for recharts ──────────────────────────────────────────

const radarData = RELATIONSHIP_HEALTH_DATA.map((d) => ({
  subject: d.dimension,
  score: d.score,
  fullMark: 100,
}));

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SoulHealthPage() {
  const latestWeek = SOUL_HEALTH_DATA[SOUL_HEALTH_DATA.length - 1];
  const firstWeek = SOUL_HEALTH_DATA[0];
  const moodImprovement = Math.round(((latestWeek.moodScore - firstWeek.moodScore) / firstWeek.moodScore) * 100);
  const stressImprovement = Math.round(((firstWeek.stressLevel - latestWeek.stressLevel) / firstWeek.stressLevel) * 100);
  const convoImprovement = Math.round(((latestWeek.meaningfulConversations - firstWeek.meaningfulConversations) / firstWeek.meaningfulConversations) * 100);

  const insights = [
    {
      icon: TrendingUp,
      color: '#4A6647',
      bg: 'rgba(168,184,165,0.2)',
      title: 'Mood improving consistently',
      detail: `Up ${moodImprovement}% since Week 1 — your emotional baseline is strengthening with each session.`,
    },
    {
      icon: TrendingDown,
      color: '#8B6914',
      bg: 'rgba(201,168,106,0.12)',
      title: 'Stress at lowest recorded level',
      detail: `Down ${stressImprovement}% since Week 1 — a remarkable shift driven by consistency and self-awareness.`,
    },
    {
      icon: Activity,
      color: 'var(--color-soul-primary)',
      bg: 'rgba(74,52,40,0.08)',
      title: 'Meaningful conversations doubled',
      detail: `Up ${convoImprovement}% over the 12-week period — your capacity for depth is visibly expanding.`,
    },
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

            {/* ── Page Header ─────────────────────────────────────────────── */}
            <motion.div variants={itemVariants} style={{ marginBottom: '2rem' }}>
              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '2.25rem',
                  fontWeight: 600,
                  color: 'var(--color-soul-primary)',
                  lineHeight: 1.15,
                  marginBottom: '0.4rem',
                }}
              >
                SoulHealth Dashboard
              </h1>
              <p style={{ fontSize: '0.9rem', color: 'var(--color-soul-text-muted)', maxWidth: '520px', lineHeight: 1.6 }}>
                A 12-week view of your emotional and relational wellbeing. Data drawn from your sessions, check-ins, and advisor notes.
              </p>
            </motion.div>

            {/* ── Overall Score Card ──────────────────────────────────────── */}
            <motion.div
              variants={itemVariants}
              className="soul-card"
              style={{
                marginBottom: '1.5rem',
                padding: '2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '2.5rem',
                flexWrap: 'wrap',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Background accent */}
              <div
                style={{
                  position: 'absolute',
                  right: '-60px',
                  top: '-60px',
                  width: '240px',
                  height: '240px',
                  borderRadius: '50%',
                  background: 'rgba(201,168,106,0.06)',
                  pointerEvents: 'none',
                }}
              />

              {/* Ring */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <ScoreRing score={84} />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '2px',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '2.5rem',
                      fontWeight: 700,
                      color: 'var(--color-soul-primary)',
                      lineHeight: 1,
                    }}
                  >
                    84
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--color-soul-text-muted)', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    / 100
                  </span>
                </div>
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '0.5rem' }}>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-soul-primary)' }}>
                    Overall SoulHealth Score
                  </h2>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0.25rem 0.875rem',
                      borderRadius: '100px',
                      background: 'rgba(201,168,106,0.15)',
                      color: '#8B6914',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                    }}
                  >
                    Grade A
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-soul-text-muted)', lineHeight: 1.7, maxWidth: '440px', marginBottom: '1.25rem' }}>
                  Your score reflects emotional resilience, quality of connection, and self-awareness. You're in the top 18% of SoulMeet members.
                </p>

                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  {[
                    { label: 'Mood Score', value: `${latestWeek.moodScore}/100`, trend: '+45%', up: true },
                    { label: 'Stress Level', value: `${latestWeek.stressLevel}/100`, trend: '-47%', up: false },
                    { label: 'Conversations', value: `${latestWeek.meaningfulConversations}/wk`, trend: '+450%', up: true },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-soul-text-muted)', marginBottom: '0.2rem' }}>
                        {stat.label}
                      </div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-soul-primary)', lineHeight: 1 }}>
                        {stat.value}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: stat.up ? '#4A6647' : '#8B6914', fontWeight: 600, marginTop: '0.15rem' }}>
                        {stat.trend} this month
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Charts Grid ─────────────────────────────────────────────── */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(480px, 1fr))',
                gap: '1.25rem',
                marginBottom: '1.5rem',
              }}
            >

              {/* 1. Mood Trajectory – LineChart */}
              <ChartCard title="Mood Trajectory" subtitle="12-week moodScore — higher is better">
                <ResponsiveContainer width="100%" height={240}>
                  <LineChart data={SOUL_HEALTH_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-soul-border)" />
                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'var(--color-soul-text-muted)' }} tickLine={false} axisLine={false} />
                    <YAxis domain={[50, 100]} tick={{ fontSize: 11, fill: 'var(--color-soul-text-muted)' }} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line
                      type="monotone"
                      dataKey="moodScore"
                      name="Mood Score"
                      stroke="#C9A86A"
                      strokeWidth={2.5}
                      dot={false}
                      activeDot={{ r: 5, fill: '#C9A86A', stroke: 'var(--color-soul-card)', strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* 2. Stress Levels – AreaChart */}
              <ChartCard title="Stress Levels" subtitle="12-week stressLevel — lower is better">
                <ResponsiveContainer width="100%" height={240}>
                  <AreaChart data={SOUL_HEALTH_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#A8B8A5" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#A8B8A5" stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-soul-border)" />
                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'var(--color-soul-text-muted)' }} tickLine={false} axisLine={false} />
                    <YAxis domain={[30, 80]} tick={{ fontSize: 11, fill: 'var(--color-soul-text-muted)' }} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="stressLevel"
                      name="Stress Level"
                      stroke="#A8B8A5"
                      strokeWidth={2.5}
                      fill="url(#stressGrad)"
                      dot={false}
                      activeDot={{ r: 5, fill: '#A8B8A5', stroke: 'var(--color-soul-card)', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* 3. Meaningful Conversations – BarChart */}
              <ChartCard title="Meaningful Conversations" subtitle="Number of meaningful conversations per week">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart data={SOUL_HEALTH_DATA} margin={{ top: 5, right: 10, left: -20, bottom: 5 }} barSize={18}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-soul-border)" vertical={false} />
                    <XAxis dataKey="week" tick={{ fontSize: 11, fill: 'var(--color-soul-text-muted)' }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: 'var(--color-soul-text-muted)' }} tickLine={false} axisLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="meaningfulConversations"
                      name="Conversations"
                      fill="#4A3428"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </ChartCard>

              {/* 4. Relationship Health – RadarChart */}
              <ChartCard title="Relationship Health Map" subtitle="Six dimensions of your relational wellbeing">
                <ResponsiveContainer width="100%" height={260}>
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="var(--color-soul-border)" />
                    <PolarAngleAxis
                      dataKey="subject"
                      tick={{ fontSize: 11, fill: 'var(--color-soul-text-muted)', fontFamily: 'var(--font-body)' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Radar
                      name="Score"
                      dataKey="score"
                      stroke="#C9A86A"
                      fill="#C9A86A"
                      fillOpacity={0.22}
                      strokeWidth={2}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </ChartCard>

            </div>

            {/* ── Pie Chart full-width ─────────────────────────────────────── */}
            <motion.div variants={itemVariants} className="soul-card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
              <div style={{ marginBottom: '1.25rem' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '0.2rem' }}>
                  Wellbeing Breakdown
                </h3>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-soul-text-muted)' }}>
                  Distribution of your wellbeing score across four core categories
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                <ResponsiveContainer width={240} height={240}>
                  <PieChart>
                    <Pie
                      data={WELLBEING_CATEGORIES}
                      cx="50%"
                      cy="50%"
                      innerRadius={65}
                      outerRadius={105}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {WELLBEING_CATEGORIES.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: any) => [`${value}%`, 'Share']}
                      contentStyle={{
                        background: 'var(--color-soul-card)',
                        border: '1px solid var(--color-soul-border)',
                        borderRadius: '12px',
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                {/* Legend */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', flex: 1 }}>
                  {WELLBEING_CATEGORIES.map((cat) => (
                    <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '3px',
                          background: cat.fill,
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-soul-text)' }}>{cat.name}</span>
                          <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-soul-primary)' }}>{cat.value}%</span>
                        </div>
                        <div
                          style={{
                            marginTop: '0.3rem',
                            height: '4px',
                            borderRadius: '2px',
                            background: 'var(--color-soul-border)',
                            overflow: 'hidden',
                          }}
                        >
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${cat.value}%` }}
                            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
                            style={{ height: '100%', background: cat.fill, borderRadius: '2px' }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── Insights Section ─────────────────────────────────────────── */}
            <motion.div variants={itemVariants}>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.3rem',
                  fontWeight: 600,
                  color: 'var(--color-soul-primary)',
                  marginBottom: '1rem',
                }}
              >
                Advisor Insights
              </h3>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1rem',
                }}
              >
                {insights.map((insight) => (
                  <div
                    key={insight.title}
                    className="soul-card soul-card-hover"
                    style={{ padding: '1.375rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
                  >
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '12px',
                        background: insight.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <insight.icon size={20} color={insight.color} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: '0.925rem',
                          fontWeight: 700,
                          color: 'var(--color-soul-primary)',
                          marginBottom: '0.3rem',
                          lineHeight: 1.3,
                        }}
                      >
                        {insight.title}
                      </div>
                      <div style={{ fontSize: '0.82rem', color: 'var(--color-soul-text-muted)', lineHeight: 1.6 }}>
                        {insight.detail}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} size={11} fill="var(--color-soul-accent)" color="var(--color-soul-accent)" />
                      ))}
                      <span style={{ fontSize: '0.7rem', color: 'var(--color-soul-text-muted)', marginLeft: '0.25rem' }}>
                        Verified by Dr. Priya
                      </span>
                    </div>
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
