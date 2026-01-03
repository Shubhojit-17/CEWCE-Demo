// =============================================================================
// Demo Data Store - Simulated/Mock Data for Demo
// =============================================================================

import { create } from 'zustand';

// Types matching the real application
export interface User {
  id: string;
  email: string;
  publicKey: string | null;
  firstName: string | null;
  lastName: string | null;
  roles: string[];
  createdAt: string;
}

export interface WorkflowTemplate {
  id: string;
  name: string;
  description: string | null;
  version: number;
  states: WorkflowState[];
  transitions: WorkflowTransition[];
  slaDays: number;
  escalationDays: number;
  status: 'DRAFT' | 'PUBLISHED' | 'DEPRECATED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowState {
  id: number;
  name: string;
  description?: string;
  isInitial?: boolean;
  isTerminal?: boolean;
}

export interface WorkflowTransition {
  from: number;
  to: number;
  action: string;
  label?: string;
}

export interface WorkflowInstance {
  id: string;
  templateId: string;
  templateName: string;
  title: string;
  description: string;
  currentState: number;
  status: 'DRAFT' | 'PENDING' | 'COMPLETED' | 'CANCELLED' | 'ESCALATED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
  initiatorId: string;
  initiatorName: string;
  assigneeId: string | null;
  assigneeName: string | null;
  deployHash: string | null;
  createdAt: string;
  updatedAt: string;
  dueDate: string | null;
}

export interface AuditEntry {
  id: string;
  instanceId: string;
  instanceTitle: string;
  templateName: string;
  fromState: number;
  toState: number;
  action: string;
  actor: {
    id: string;
    publicKey: string | null;
    displayName: string | null;
  };
  comment: string | null;
  deployHash: string | null;
  createdAt: string;
}

// Demo Role type
export type DemoRole = 'ADMIN' | 'MANAGER' | 'APPROVER' | 'USER';

// =============================================================================
// Mock Data
// =============================================================================

export const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    email: 'admin@cewce.io',
    publicKey: '01abc...def1',
    firstName: 'Alex',
    lastName: 'Administrator',
    roles: ['ADMIN', 'MANAGER', 'APPROVER', 'USER'],
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'user-2',
    email: 'manager@cewce.io',
    publicKey: '01bcd...ef23',
    firstName: 'Morgan',
    lastName: 'Manager',
    roles: ['MANAGER', 'APPROVER', 'USER'],
    createdAt: '2024-02-20T14:30:00Z',
  },
  {
    id: 'user-3',
    email: 'approver@cewce.io',
    publicKey: '01cde...f345',
    firstName: 'Ashley',
    lastName: 'Approver',
    roles: ['APPROVER', 'USER'],
    createdAt: '2024-03-10T09:15:00Z',
  },
  {
    id: 'user-4',
    email: 'user@cewce.io',
    publicKey: '01def...4567',
    firstName: 'Jordan',
    lastName: 'User',
    roles: ['USER'],
    createdAt: '2024-04-05T16:45:00Z',
  },
  {
    id: 'user-5',
    email: 'viewer@cewce.io',
    publicKey: null,
    firstName: 'Casey',
    lastName: 'Viewer',
    roles: ['VIEWER'],
    createdAt: '2024-05-12T11:20:00Z',
  },
];

export const MOCK_TEMPLATES: WorkflowTemplate[] = [
  {
    id: 'template-1',
    name: 'Document Approval',
    description: 'Standard document approval workflow with multi-level review',
    version: 1,
    states: [
      { id: 0, name: 'Draft', isInitial: true, isTerminal: false },
      { id: 1, name: 'Pending Review', isInitial: false, isTerminal: false },
      { id: 10, name: 'Approved', isInitial: false, isTerminal: true },
      { id: 11, name: 'Rejected', isInitial: false, isTerminal: true },
      { id: 20, name: 'Escalated', isInitial: false, isTerminal: false },
      { id: 30, name: 'Cancelled', isInitial: false, isTerminal: true },
    ],
    transitions: [
      { from: 0, to: 1, action: 'submit', label: 'Submit for Review' },
      { from: 1, to: 10, action: 'approve', label: 'Approve' },
      { from: 1, to: 11, action: 'reject', label: 'Reject' },
      { from: 1, to: 20, action: 'escalate', label: 'Escalate' },
      { from: 20, to: 10, action: 'approve', label: 'Approve' },
      { from: 20, to: 11, action: 'reject', label: 'Reject' },
      { from: 0, to: 30, action: 'cancel', label: 'Cancel' },
    ],
    slaDays: 7,
    escalationDays: 3,
    status: 'PUBLISHED',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-10T08:00:00Z',
  },
  {
    id: 'template-2',
    name: 'Purchase Request',
    description: 'Procurement workflow for purchase requests with budget approval',
    version: 2,
    states: [
      { id: 0, name: 'Draft', isInitial: true, isTerminal: false },
      { id: 1, name: 'Manager Review', isInitial: false, isTerminal: false },
      { id: 2, name: 'Finance Review', isInitial: false, isTerminal: false },
      { id: 10, name: 'Approved', isInitial: false, isTerminal: true },
      { id: 11, name: 'Rejected', isInitial: false, isTerminal: true },
    ],
    transitions: [
      { from: 0, to: 1, action: 'submit', label: 'Submit' },
      { from: 1, to: 2, action: 'approve', label: 'Forward to Finance' },
      { from: 1, to: 11, action: 'reject', label: 'Reject' },
      { from: 2, to: 10, action: 'approve', label: 'Approve' },
      { from: 2, to: 11, action: 'reject', label: 'Reject' },
    ],
    slaDays: 5,
    escalationDays: 2,
    status: 'PUBLISHED',
    createdAt: '2024-02-15T10:00:00Z',
    updatedAt: '2024-02-20T14:00:00Z',
  },
  {
    id: 'template-3',
    name: 'Contract Signing',
    description: 'Legal contract review and digital signature workflow',
    version: 1,
    states: [
      { id: 0, name: 'Draft', isInitial: true, isTerminal: false },
      { id: 1, name: 'Legal Review', isInitial: false, isTerminal: false },
      { id: 2, name: 'Pending Signature', isInitial: false, isTerminal: false },
      { id: 10, name: 'Executed', isInitial: false, isTerminal: true },
      { id: 11, name: 'Rejected', isInitial: false, isTerminal: true },
    ],
    transitions: [
      { from: 0, to: 1, action: 'submit', label: 'Submit for Legal Review' },
      { from: 1, to: 2, action: 'approve', label: 'Send for Signature' },
      { from: 1, to: 11, action: 'reject', label: 'Reject' },
      { from: 2, to: 10, action: 'sign', label: 'Sign & Execute' },
    ],
    slaDays: 14,
    escalationDays: 5,
    status: 'DRAFT',
    createdAt: '2024-03-01T09:00:00Z',
    updatedAt: '2024-03-01T09:00:00Z',
  },
];

export const MOCK_WORKFLOWS: WorkflowInstance[] = [
  {
    id: 'wf-001',
    templateId: 'template-1',
    templateName: 'Document Approval',
    title: 'Q4 Financial Report Approval',
    description: 'Annual financial report requiring executive approval before public release',
    currentState: 1,
    status: 'PENDING',
    priority: 'HIGH',
    initiatorId: 'user-4',
    initiatorName: 'Jordan User',
    assigneeId: 'user-3',
    assigneeName: 'Ashley Approver',
    deployHash: '0x8f3d...ab12',
    createdAt: '2024-12-20T09:00:00Z',
    updatedAt: '2024-12-21T14:30:00Z',
    dueDate: '2024-12-28T17:00:00Z',
  },
  {
    id: 'wf-002',
    templateId: 'template-2',
    templateName: 'Purchase Request',
    title: 'Server Infrastructure Upgrade',
    description: 'Request to purchase new server hardware for data center expansion',
    currentState: 2,
    status: 'PENDING',
    priority: 'URGENT',
    initiatorId: 'user-4',
    initiatorName: 'Jordan User',
    assigneeId: 'user-2',
    assigneeName: 'Morgan Manager',
    deployHash: '0x7e2c...cd34',
    createdAt: '2024-12-18T11:00:00Z',
    updatedAt: '2024-12-22T10:15:00Z',
    dueDate: '2024-12-25T17:00:00Z',
  },
  {
    id: 'wf-003',
    templateId: 'template-1',
    templateName: 'Document Approval',
    title: 'Marketing Campaign Brief',
    description: 'New product launch marketing campaign requiring approval',
    currentState: 10,
    status: 'COMPLETED',
    priority: 'MEDIUM',
    initiatorId: 'user-2',
    initiatorName: 'Morgan Manager',
    assigneeId: null,
    assigneeName: null,
    deployHash: '0x6d1b...ef56',
    createdAt: '2024-12-10T08:00:00Z',
    updatedAt: '2024-12-15T16:45:00Z',
    dueDate: null,
  },
  {
    id: 'wf-004',
    templateId: 'template-1',
    templateName: 'Document Approval',
    title: 'Employee Handbook Update',
    description: 'Updated employee handbook with new remote work policies',
    currentState: 20,
    status: 'ESCALATED',
    priority: 'HIGH',
    initiatorId: 'user-2',
    initiatorName: 'Morgan Manager',
    assigneeId: 'user-1',
    assigneeName: 'Alex Administrator',
    deployHash: '0x5c0a...gh78',
    createdAt: '2024-12-05T14:00:00Z',
    updatedAt: '2024-12-20T09:30:00Z',
    dueDate: '2024-12-26T17:00:00Z',
  },
  {
    id: 'wf-005',
    templateId: 'template-2',
    templateName: 'Purchase Request',
    title: 'Office Supplies Q1 2025',
    description: 'Quarterly office supplies purchase request',
    currentState: 0,
    status: 'DRAFT',
    priority: 'LOW',
    initiatorId: 'user-4',
    initiatorName: 'Jordan User',
    assigneeId: null,
    assigneeName: null,
    deployHash: null,
    createdAt: '2024-12-22T10:00:00Z',
    updatedAt: '2024-12-22T10:00:00Z',
    dueDate: null,
  },
];

export const MOCK_AUDIT_ENTRIES: AuditEntry[] = [
  {
    id: 'audit-1',
    instanceId: 'wf-001',
    instanceTitle: 'Q4 Financial Report Approval',
    templateName: 'Document Approval',
    fromState: 0,
    toState: 1,
    action: 'submit',
    actor: { id: 'user-4', publicKey: '01def...4567', displayName: 'Jordan User' },
    comment: 'Submitting for manager review',
    deployHash: '0x8f3d...ab12',
    createdAt: '2024-12-21T14:30:00Z',
  },
  {
    id: 'audit-2',
    instanceId: 'wf-002',
    instanceTitle: 'Server Infrastructure Upgrade',
    templateName: 'Purchase Request',
    fromState: 1,
    toState: 2,
    action: 'approve',
    actor: { id: 'user-2', publicKey: '01bcd...ef23', displayName: 'Morgan Manager' },
    comment: 'Approved, forwarding to finance for budget review',
    deployHash: '0x7e2c...cd34',
    createdAt: '2024-12-22T10:15:00Z',
  },
  {
    id: 'audit-3',
    instanceId: 'wf-003',
    instanceTitle: 'Marketing Campaign Brief',
    templateName: 'Document Approval',
    fromState: 1,
    toState: 10,
    action: 'approve',
    actor: { id: 'user-3', publicKey: '01cde...f345', displayName: 'Ashley Approver' },
    comment: 'Campaign approved - great work!',
    deployHash: '0x6d1b...ef56',
    createdAt: '2024-12-15T16:45:00Z',
  },
  {
    id: 'audit-4',
    instanceId: 'wf-004',
    instanceTitle: 'Employee Handbook Update',
    templateName: 'Document Approval',
    fromState: 1,
    toState: 20,
    action: 'escalate',
    actor: { id: 'user-3', publicKey: '01cde...f345', displayName: 'Ashley Approver' },
    comment: 'Escalating to admin for policy review',
    deployHash: '0x5c0a...gh78',
    createdAt: '2024-12-20T09:30:00Z',
  },
  {
    id: 'audit-5',
    instanceId: 'wf-002',
    instanceTitle: 'Server Infrastructure Upgrade',
    templateName: 'Purchase Request',
    fromState: 0,
    toState: 1,
    action: 'submit',
    actor: { id: 'user-4', publicKey: '01def...4567', displayName: 'Jordan User' },
    comment: 'Urgent request - current servers at capacity',
    deployHash: '0x4b9f...ij90',
    createdAt: '2024-12-18T11:30:00Z',
  },
];

// =============================================================================
// Demo Store
// =============================================================================

interface DemoState {
  currentRole: DemoRole;
  currentUser: User;
  isWalletConnected: boolean;
  walletBalance: string;
  
  // Actions
  setRole: (role: DemoRole) => void;
  toggleWallet: () => void;
  
  // Data getters based on role
  getVisibleWorkflows: () => WorkflowInstance[];
  getVisibleTemplates: () => WorkflowTemplate[];
  canAccessUsers: () => boolean;
  canAccessAudit: () => boolean;
  canApproveWorkflows: () => boolean;
  canCreateTemplates: () => boolean;
}

const getRoleUser = (role: DemoRole): User => {
  switch (role) {
    case 'ADMIN':
      return MOCK_USERS[0];
    case 'MANAGER':
      return MOCK_USERS[1];
    case 'APPROVER':
      return MOCK_USERS[2];
    case 'USER':
    default:
      return MOCK_USERS[3];
  }
};

export const useDemoStore = create<DemoState>((set, get) => ({
  currentRole: 'ADMIN',
  currentUser: MOCK_USERS[0],
  isWalletConnected: true,
  walletBalance: '1,250.00',

  setRole: (role) => set({
    currentRole: role,
    currentUser: getRoleUser(role),
  }),

  toggleWallet: () => set((state) => ({
    isWalletConnected: !state.isWalletConnected,
  })),

  getVisibleWorkflows: () => {
    const { currentRole, currentUser } = get();
    if (currentRole === 'ADMIN' || currentRole === 'MANAGER') {
      return MOCK_WORKFLOWS;
    }
    // Users and Approvers see only assigned or initiated workflows
    return MOCK_WORKFLOWS.filter(
      wf => wf.initiatorId === currentUser.id || wf.assigneeId === currentUser.id
    );
  },

  getVisibleTemplates: () => {
    const { currentRole } = get();
    if (currentRole === 'ADMIN' || currentRole === 'MANAGER') {
      return MOCK_TEMPLATES;
    }
    // Others see only published templates
    return MOCK_TEMPLATES.filter(t => t.status === 'PUBLISHED');
  },

  canAccessUsers: () => get().currentRole === 'ADMIN',
  canAccessAudit: () => ['ADMIN', 'MANAGER', 'APPROVER'].includes(get().currentRole),
  canApproveWorkflows: () => ['ADMIN', 'MANAGER', 'APPROVER'].includes(get().currentRole),
  canCreateTemplates: () => ['ADMIN', 'MANAGER'].includes(get().currentRole),
}));

// =============================================================================
// Demo Store for Zustand-free version (simple React context alternative)
// =============================================================================

export { create };
