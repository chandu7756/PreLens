export type UserRole = 'admin' | 'learner';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  name: string;
  role: UserRole;
  designation: string;
  division: string;
  employeeCode: string;
  cadre: string;
  station: string;
  avatarInitials: string;
  lastLogin?: string;
}

export interface AuthCredentials {
  identifier: string; // username or email or employeeCode
  password: string;
  rememberMe?: boolean;
}

export type ActiveTab =
  | 'overview'
  | 'upload-engine'
  | 'admin-review'
  | 'learner-assessments'
  | 'quiz-active'
  | 'gap-analysis'
  | 'igot-courses'
  | 'analytics'
  | 'technical-architecture'
  | 'notifications';

export interface Competency {
  id: string;
  name: string;
  category: 'Statistical Theory' | 'Field Operations' | 'Macroeconomics' | 'Digital & CAPI';
  description: string;
  targetBenchmark: number; // e.g. 70% threshold
  targetDepartment: string;
  fracRole: string;
}

export interface TrainingDocument {
  id: string;
  title: string;
  division: string;
  filename: string;
  uploadedAt: string;
  pagesCount: number;
  textContent: string;
  status: 'parsed' | 'generating' | 'ready';
  questionsCount: number;
}

export interface MCQQuestion {
  id: string;
  documentId?: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  competency: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  fracRole: string;
  status: 'pending_review' | 'approved' | 'rejected';
  reviewedBy?: string;
}

export interface Assessment {
  id: string;
  title: string;
  division: string;
  competenciesCovered: string[];
  questionIds: string[];
  durationMinutes: number;
  passPercentage: number;
  targetCadre: string;
  active: boolean;
}

export interface QuizAttempt {
  id: string;
  assessmentId: string;
  assessmentTitle: string;
  officialName: string;
  officialRole: string;
  division: string;
  attemptedAt: string;
  answers: Record<string, number>; // questionId -> selected option
  scorePercentage: number;
  totalQuestions: number;
  correctAnswersCount: number;
  competencyBreakdown: Record<
    string,
    {
      total: number;
      correct: number;
      percentage: number;
      isGap: boolean;
    }
  >;
}

export interface IGOTCourse {
  id: string;
  code: string;
  title: string;
  mappedCompetency: string;
  provider: string; // e.g., National Statistical Systems Training Academy (NSSTA) / iGOT Karmayogi
  durationHours: string;
  modulesCount: number;
  rating: number;
  enrolledOfficials: number;
  description: string;
  isEnrolled?: boolean;
  progressPercentage?: number;
  badge: string;
}

export interface DepartmentMetric {
  id: string;
  departmentName: string;
  shortCode: string;
  totalOfficials: number;
  assessedCount: number;
  averageScore: number;
  criticalGapsCount: number;
  primaryGapCompetency: string;
  readinessRate: number;
}

export interface NotificationItem {
  id: string;
  type: 'assessment' | 'gap_alert' | 'course_recommendation' | 'approval';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionLabel?: string;
  actionTab?: ActiveTab;
}
