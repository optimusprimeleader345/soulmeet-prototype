export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  membershipTier: 'Founding' | 'Pearl' | 'Sapphire' | 'Diamond';
  isVerified: boolean;
  joinedAt: string;
  onboardingComplete: boolean;
}

export interface Advisor {
  id: string;
  name: string;
  title: string;
  specialization: string[];
  avatar: string;
  bio: string;
  rating: number;
  sessionsCompleted: number;
  availability: string[];
  nextAvailable: string;
}

export interface Session {
  id: string;
  advisorId: string;
  advisorName: string;
  date: string;
  time: string;
  venue: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
  type: 'intro' | 'deep-dive' | 'reflection';
}

export interface Notification {
  id: string;
  type: 'advisor' | 'event' | 'membership' | 'system' | 'connection';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionLabel?: string;
  actionRoute?: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  mood: number;
  content: string;
  tags: string[];
}

export interface SoulHealthMetrics {
  week: string;
  moodScore: number;
  stressLevel: number;
  meaningfulConversations: number;
  wellbeingScore: number;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  enrolled: number;
  type: 'workshop' | 'gathering' | 'retreat' | 'webinar';
  image?: string;
}

export interface OnboardingData {
  step: number;
  personalDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    dateOfBirth: string;
    profession: string;
    city: string;
    country: string;
  };
  identity: {
    idType: string;
    idNumber: string;
    linkedinUrl: string;
    referralCode: string;
  };
  lifestyle: {
    workHoursPerWeek: string;
    socialFrequency: string;
    hobbies: string[];
    livingArrangement: string;
  };
  values: {
    coreValues: string[];
    relationshipGoals: string[];
    dealBreakers: string[];
  };
  psychometric: {
    answers: Record<string, string>;
  };
  goals: {
    primaryGoal: string;
    timeCommitment: string;
    expectations: string;
  };
}
