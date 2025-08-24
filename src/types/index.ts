/**
 * Global type definitions for TenderGenix
 */

import { User, Contractor, Tender, Proposal, Contract, UserRole, TenderCategory, TenderStatus, ProposalStatus, ContractStatus } from '@prisma/client'

export interface AuthUser extends User {
  contractor?: Contractor | null
}

export interface TenderWithDetails extends Tender {
  applications?: any[]
  analytics?: any[]
}

export interface ProposalWithDetails extends Proposal {
  tender: Tender
  contractor: Contractor
  documents?: any[]
}

export interface ContractWithDetails extends Contract {
  contractor: Contractor
  deliverableTracking?: any[]
  invoices?: any[]
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface TenderFilters {
  category?: TenderCategory
  state?: string
  minValue?: number
  maxValue?: number
  status?: TenderStatus
  dateFrom?: string
  dateTo?: string
  search?: string
}

export interface DashboardStats {
  totalTenders: number
  activeTenders: number
  myProposals: number
  wonContracts: number
  pendingDeliverables: number
  totalEarnings: number
}

export interface AIAnalysis {
  confidence: number
  recommendation: 'BID' | 'NO_BID'
  reasons: string[]
  competitorAnalysis?: {
    averageBidAmount: number
    winRate: number
    topCompetitors: string[]
  }
  suggestedBidAmount?: number
}

export interface NotificationPreferences {
  tenderAlerts: boolean
  proposalUpdates: boolean
  contractReminders: boolean
  emailNotifications: boolean
  smsNotifications: boolean
}

export interface FileUpload {
  file: File
  type: string
  category?: string
}

// Form types
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  phone: string
  companyName: string
  businessType: string
  gstNumber?: string
  panNumber?: string
}

export interface TenderForm {
  title: string
  description: string
  department: string
  category: TenderCategory
  serviceType: string
  estimatedValue: number
  earnestMoney?: number
  tenderFee?: number
  location: string
  state: string
  district?: string
  lastDateSubmission: string
  openingDate: string
  validityPeriod: number
  workCompletionTime: number
  eligibilityCriteria: any
  technicalSpecs: any
  evaluationCriteria: any
  contactPerson: string
  contactEmail: string
  contactPhone: string
}

export interface ProposalForm {
  tenderId: string
  title: string
  technicalProposal: any
  financialProposal: any
  totalAmount: number
  language: 'ENGLISH' | 'HINDI'
}

// Zustand store types
export interface AuthStore {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  updateUser: (user: Partial<AuthUser>) => void
}

export interface NotificationStore {
  notifications: any[]
  unreadCount: number
  fetchNotifications: () => Promise<void>
  markAsRead: (id: string) => Promise<void>
  markAllAsRead: () => Promise<void>
}

export interface UIStore {
  sidebarOpen: boolean
  theme: 'light' | 'dark'
  language: 'en' | 'hi'
  toggleSidebar: () => void
  setTheme: (theme: 'light' | 'dark') => void
  setLanguage: (language: 'en' | 'hi') => void
}
