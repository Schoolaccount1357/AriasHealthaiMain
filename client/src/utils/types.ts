// Form step and progress tracking
export interface FormStep {
  id: number;
  title: string;
  isCompleted: boolean;
  isActive: boolean;
}

// Program workflow step
export interface ProgramStep {
  id: number;
  title: string;
  description: string;
}

// FAQ item
export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
}

// Mock peer matching type for platform preview
export interface PeerMatch {
  id: number;
  name: string;
  initial: string;
  branch: string;
  matchPercentage: number;
  matchFactors: string[];
}

// Trust & security feature
export interface SecurityFeature {
  id: number;
  label: string;
}

// Waitlist form data (simpler than the full enrollment form)
export interface WaitlistFormData {
  email: string;
  firstName?: string;
  lastName?: string;
  serviceStatus: string; // Active Duty / Veteran / Family Member
  reasonForInterest?: string;
}

// Legacy form data types - keeping for reference
export interface BasicInfoFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dob: string;
  gender: string;
}

export interface MilitaryBackgroundFormData {
  branch: string;
  rank: string;
  serviceYears: string;
  deploymentCount: number;
}

export interface HealthHistoryFormData {
  sudsHistory: string;
  treatmentHistory?: string;
  currentStatus: string;
  mentalHealthConditions?: string;
}

export interface PreferencesFormData {
  communicationPreference: string;
  peerPreferences?: string;
  goals: string;
  additionalInfo?: string;
}

export type EnrollmentFormData = WaitlistFormData;
