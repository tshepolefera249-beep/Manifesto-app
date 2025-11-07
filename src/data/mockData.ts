/**
 * Mock data for development and UI testing
 * TODO: Replace with actual Convex queries in production
 */

import { Leader, Department, Project, ParliamentItem, Post, Debate, Poll, Petition, MediaUpload } from "@types/index";

export const mockLeaders: Leader[] = [
  {
    _id: "leader-1",
    name: "Cyril Ramaphosa",
    position: "President",
    party: "ANC",
    bio: "President of South Africa since 2018",
    photo: "https://via.placeholder.com/200",
    departmentIds: ["dept-1"],
    promises: [
      {
        id: "promise-1",
        title: "Create 2 million jobs",
        description: "Create 2 million new jobs by 2025",
        status: "in_progress",
        createdAt: Date.now() - 365 * 24 * 60 * 60 * 1000,
      },
    ],
    approvalRating: 65,
    projectIds: ["project-1", "project-2"],
    scandals: [],
    achievements: [
      {
        id: "achieve-1",
        title: "COVID-19 Response",
        description: "Led effective COVID-19 response",
        verified: true,
        achievedAt: Date.now() - 180 * 24 * 60 * 60 * 1000,
      },
    ],
    createdAt: Date.now() - 365 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now(),
  },
  {
    _id: "leader-2",
    name: "John Steenhuisen",
    position: "Leader of the Opposition",
    party: "DA",
    bio: "Leader of the Democratic Alliance",
    photo: "https://via.placeholder.com/200",
    departmentIds: [],
    promises: [],
    approvalRating: 58,
    projectIds: [],
    scandals: [],
    achievements: [],
    createdAt: Date.now() - 200 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now(),
  },
];

export const mockDepartments: Department[] = [
  {
    _id: "dept-1",
    name: "Department of Health",
    type: "national",
    description: "Responsible for public health services",
    budget: 50000000000,
    expenditure: 32000000000,
    leaderIds: ["leader-1"],
    projectIds: ["project-1"],
    keyInitiatives: [
      {
        id: "init-1",
        title: "NHI Implementation",
        description: "National Health Insurance rollout",
        status: "in_progress",
      },
    ],
    issues: [
      {
        id: "issue-1",
        title: "Hospital Staff Shortages",
        description: "Critical shortage of healthcare workers",
        severity: "high",
        reportedAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
      },
    ],
    performanceRating: 62,
    createdAt: Date.now() - 400 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now(),
  },
  {
    _id: "dept-2",
    name: "Department of Education",
    type: "national",
    description: "Responsible for education and training",
    budget: 45000000000,
    expenditure: 28000000000,
    leaderIds: [],
    projectIds: ["project-2"],
    keyInitiatives: [],
    issues: [],
    performanceRating: 55,
    createdAt: Date.now() - 400 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now(),
  },
];

export const mockProjects: Project[] = [
  {
    _id: "project-1",
    title: "Hospital Expansion Program",
    description: "Expansion of public hospitals across provinces",
    category: "Healthcare",
    stage: "in_progress",
    budgetAllocated: 5000000000,
    budgetSpent: 3200000000,
    responsibleDepartmentId: "dept-1",
    responsibleLeaderIds: ["leader-1"],
    responsibleCompany: "ABC Construction",
    location: {
      latitude: -26.2041,
      longitude: 28.0473,
      address: "Gauteng, South Africa",
    },
    startDate: Date.now() - 180 * 24 * 60 * 60 * 1000,
    endDate: Date.now() + 180 * 24 * 60 * 60 * 1000,
    jobsCreated: 1500,
    milestones: [
      {
        id: "milestone-1",
        title: "Site Preparation",
        completed: true,
        completedAt: Date.now() - 150 * 24 * 60 * 60 * 1000,
      },
      {
        id: "milestone-2",
        title: "Foundation",
        completed: true,
        completedAt: Date.now() - 90 * 24 * 60 * 60 * 1000,
      },
      {
        id: "milestone-3",
        title: "Construction",
        completed: false,
      },
    ],
    citizenMediaCount: 23,
    createdAt: Date.now() - 180 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now(),
  },
  {
    _id: "project-2",
    title: "School Infrastructure Upgrade",
    description: "Upgrading school facilities in rural areas",
    category: "Education",
    stage: "tender",
    budgetAllocated: 2000000000,
    budgetSpent: 0,
    responsibleDepartmentId: "dept-2",
    responsibleLeaderIds: [],
    location: {
      latitude: -33.9249,
      longitude: 18.4241,
      address: "Western Cape, South Africa",
    },
    startDate: Date.now() + 30 * 24 * 60 * 60 * 1000,
    deadline: Date.now() + 15 * 24 * 60 * 60 * 1000,
    jobsCreated: 0,
    milestones: [],
    citizenMediaCount: 0,
    createdAt: Date.now() - 60 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now(),
  },
];

export const mockParliamentItems: ParliamentItem[] = [
  {
    _id: "parliament-1",
    type: "bill",
    title: "National Health Insurance Bill",
    description: "Bill to establish National Health Insurance",
    status: "debating",
    billNumber: "B11-2019",
    sessionDate: Date.now() - 7 * 24 * 60 * 60 * 1000,
    attendance: {
      present: 280,
      absent: 70,
      total: 350,
    },
    votingRecords: [],
    linkedDebateIds: [],
    linkedPollIds: [],
    createdAt: Date.now() - 90 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 7 * 24 * 60 * 60 * 1000,
  },
];

export const mockPosts: Post[] = [
  {
    _id: "post-1",
    userId: "user-1",
    type: "debate",
    title: "Should NHI be implemented now?",
    content: "Discussion about the National Health Insurance implementation timeline",
    tags: ["#Healthcare", "#NHI", "#Accountability"],
    linkedProjectId: "project-1",
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    likes: 150,
    comments: 45,
    shares: 23,
    isVerified: true,
    verificationStatus: "verified",
    user: {
      id: "user-1",
      name: "John Citizen",
      profilePhoto: "https://via.placeholder.com/100",
      badges: ["Debater"],
    },
  },
  {
    _id: "post-2",
    userId: "user-2",
    type: "poll",
    title: "How satisfied are you with healthcare services?",
    content: "Poll about healthcare satisfaction",
    tags: ["#Healthcare", "#Poll"],
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    likes: 89,
    comments: 12,
    shares: 8,
    isVerified: false,
    verificationStatus: "pending",
    user: {
      id: "user-2",
      name: "Sarah Voter",
      badges: [],
    },
  },
];

export const mockDebates: Debate[] = [
  {
    _id: "debate-1",
    postId: "post-1",
    userId: "user-1",
    title: "Should NHI be implemented now?",
    description: "Discussion about the National Health Insurance implementation timeline",
    topic: "Healthcare",
    agreeCount: 120,
    disagreeCount: 45,
    neutralCount: 30,
    commentCount: 45,
    linkedProjectId: "project-1",
    isArchived: false,
    createdAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 2 * 24 * 60 * 60 * 1000,
    post: mockPosts[0],
    user: mockPosts[0].user,
  },
];

export const mockPolls: Poll[] = [
  {
    _id: "poll-1",
    postId: "post-2",
    userId: "user-2",
    title: "How satisfied are you with healthcare services?",
    description: "Poll about healthcare satisfaction",
    options: [
      { id: "option-1", text: "Very Satisfied", voteCount: 45 },
      { id: "option-2", text: "Satisfied", voteCount: 120 },
      { id: "option-3", text: "Neutral", voteCount: 60 },
      { id: "option-4", text: "Dissatisfied", voteCount: 85 },
      { id: "option-5", text: "Very Dissatisfied", voteCount: 40 },
    ],
    totalVotes: 350,
    isMultipleChoice: false,
    createdAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    isActive: true,
    post: mockPosts[1],
    user: mockPosts[1].user,
  },
];

export const mockPetitions: Petition[] = [
  {
    _id: "petition-1",
    postId: "post-3",
    userId: "user-3",
    title: "Increase Healthcare Funding",
    description: "Petition to increase funding for public healthcare",
    goal: 10000,
    currentSignatures: 7234,
    targetDeadline: Date.now() + 30 * 24 * 60 * 60 * 1000,
    status: "active",
    linkedProjectId: "project-1",
    createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
    updatedAt: Date.now() - 1 * 24 * 60 * 60 * 1000,
    post: {
      _id: "post-3",
      userId: "user-3",
      type: "petition",
      title: "Increase Healthcare Funding",
      content: "Petition to increase funding for public healthcare",
      tags: ["#Healthcare", "#Petition"],
      createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
      updatedAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
      likes: 0,
      comments: 0,
      shares: 0,
      isVerified: false,
      verificationStatus: "pending",
    },
    user: {
      id: "user-3",
      name: "Community Organizer",
      badges: ["Petition Leader"],
    },
  },
];

export const mockMediaUploads: MediaUpload[] = [
  {
    _id: "media-1",
    uploaderId: "user-4",
    projectId: "project-1",
    url: "https://via.placeholder.com/800x600",
    thumbnailUrl: "https://via.placeholder.com/300x200",
    type: "photo",
    caption: "Hospital construction progress - Foundation complete!",
    location: {
      latitude: -26.2041,
      longitude: 28.0473,
      address: "Gauteng, South Africa",
    },
    timestamp: Date.now() - 90 * 24 * 60 * 60 * 1000,
    uploadedAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
    verificationStatus: "verified",
    aiAnalysis: {
      authenticity: 92,
      matchesProjectLocation: true,
      metadataValid: true,
    },
    viewCount: 450,
    likeCount: 89,
    uploader: {
      id: "user-4",
      name: "Citizen Reporter",
      profilePhoto: "https://via.placeholder.com/100",
    },
    project: {
      id: "project-1",
      title: "Hospital Expansion Program",
    },
  },
];

export const mockFilters = [
  { id: "none", name: "None", type: "effect" as const, preview: "#FFFFFF" },
  { id: "sepia", name: "Sepia", type: "effect" as const, preview: "#D2B48C" },
  { id: "grayscale", name: "Grayscale", type: "effect" as const, preview: "#808080" },
  { id: "vintage", name: "Vintage", type: "effect" as const, preview: "#F4A460" },
  { id: "warm", name: "Warm", type: "color" as const, preview: "#FFB347" },
  { id: "cool", name: "Cool", type: "color" as const, preview: "#87CEEB" },
];

