import type { User, Advisor, Session, Notification, SoulHealthMetrics, Event } from '../types';

// ─── AUTH ────────────────────────────────────────────────────────────────────

export const MOCK_CREDENTIALS = {
  email: 'demo@soulmeet.com',
  password: 'Demo@1234',
};

export const MOCK_USER: User = {
  id: 'usr_001',
  name: 'Aryan Mehta',
  email: 'demo@soulmeet.com',
  avatar: '',
  membershipTier: 'Sapphire',
  isVerified: true,
  joinedAt: '2024-09-15',
  onboardingComplete: true,
};

// ─── ADVISORS ────────────────────────────────────────────────────────────────

export const MOCK_ADVISORS: Advisor[] = [
  {
    id: 'adv_001',
    name: 'Dr. Priya Ramanathan',
    title: 'Relationship Psychologist',
    specialization: ['Social Anxiety', 'Attachment Styles', 'Emotional Intelligence'],
    avatar: '',
    bio: 'Dr. Priya brings 14 years of clinical experience helping high-achieving professionals navigate the emotional complexity of modern relationships. She specialises in attachment-based therapy and social health restoration.',
    rating: 4.9,
    sessionsCompleted: 347,
    availability: ['Mon', 'Wed', 'Fri'],
    nextAvailable: '2024-12-18',
  },
  {
    id: 'adv_002',
    name: 'Mr. Kabir Anand',
    title: 'Social Wellness Coach',
    specialization: ['Loneliness', 'Community Building', 'Mindful Communication'],
    avatar: '',
    bio: 'Kabir is a certified social wellness coach with a background in philosophy and organisational psychology. He guides members toward building authentic, lasting connections in a distracted world.',
    rating: 4.8,
    sessionsCompleted: 212,
    availability: ['Tue', 'Thu', 'Sat'],
    nextAvailable: '2024-12-19',
  },
  {
    id: 'adv_003',
    name: 'Ms. Leena Suri',
    title: 'Mindfulness & Connection Therapist',
    specialization: ['Grief & Loss', 'Self-Worth', 'Vulnerability Work'],
    avatar: '',
    bio: 'Leena combines somatic therapy, mindfulness practices, and narrative coaching to help members heal relational wounds and open to meaningful connection. Her sessions are gentle, safe, and transformative.',
    rating: 4.95,
    sessionsCompleted: 289,
    availability: ['Mon', 'Tue', 'Thu'],
    nextAvailable: '2024-12-17',
  },
];

// ─── SESSIONS ─────────────────────────────────────────────────────────────────

export const MOCK_SESSIONS: Session[] = [
  {
    id: 'ses_001',
    advisorId: 'adv_001',
    advisorName: 'Dr. Priya Ramanathan',
    date: '2024-12-18',
    time: '10:00',
    venue: 'The Oberoi, New Delhi — The Library Lounge',
    status: 'upcoming',
    type: 'deep-dive',
    notes: 'Continue work on avoidant attachment patterns; bring last week\'s journal.',
  },
  {
    id: 'ses_002',
    advisorId: 'adv_001',
    advisorName: 'Dr. Priya Ramanathan',
    date: '2024-12-05',
    time: '11:00',
    venue: 'SoulMeet Virtual — Secure Room',
    status: 'completed',
    type: 'intro',
    notes: 'First intake session. Identified primary loneliness triggers. Excellent opening.',
  },
  {
    id: 'ses_003',
    advisorId: 'adv_002',
    advisorName: 'Mr. Kabir Anand',
    date: '2024-11-28',
    time: '15:00',
    venue: 'The Leela Palace, Mumbai — Garden Terrace',
    status: 'completed',
    type: 'reflection',
    notes: 'Deep reflection on social patterns post-pandemic.',
  },
];

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'ntf_001',
    type: 'advisor',
    title: 'Session Reminder',
    message: 'Your session with Dr. Priya Ramanathan is tomorrow at 10:00 AM at The Oberoi, New Delhi.',
    timestamp: '2024-12-17T09:00:00Z',
    read: false,
    actionLabel: 'View Session',
    actionRoute: '/safe-space',
  },
  {
    id: 'ntf_002',
    type: 'membership',
    title: 'Sapphire Member — Monthly Report Ready',
    message: 'Your December SoulHealth report is ready. Your wellbeing score has improved by 12% this month.',
    timestamp: '2024-12-16T08:00:00Z',
    read: false,
    actionLabel: 'View Report',
    actionRoute: '/soul-health',
  },
  {
    id: 'ntf_003',
    type: 'event',
    title: 'New Event: Winter Solitude Retreat',
    message: 'A curated 3-day wellness retreat is now open for Sapphire and Diamond members. Only 8 spots remain.',
    timestamp: '2024-12-15T12:00:00Z',
    read: false,
    actionLabel: 'Learn More',
    actionRoute: '/advisor',
  },
  {
    id: 'ntf_004',
    type: 'advisor',
    title: 'Session Notes Shared',
    message: 'Dr. Priya Ramanathan has shared notes from your December 5th session.',
    timestamp: '2024-12-06T10:30:00Z',
    read: true,
  },
  {
    id: 'ntf_005',
    type: 'system',
    title: 'Profile Verification Complete',
    message: 'Your identity has been verified. Your Sapphire verification badge is now active.',
    timestamp: '2024-11-20T16:00:00Z',
    read: true,
  },
  {
    id: 'ntf_006',
    type: 'connection',
    title: 'Curated Introduction Ready',
    message: 'Your advisor has identified a potential meaningful connection for you. Review the introduction brief.',
    timestamp: '2024-12-10T14:00:00Z',
    read: false,
    actionLabel: 'Review',
    actionRoute: '/profile',
  },
  {
    id: 'ntf_007',
    type: 'event',
    title: 'Workshop: The Art of Deep Listening',
    message: 'You are registered for next Friday\'s virtual workshop. A calendar invite has been sent.',
    timestamp: '2024-12-08T11:00:00Z',
    read: true,
  },
  {
    id: 'ntf_008',
    type: 'membership',
    title: 'Renewal Reminder',
    message: 'Your Sapphire membership renews on January 15, 2025. No action needed — auto-renewal is on.',
    timestamp: '2024-12-01T09:00:00Z',
    read: true,
  },
];

// ─── SOUL HEALTH METRICS ───────────────────────────────────────────────────────

export const SOUL_HEALTH_DATA: SoulHealthMetrics[] = [
  { week: 'Week 1', moodScore: 58, stressLevel: 72, meaningfulConversations: 2, wellbeingScore: 54 },
  { week: 'Week 2', moodScore: 61, stressLevel: 68, meaningfulConversations: 3, wellbeingScore: 57 },
  { week: 'Week 3', moodScore: 59, stressLevel: 74, meaningfulConversations: 2, wellbeingScore: 55 },
  { week: 'Week 4', moodScore: 65, stressLevel: 65, meaningfulConversations: 4, wellbeingScore: 62 },
  { week: 'Week 5', moodScore: 68, stressLevel: 60, meaningfulConversations: 5, wellbeingScore: 66 },
  { week: 'Week 6', moodScore: 66, stressLevel: 63, meaningfulConversations: 4, wellbeingScore: 64 },
  { week: 'Week 7', moodScore: 72, stressLevel: 55, meaningfulConversations: 6, wellbeingScore: 70 },
  { week: 'Week 8', moodScore: 75, stressLevel: 50, meaningfulConversations: 7, wellbeingScore: 74 },
  { week: 'Week 9', moodScore: 73, stressLevel: 52, meaningfulConversations: 6, wellbeingScore: 72 },
  { week: 'Week 10', moodScore: 78, stressLevel: 46, meaningfulConversations: 8, wellbeingScore: 77 },
  { week: 'Week 11', moodScore: 81, stressLevel: 42, meaningfulConversations: 9, wellbeingScore: 80 },
  { week: 'Week 12', moodScore: 84, stressLevel: 38, meaningfulConversations: 11, wellbeingScore: 83 },
];

export const RELATIONSHIP_HEALTH_DATA = [
  { dimension: 'Vulnerability', score: 72 },
  { dimension: 'Empathy', score: 85 },
  { dimension: 'Boundaries', score: 68 },
  { dimension: 'Communication', score: 78 },
  { dimension: 'Trust', score: 80 },
  { dimension: 'Presence', score: 74 },
];

export const WELLBEING_CATEGORIES = [
  { name: 'Emotional Safety', value: 32, fill: '#C9A86A' },
  { name: 'Social Connection', value: 28, fill: '#A8B8A5' },
  { name: 'Self-Awareness', value: 22, fill: '#4A3428' },
  { name: 'Purpose', value: 18, fill: '#8B7355' },
];

// ─── EVENTS ───────────────────────────────────────────────────────────────────

export const MOCK_EVENTS: Event[] = [
  {
    id: 'evt_001',
    title: 'Winter Solitude Retreat',
    description: 'A 3-day curated experience at Aman Bagh, Rajasthan, designed to restore inner stillness and open pathways to genuine human connection.',
    date: '2025-01-17',
    time: '08:00',
    location: 'Aman Bagh, Alwar, Rajasthan',
    capacity: 12,
    enrolled: 9,
    type: 'retreat',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'evt_002',
    title: 'The Art of Deep Listening',
    description: 'A virtual workshop on the practice of truly hearing another person — cultivating presence, attention, and empathic resonance in conversation.',
    date: '2024-12-20',
    time: '18:00',
    location: 'Virtual — SoulMeet Secure Room',
    capacity: 25,
    enrolled: 18,
    type: 'workshop',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'evt_003',
    title: 'Members\' Evening Gathering — Mumbai',
    description: 'An intimate evening for Sapphire and Diamond members at the Taj Mahal Palace. Curated conversations, cultural exchange, and meaningful introductions.',
    date: '2025-01-08',
    time: '19:00',
    location: 'Taj Mahal Palace, Mumbai',
    capacity: 20,
    enrolled: 14,
    type: 'gathering',
    image: 'https://images.unsplash.com/photo-1545232972-9b87063d89dd?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'evt_004',
    title: 'Emotional Intelligence Masterclass',
    description: 'A deep-dive webinar with Dr. Priya Ramanathan on the neuroscience of connection and how emotional literacy transforms every relationship.',
    date: '2024-12-27',
    time: '17:00',
    location: 'Virtual — Live Stream',
    capacity: 100,
    enrolled: 67,
    type: 'webinar',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
  },
];

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────

export const TESTIMONIALS = [
  {
    id: 'tst_001',
    name: 'Riya Khanna',
    title: 'Strategy Lead, McKinsey & Company',
    location: 'New Delhi',
    tier: 'Diamond',
    quote: 'SoulMeet gave me something I didn\'t know I was missing. Not a date, not a networking contact — a friend who truly sees me. My advisor understood my patterns before I did.',
    rating: 5,
    avatar: '',
  },
  {
    id: 'tst_002',
    name: 'Nikhil Joshi',
    title: 'Founder, Verdant Capital',
    location: 'Mumbai',
    tier: 'Sapphire',
    quote: 'As a founder, loneliness is a well-kept secret. SoulMeet created a space where I could be honest about that. The curated introductions have been remarkably well-matched.',
    rating: 5,
    avatar: '',
  },
  {
    id: 'tst_003',
    name: 'Ananya Bose',
    title: 'Senior Surgeon, AIIMS',
    location: 'Bengaluru',
    tier: 'Pearl',
    quote: 'I was sceptical at first. But my relationship advisor helped me understand why I kept people at a distance. Six months in, I have three friendships I\'ll carry for life.',
    rating: 5,
    avatar: '',
  },
  {
    id: 'tst_004',
    name: 'Varun Malhotra',
    title: 'Partner, Trilegal',
    location: 'Pune',
    tier: 'Sapphire',
    quote: 'The SoulHealth dashboard made me realise how disconnected I\'d become. Seeing the data was confronting. The support system here helped me do something about it.',
    rating: 5,
    avatar: '',
  },
  {
    id: 'tst_005',
    name: 'Simran Dhaliwal',
    title: 'Design Director, Airbnb India',
    location: 'Hyderabad',
    tier: 'Diamond',
    quote: 'The onboarding was so thoughtful — it felt like being truly interviewed, not just signed up. That level of care carries through every single touchpoint of the experience.',
    rating: 5,
    avatar: '',
  },
  {
    id: 'tst_006',
    name: 'Aditya Rao',
    title: 'COO, Rivigo',
    location: 'Chennai',
    tier: 'Founding',
    quote: 'I\'ve been a Founding member since day one. SoulMeet has quietly become the most important membership in my life — more than any club, any app, any network.',
    rating: 5,
    avatar: '',
  },
];

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export const FAQ_ITEMS = [
  {
    question: 'What exactly is SoulMeet, and how is it different from a dating app?',
    answer: 'SoulMeet is a Social Health Companion — it exists entirely outside the romantic or dating paradigm. We curate meaningful human connections: deep friendships, mentoring relationships, and intellectual companionship. Our members are professionals seeking emotional depth, not romantic partners.',
  },
  {
    question: 'How are connections curated?',
    answer: 'Each connection is a collaboration between your Relationship Advisor and our assessment data. There are no algorithms, no swiping, no matching engines. Your advisor spends time understanding your values, your patterns, and your needs before personally identifying someone they believe you\'ll genuinely connect with.',
  },
  {
    question: 'What does the psychometric assessment involve?',
    answer: 'Our assessment is grounded in attachment theory, the Big Five personality framework, and social connection research. It takes approximately 25 minutes to complete and is reviewed by your assigned Relationship Advisor before any introductions are made.',
  },
  {
    question: 'Is my data private and secure?',
    answer: 'Absolutely. SoulMeet operates on a strict privacy framework. Your profile, session notes, and journal entries are encrypted and never shared without your explicit consent. Advisors sign comprehensive confidentiality agreements, and our infrastructure is audited annually.',
  },
  {
    question: 'How do I apply for membership?',
    answer: 'You may apply through our waitlisted application process. Each application is reviewed by a member of our team within 7 business days. If accepted, you will be invited to complete onboarding and matched with a Relationship Advisor within 2 weeks.',
  },
  {
    question: 'What are the membership tiers?',
    answer: 'SoulMeet offers four tiers: Pearl (entry), Sapphire (enhanced advisor access + events), Diamond (full concierge + curated retreats), and Founding (lifetime membership with all privileges). Each tier reflects a different level of access and personalised service.',
  },
  {
    question: 'How often will I meet with my Relationship Advisor?',
    answer: 'The frequency depends on your membership tier and personal pace. Pearl members meet monthly, Sapphire bi-monthly, Diamond weekly. All sessions — whether in-person at a partner venue or virtual — are arranged entirely by our concierge team.',
  },
  {
    question: 'What happens in a Safe Space Session?',
    answer: 'Safe Space Sessions are guided conversation experiences between two matched members, facilitated by a conversation guide crafted by your advisor. They typically occur at a curated partner venue — a quiet lounge, a private dining room, or a garden space — designed for depth and ease.',
  },
];
