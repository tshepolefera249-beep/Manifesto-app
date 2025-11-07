/**
 * Type definitions for Manifesto app
 */

export type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  profilePhoto?: string;
  bio?: string;
  civicInterests: string[];
  badges: string[];
  trustScore: number;
  createdAt: number;
  lastActiveAt: number;
  isActive: boolean;
};

export type Post = {
  _id: string;
  userId: string;
  type: "debate" | "poll" | "petition" | "media" | "update";
  title: string;
  content: string;
  mediaUrls?: string[];
  tags: string[];
  linkedProjectId?: string;
  linkedLeaderId?: string;
  linkedDepartmentId?: string;
  createdAt: number;
  updatedAt: number;
  likes: number;
  comments: number;
  shares: number;
  isVerified: boolean;
  verificationStatus: "pending" | "verified" | "rejected";
  user?: {
    id: string;
    name: string;
    profilePhoto?: string;
    badges: string[];
  };
};

export type Debate = {
  _id: string;
  postId: string;
  userId: string;
  title: string;
  description: string;
  topic: string;
  agreeCount: number;
  disagreeCount: number;
  neutralCount: number;
  commentCount: number;
  linkedProjectId?: string;
  linkedPolicyId?: string;
  isArchived: boolean;
  createdAt: number;
  updatedAt: number;
  post?: Post;
  user?: {
    id: string;
    name: string;
    profilePhoto?: string;
  };
};

export type Poll = {
  _id: string;
  postId: string;
  userId: string;
  title: string;
  description: string;
  options: Array<{
    id: string;
    text: string;
    voteCount: number;
  }>;
  totalVotes: number;
  isMultipleChoice: boolean;
  endDate?: number;
  linkedProjectId?: string;
  linkedLeaderId?: string;
  createdAt: number;
  isActive: boolean;
  post?: Post;
  user?: {
    id: string;
    name: string;
    profilePhoto?: string;
  };
};

export type Petition = {
  _id: string;
  postId: string;
  userId: string;
  title: string;
  description: string;
  goal: number;
  currentSignatures: number;
  targetDeadline: number;
  status: "active" | "completed" | "expired" | "successful";
  linkedProjectId?: string;
  linkedLeaderId?: string;
  createdAt: number;
  updatedAt: number;
  post?: Post;
  user?: {
    id: string;
    name: string;
    profilePhoto?: string;
  };
};

export type Project = {
  _id: string;
  title: string;
  description: string;
  category: string;
  stage: "planning" | "tender" | "in_progress" | "completed" | "on_hold" | "cancelled";
  budgetAllocated: number;
  budgetSpent: number;
  responsibleDepartmentId: string;
  responsibleLeaderIds: string[];
  responsibleCompany?: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  startDate: number;
  endDate?: number;
  deadline?: number;
  jobsCreated: number;
  milestones: Array<{
    id: string;
    title: string;
    completed: boolean;
    completedAt?: number;
  }>;
  citizenMediaCount: number;
  createdAt: number;
  updatedAt: number;
  department?: Department;
  leaders?: Leader[];
};

export type Leader = {
  _id: string;
  name: string;
  position: string;
  party: string;
  bio: string;
  photo?: string;
  departmentIds: string[];
  promises: Array<{
    id: string;
    title: string;
    description: string;
    status: "pending" | "in_progress" | "fulfilled" | "broken";
    createdAt: number;
    fulfilledAt?: number;
  }>;
  approvalRating: number;
  projectIds: string[];
  scandals: Array<{
    id: string;
    title: string;
    description: string;
    verified: boolean;
    reportedAt: number;
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    verified: boolean;
    achievedAt: number;
  }>;
  createdAt: number;
  updatedAt: number;
  departments?: Department[];
  projects?: Project[];
};

export type Department = {
  _id: string;
  name: string;
  type: "national" | "provincial" | "municipal";
  description: string;
  budget: number;
  expenditure: number;
  leaderIds: string[];
  projectIds: string[];
  keyInitiatives: Array<{
    id: string;
    title: string;
    description: string;
    status: string;
  }>;
  issues: Array<{
    id: string;
    title: string;
    description: string;
    severity: "low" | "medium" | "high" | "critical";
    reportedAt: number;
  }>;
  performanceRating: number;
  createdAt: number;
  updatedAt: number;
  leaders?: Leader[];
  projects?: Project[];
};

export type ParliamentItem = {
  _id: string;
  type: "bill" | "session" | "vote" | "debate";
  title: string;
  description: string;
  status: "draft" | "tabled" | "debating" | "voting" | "passed" | "rejected";
  billNumber?: string;
  sessionDate: number;
  attendance?: {
    present: number;
    absent: number;
    total: number;
  };
  votingRecords?: Array<{
    leaderId: string;
    vote: "for" | "against" | "abstain" | "absent";
  }>;
  linkedDebateIds: string[];
  linkedPollIds: string[];
  createdAt: number;
  updatedAt: number;
};

export type MediaUpload = {
  _id: string;
  uploaderId: string;
  projectId?: string;
  postId?: string;
  url: string;
  thumbnailUrl?: string;
  type: "photo" | "video";
  caption?: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  timestamp: number;
  uploadedAt: number;
  verificationStatus: "pending" | "verified" | "rejected";
  aiAnalysis?: {
    authenticity: number;
    matchesProjectLocation: boolean;
    metadataValid: boolean;
    notes?: string;
  };
  viewCount: number;
  likeCount: number;
  uploader?: {
    id: string;
    name: string;
    profilePhoto?: string;
  };
  project?: {
    id: string;
    title: string;
  };
};

export type NavigationParamList = {
  Main: undefined;
  Home: undefined;
  Debates: undefined;
  Polls: undefined;
  Petitions: undefined;
  Profile: undefined;
  GovernmentHub: undefined;
  Leaders: undefined;
  LeaderDetail: { leaderId: string };
  Departments: undefined;
  DepartmentDetail: { departmentId: string };
  Projects: undefined;
  ProjectDetail: { projectId: string };
  Parliament: undefined;
  ParliamentDetail: { itemId: string };
  CreatePost: undefined;
  Camera: undefined;
  DebateDetail: { debateId: string };
  PollDetail: { pollId: string };
  PetitionDetail: { petitionId: string };
  SignIn: undefined;
  SignUp: undefined;
  OTPScreen: { phone: string };
  ProfileSetup: undefined;
};

export type Filter = {
  id: string;
  name: string;
  type: "color" | "effect";
  preview: string;
};

