import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, User, Shield, Coffee, Heart, Brain, Target, FileText, Leaf } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import type { OnboardingData } from '../../types';
import Logo from '../../components/shared/Logo';

const STORAGE_KEY = 'soulmeet_onboarding';

const STEPS = [
  { num: 1, label: 'Personal Details', icon: User },
  { num: 2, label: 'Identity', icon: Shield },
  { num: 3, label: 'Lifestyle', icon: Coffee },
  { num: 4, label: 'Values', icon: Heart },
  { num: 5, label: 'Assessment', icon: Brain },
  { num: 6, label: 'Goals', icon: Target },
  { num: 7, label: 'Review', icon: FileText },
];

const defaultData: OnboardingData = {
  step: 1,
  personalDetails: { firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', profession: '', city: '', country: '' },
  identity: { idType: '', idNumber: '', linkedinUrl: '', referralCode: '' },
  lifestyle: { workHoursPerWeek: '', socialFrequency: '', hobbies: [], livingArrangement: '' },
  values: { coreValues: [], relationshipGoals: [], dealBreakers: [] },
  psychometric: { answers: {} },
  goals: { primaryGoal: '', timeCommitment: '', expectations: '' },
};

// ─── Step components ──────────────────────────────────────────────────────────

function Step1({ data, update }: { data: OnboardingData['personalDetails']; update: (d: Partial<OnboardingData['personalDetails']>) => void }) {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-soul-primary)', marginBottom: '0.5rem', fontWeight: 500 }}>Tell us about yourself</h2>
      <p style={{ color: 'var(--color-soul-text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>This information is private and helps us curate your experience.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
        {[
          { label: 'First Name', key: 'firstName', placeholder: 'Aryan', type: 'text' },
          { label: 'Last Name', key: 'lastName', placeholder: 'Mehta', type: 'text' },
          { label: 'Email Address', key: 'email', placeholder: 'aryan@example.com', type: 'email' },
          { label: 'Phone Number', key: 'phone', placeholder: '+91 98765 43210', type: 'tel' },
          { label: 'Date of Birth', key: 'dateOfBirth', placeholder: '', type: 'date' },
          { label: 'Profession', key: 'profession', placeholder: 'Strategy Consultant', type: 'text' },
          { label: 'City', key: 'city', placeholder: 'New Delhi', type: 'text' },
          { label: 'Country', key: 'country', placeholder: 'India', type: 'text' },
        ].map((field) => (
          <div key={field.key}>
            <label className="soul-label">{field.label}</label>
            <input
              className="soul-input"
              type={field.type}
              placeholder={field.placeholder}
              value={data[field.key as keyof typeof data]}
              onChange={(e) => update({ [field.key]: e.target.value })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Step2({ data, update }: { data: OnboardingData['identity']; update: (d: Partial<OnboardingData['identity']>) => void }) {
  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-soul-primary)', marginBottom: '0.5rem', fontWeight: 500 }}>Identity Verification</h2>
      <p style={{ color: 'var(--color-soul-text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>We verify every member to maintain the integrity and safety of our community.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label className="soul-label">Government ID Type</label>
          <select className="soul-input" value={data.idType} onChange={(e) => update({ idType: e.target.value })} style={{ cursor: 'pointer' }}>
            <option value="">Select ID type</option>
            <option>Passport</option>
            <option>Aadhaar Card</option>
            <option>PAN Card</option>
            <option>Driver's License</option>
          </select>
        </div>
        <div>
          <label className="soul-label">ID Number</label>
          <input className="soul-input" placeholder="Enter your ID number" value={data.idNumber} onChange={(e) => update({ idNumber: e.target.value })} />
        </div>
        <div>
          <label className="soul-label">LinkedIn Profile URL</label>
          <input className="soul-input" placeholder="linkedin.com/in/yourprofile" value={data.linkedinUrl} onChange={(e) => update({ linkedinUrl: e.target.value })} />
        </div>
        <div>
          <label className="soul-label">Referral Code (Optional)</label>
          <input className="soul-input" placeholder="Enter referral code if you have one" value={data.referralCode} onChange={(e) => update({ referralCode: e.target.value })} />
        </div>

        <div style={{ background: 'var(--color-soul-surface)', borderRadius: '12px', padding: '1.25rem', display: 'flex', gap: '0.875rem', border: '1px solid var(--color-soul-border)' }}>
          <Shield size={18} color="var(--color-soul-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '0.25rem' }}>Your data is encrypted and secure</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-soul-text-muted)', lineHeight: 1.6 }}>We use bank-level encryption. Your ID details are verified once and never stored in plain text. Your privacy is our foundation.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Step3({ data, update }: { data: OnboardingData['lifestyle']; update: (d: Partial<OnboardingData['lifestyle']>) => void }) {
  const hobbiesList = ['Reading', 'Running', 'Cooking', 'Travel', 'Music', 'Art', 'Philosophy', 'Meditation', 'Yoga', 'Cinema', 'Writing', 'Architecture', 'Hiking', 'Wine', 'Photography'];

  const toggleHobby = (h: string) => {
    const updated = data.hobbies.includes(h) ? data.hobbies.filter((x) => x !== h) : [...data.hobbies, h];
    update({ hobbies: updated });
  };

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-soul-primary)', marginBottom: '0.5rem', fontWeight: 500 }}>Your Lifestyle</h2>
      <p style={{ color: 'var(--color-soul-text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>Help your advisor understand the texture of your daily life.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label className="soul-label">How many hours do you work per week?</label>
          <select className="soul-input" value={data.workHoursPerWeek} onChange={(e) => update({ workHoursPerWeek: e.target.value })} style={{ cursor: 'pointer' }}>
            <option value="">Select range</option>
            <option>Less than 40 hours</option>
            <option>40–50 hours</option>
            <option>50–60 hours</option>
            <option>60–70 hours</option>
            <option>More than 70 hours</option>
          </select>
        </div>

        <div>
          <label className="soul-label">How often do you socialise?</label>
          <select className="soul-input" value={data.socialFrequency} onChange={(e) => update({ socialFrequency: e.target.value })} style={{ cursor: 'pointer' }}>
            <option value="">Select frequency</option>
            <option>Rarely (once a month or less)</option>
            <option>Occasionally (a few times a month)</option>
            <option>Regularly (weekly)</option>
            <option>Often (multiple times a week)</option>
          </select>
        </div>

        <div>
          <label className="soul-label">Living Arrangement</label>
          <select className="soul-input" value={data.livingArrangement} onChange={(e) => update({ livingArrangement: e.target.value })} style={{ cursor: 'pointer' }}>
            <option value="">Select</option>
            <option>Living alone</option>
            <option>With family</option>
            <option>With partner</option>
            <option>With flatmates</option>
          </select>
        </div>

        <div>
          <label className="soul-label">Hobbies & Interests (select all that apply)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
            {hobbiesList.map((h) => (
              <button
                key={h}
                onClick={() => toggleHobby(h)}
                style={{
                  padding: '0.5rem 1rem', borderRadius: '100px', border: '1.5px solid',
                  borderColor: data.hobbies.includes(h) ? 'var(--color-soul-accent)' : 'var(--color-soul-border)',
                  background: data.hobbies.includes(h) ? 'rgba(201,168,106,0.12)' : 'transparent',
                  color: data.hobbies.includes(h) ? 'var(--color-soul-primary)' : 'var(--color-soul-text-muted)',
                  fontSize: '0.8rem', fontWeight: data.hobbies.includes(h) ? 600 : 400,
                  cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-body)',
                }}
              >
                {h}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step4({ data, update }: { data: OnboardingData['values']; update: (d: Partial<OnboardingData['values']>) => void }) {
  const valuesList = ['Authenticity', 'Intellectual depth', 'Emotional honesty', 'Kindness', 'Ambition', 'Stability', 'Adventure', 'Presence', 'Humour', 'Loyalty', 'Growth', 'Creativity', 'Simplicity', 'Independence', 'Spirituality'];
  const goalsList = ['Deepen existing friendships', 'Find a thinking partner', 'Build community', 'Overcome loneliness', 'Improve social confidence', 'Find meaningful mentorship', 'Be more vulnerable', 'Learn to trust others'];

  const toggle = (arr: string[], item: string): string[] =>
    arr.includes(item) ? arr.filter((x) => x !== item) : [...arr, item];

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-soul-primary)', marginBottom: '0.5rem', fontWeight: 500 }}>Your Values</h2>
      <p style={{ color: 'var(--color-soul-text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>Values are the foundation of every meaningful connection we facilitate.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <label className="soul-label">Core Values (choose up to 5)</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
            {valuesList.map((v) => (
              <button
                key={v}
                onClick={() => {
                  if (data.coreValues.includes(v) || data.coreValues.length < 5)
                    update({ coreValues: toggle(data.coreValues, v) });
                }}
                style={{
                  padding: '0.5rem 1rem', borderRadius: '100px', border: '1.5px solid',
                  borderColor: data.coreValues.includes(v) ? 'var(--color-soul-primary)' : 'var(--color-soul-border)',
                  background: data.coreValues.includes(v) ? 'var(--color-soul-primary)' : 'transparent',
                  color: data.coreValues.includes(v) ? '#fff' : 'var(--color-soul-text-muted)',
                  fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-body)',
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="soul-label">Relationship Goals (select all that apply)</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', marginTop: '0.5rem' }}>
            {goalsList.map((g) => (
              <label key={g} style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '0.875rem 1rem', borderRadius: '12px', border: '1.5px solid', borderColor: data.relationshipGoals.includes(g) ? 'var(--color-soul-accent)' : 'var(--color-soul-border)', background: data.relationshipGoals.includes(g) ? 'rgba(201,168,106,0.08)' : 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}>
                <div style={{ width: '18px', height: '18px', borderRadius: '4px', border: '1.5px solid', borderColor: data.relationshipGoals.includes(g) ? 'var(--color-soul-accent)' : 'var(--color-soul-border)', background: data.relationshipGoals.includes(g) ? 'var(--color-soul-accent)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, cursor: 'pointer' }}
                  onClick={() => update({ relationshipGoals: toggle(data.relationshipGoals, g) })}
                >
                  {data.relationshipGoals.includes(g) && <Check size={11} color="#fff" />}
                </div>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-soul-text)', cursor: 'pointer' }}
                  onClick={() => update({ relationshipGoals: toggle(data.relationshipGoals, g) })}
                >
                  {g}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Step5({ data, update }: { data: OnboardingData['psychometric']; update: (d: Partial<OnboardingData['psychometric']>) => void }) {
  const questions = [
    { id: 'q1', text: 'When you feel hurt in a relationship, your first instinct is to...', options: ['Withdraw and process alone', 'Seek reassurance immediately', 'Become frustrated or angry', 'Pretend nothing happened'] },
    { id: 'q2', text: 'In a new social setting, you typically feel...', options: ['Energised and curious', 'Comfortable but observant', 'Somewhat anxious but engaged', 'Overwhelmed and withdrawn'] },
    { id: 'q3', text: 'How comfortable are you with emotional vulnerability?', options: ['Very comfortable — I find it natural', 'Mostly comfortable with trusted people', 'Difficult, but I\'m working on it', 'Very difficult — I avoid it'] },
    { id: 'q4', text: 'When a close friend needs support, you tend to...', options: ['Offer practical help and solutions', 'Sit with them and listen deeply', 'Give them space and check in later', 'Struggle to know what to offer'] },
    { id: 'q5', text: 'What best describes your relationship with solitude?', options: ['I need it to recharge', 'I enjoy it in moderation', 'I tolerate it but prefer company', 'I find it uncomfortable'] },
  ];

  const setAnswer = (qId: string, ans: string) => update({ answers: { ...data.answers, [qId]: ans } });

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-soul-primary)', marginBottom: '0.5rem', fontWeight: 500 }}>Psychometric Assessment</h2>
      <p style={{ color: 'var(--color-soul-text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>There are no right or wrong answers. Your honesty is what allows us to serve you well.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {questions.map((q, i) => (
          <div key={q.id}>
            <p style={{ fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '1rem', fontSize: '0.95rem', lineHeight: 1.5 }}>
              {i + 1}. {q.text}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {q.options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setAnswer(q.id, opt)}
                  style={{
                    padding: '0.875rem 1.125rem', borderRadius: '12px', border: '1.5px solid',
                    borderColor: data.answers[q.id] === opt ? 'var(--color-soul-accent)' : 'var(--color-soul-border)',
                    background: data.answers[q.id] === opt ? 'rgba(201,168,106,0.1)' : 'transparent',
                    textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-body)',
                    fontSize: '0.875rem', color: 'var(--color-soul-text)', transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                  }}
                >
                  <div style={{
                    width: '16px', height: '16px', borderRadius: '50%', border: '1.5px solid',
                    borderColor: data.answers[q.id] === opt ? 'var(--color-soul-accent)' : 'var(--color-soul-border)',
                    background: data.answers[q.id] === opt ? 'var(--color-soul-accent)' : 'transparent',
                    flexShrink: 0,
                  }} />
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Step6({ data, update }: { data: OnboardingData['goals']; update: (d: Partial<OnboardingData['goals']>) => void }) {
  const primaryGoals = ['Find a genuine thinking partner', 'Build a circle of trusted friends', 'Overcome loneliness and social isolation', 'Improve emotional intelligence', 'Find meaningful mentorship', 'Be part of a values-aligned community'];
  const timeOptions = ['1–2 hours per week', '3–4 hours per week', '5–6 hours per week', '7+ hours per week'];

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-soul-primary)', marginBottom: '0.5rem', fontWeight: 500 }}>Your Goals</h2>
      <p style={{ color: 'var(--color-soul-text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>Clarity of intention leads to clarity of connection.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <label className="soul-label">Primary Goal</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
            {primaryGoals.map((g) => (
              <button
                key={g}
                onClick={() => update({ primaryGoal: g })}
                style={{
                  padding: '0.875rem 1.125rem', borderRadius: '12px', border: '1.5px solid',
                  borderColor: data.primaryGoal === g ? 'var(--color-soul-primary)' : 'var(--color-soul-border)',
                  background: data.primaryGoal === g ? 'var(--color-soul-primary)' : 'transparent',
                  textAlign: 'left', cursor: 'pointer', fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem', color: data.primaryGoal === g ? '#fff' : 'var(--color-soul-text)',
                  transition: 'all 0.2s',
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="soul-label">Time you can commit weekly</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.5rem' }}>
            {timeOptions.map((t) => (
              <button
                key={t}
                onClick={() => update({ timeCommitment: t })}
                style={{
                  padding: '0.5rem 1.125rem', borderRadius: '100px', border: '1.5px solid',
                  borderColor: data.timeCommitment === t ? 'var(--color-soul-accent)' : 'var(--color-soul-border)',
                  background: data.timeCommitment === t ? 'rgba(201,168,106,0.12)' : 'transparent',
                  color: data.timeCommitment === t ? 'var(--color-soul-primary)' : 'var(--color-soul-text-muted)',
                  fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-body)',
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="soul-label">What would a meaningful outcome look like for you?</label>
          <textarea
            className="soul-input"
            rows={4}
            placeholder="In your own words, describe what success looks like for you in this journey. What would you want to feel or experience 6 months from now?"
            value={data.expectations}
            onChange={(e) => update({ expectations: e.target.value })}
            style={{ resize: 'vertical' }}
          />
        </div>
      </div>
    </div>
  );
}

function Step7({ formData }: { formData: OnboardingData }) {
  const sections = [
    { title: 'Personal Details', items: [{ label: 'Name', value: `${formData.personalDetails.firstName} ${formData.personalDetails.lastName}` }, { label: 'Email', value: formData.personalDetails.email }, { label: 'Profession', value: formData.personalDetails.profession }, { label: 'City', value: `${formData.personalDetails.city}, ${formData.personalDetails.country}` }] },
    { title: 'Lifestyle', items: [{ label: 'Work Hours', value: formData.lifestyle.workHoursPerWeek }, { label: 'Social Frequency', value: formData.lifestyle.socialFrequency }, { label: 'Hobbies', value: formData.lifestyle.hobbies.join(', ') || 'None selected' }] },
    { title: 'Values', items: [{ label: 'Core Values', value: formData.values.coreValues.join(', ') || 'None selected' }, { label: 'Goals', value: formData.values.relationshipGoals.join(', ') || 'None selected' }] },
    { title: 'Primary Goal', items: [{ label: 'Goal', value: formData.goals.primaryGoal || 'Not specified' }, { label: 'Time Commitment', value: formData.goals.timeCommitment || 'Not specified' }] },
  ];

  return (
    <div>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-soul-primary)', marginBottom: '0.5rem', fontWeight: 500 }}>Review Your Application</h2>
      <p style={{ color: 'var(--color-soul-text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>Take a moment to review. You can go back to edit any section.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {sections.map((section) => (
          <div key={section.title} style={{ background: 'var(--color-soul-surface)', borderRadius: '16px', padding: '1.5rem', border: '1px solid var(--color-soul-border)' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', color: 'var(--color-soul-primary)', marginBottom: '1rem', fontWeight: 500 }}>{section.title}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {section.items.map((item) => (
                <div key={item.label} style={{ display: 'flex', gap: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-soul-text-muted)', minWidth: '130px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</span>
                  <span style={{ fontSize: '0.875rem', color: 'var(--color-soul-text)', flex: 1 }}>{item.value || '—'}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div style={{ background: 'rgba(201,168,106,0.08)', borderRadius: '16px', padding: '1.5rem', border: '1px solid rgba(201,168,106,0.25)' }}>
          <div style={{ display: 'flex', gap: '0.875rem', alignItems: 'flex-start' }}>
            <Check size={18} color="var(--color-soul-accent)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <p style={{ fontWeight: 600, color: 'var(--color-soul-primary)', marginBottom: '0.25rem', fontSize: '0.925rem' }}>By submitting, you agree to</p>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-soul-text-muted)', lineHeight: 1.6 }}>SoulMeet's Terms of Service, Privacy Policy, and Community Guidelines. You understand that membership is by invitation only and subject to our review process.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Onboarding Page ─────────────────────────────────────────────────────
export default function OnboardingPage() {
  const navigate = useNavigate();
  const { updateUser } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<OnboardingData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultData;
    } catch {
      return defaultData;
    }
  });

  // Autosave
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...formData, step }));
  }, [formData, step]);

  const updateSection = <K extends keyof OnboardingData>(section: K, updates: Partial<OnboardingData[K]>) => {
    setFormData((prev) => ({ ...prev, [section]: { ...(prev[section] as object), ...updates } as OnboardingData[K] }));
  };

  const handleNext = () => {
    if (step < 7) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    updateUser({ onboardingComplete: true });
    localStorage.removeItem(STORAGE_KEY);
    navigate('/dashboard');
  };

  const progress = ((step - 1) / 6) * 100;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-soul-bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Top bar */}
      <div style={{ background: 'var(--color-soul-card)', borderBottom: '1px solid var(--color-soul-border)', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Logo variant="compact" size="sm" showTagline={false} />
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--color-soul-text-muted)', fontWeight: 500 }}>Step {step} of 7</div>
      </div>

      {/* Progress bar */}
      <div style={{ height: '3px', background: 'var(--color-soul-border)' }}>
        <motion.div
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ height: '100%', background: 'var(--color-soul-accent)' }}
        />
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 2rem' }}>
        {/* Step indicators */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          {STEPS.map((s, i) => (
            <React.Fragment key={s.num}>
              <div
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  padding: '0.375rem 0.75rem', borderRadius: '100px',
                  background: step === s.num ? 'var(--color-soul-primary)' : step > s.num ? 'rgba(201,168,106,0.15)' : 'transparent',
                  border: `1px solid ${step === s.num ? 'var(--color-soul-primary)' : step > s.num ? 'var(--color-soul-accent)' : 'var(--color-soul-border)'}`,
                  cursor: step > s.num ? 'pointer' : 'default',
                }}
                onClick={() => { if (step > s.num) setStep(s.num); }}
              >
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: step > s.num ? 'var(--color-soul-accent)' : step === s.num ? 'rgba(255,255,255,0.2)' : 'var(--color-soul-border)',
                  fontSize: '0.65rem', fontWeight: 700,
                  color: step > s.num ? 'var(--color-soul-primary)' : step === s.num ? '#fff' : 'var(--color-soul-text-muted)',
                }}>
                  {step > s.num ? <Check size={11} /> : s.num}
                </div>
                <span style={{
                  fontSize: '0.75rem', fontWeight: step === s.num ? 600 : 400,
                  color: step === s.num ? '#fff' : step > s.num ? 'var(--color-soul-text)' : 'var(--color-soul-text-muted)',
                  display: 'none',
                }} className="sm:inline">
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ width: '16px', height: '1px', background: i < step - 1 ? 'var(--color-soul-accent)' : 'var(--color-soul-border)' }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form card */}
        <div className="soul-card" style={{ width: '100%', maxWidth: '700px', padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {step === 1 && <Step1 data={formData.personalDetails} update={(u) => updateSection('personalDetails', u)} />}
              {step === 2 && <Step2 data={formData.identity} update={(u) => updateSection('identity', u)} />}
              {step === 3 && <Step3 data={formData.lifestyle} update={(u) => updateSection('lifestyle', u)} />}
              {step === 4 && <Step4 data={formData.values} update={(u) => updateSection('values', u)} />}
              {step === 5 && <Step5 data={formData.psychometric} update={(u) => updateSection('psychometric', u)} />}
              {step === 6 && <Step6 data={formData.goals} update={(u) => updateSection('goals', u)} />}
              {step === 7 && <Step7 formData={formData} />}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-soul-border)' }}>
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="soul-btn-secondary"
              style={{ opacity: step === 1 ? 0.4 : 1, cursor: step === 1 ? 'not-allowed' : 'pointer' }}
            >
              <ArrowLeft size={16} /> Back
            </button>

            <div style={{ fontSize: '0.8rem', color: 'var(--color-soul-text-muted)' }}>
              Autosaved
            </div>

            {step < 7 ? (
              <button className="soul-btn-primary" onClick={handleNext}>
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button
                className="soul-btn-primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={{ minWidth: '160px', justifyContent: 'center' }}
              >
                {isSubmitting ? (
                  <>
                    <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin 0.8s linear infinite' }} />
                    Submitting...
                  </>
                ) : (
                  <>Submit Application <Check size={16} /></>
                )}
              </button>
            )}
          </div>
        </div>

        <p style={{ marginTop: '1.5rem', fontSize: '0.8rem', color: 'var(--color-soul-text-muted)', textAlign: 'center' }}>
          Your progress is automatically saved. You can return at any time.
        </p>
      </div>
    </div>
  );
}
