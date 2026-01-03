// =============================================================================
// Utility Functions - Matching Original Project
// =============================================================================

import { clsx, type ClassValue } from 'clsx';

/**
 * Combine class names with clsx
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Format a date string to a human-readable format
 */
export function formatDate(date: string | Date, options?: Intl.DateTimeFormatOptions): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options,
  }).format(d);
}

/**
 * Format a date string with time
 */
export function formatDateTime(date: string | Date): string {
  return formatDate(date, {
    hour: 'numeric',
    minute: '2-digit',
  });
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diff = now.getTime() - d.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 7) {
    return formatDate(d);
  } else if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  } else {
    return 'Just now';
  }
}

/**
 * Truncate a hash or address for display
 */
export function truncateHash(hash: string, start = 8, end = 6): string {
  if (!hash) return '';
  if (hash.length <= start + end) return hash;
  return `${hash.slice(0, start)}...${hash.slice(-end)}`;
}

/**
 * Get status badge color
 */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    DRAFT: 'badge-neutral',
    PENDING: 'badge-info',
    COMPLETED: 'badge-success',
    CANCELLED: 'badge-danger',
    ESCALATED: 'badge-warning',
    CONFIRMED: 'badge-success',
    FAILED: 'badge-danger',
    TIMEOUT: 'badge-warning',
  };
  return colors[status] || 'badge-neutral';
}

/**
 * Get workflow state color
 */
export function getStateColor(stateId: number): string {
  const colors: Record<number, string> = {
    0: 'bg-gray-100 text-gray-800', // DRAFT
    1: 'bg-blue-100 text-blue-800', // PENDING_REVIEW
    2: 'bg-purple-100 text-purple-800', // FINANCE_REVIEW
    10: 'bg-green-100 text-green-800', // APPROVED
    11: 'bg-red-100 text-red-800', // REJECTED
    20: 'bg-yellow-100 text-yellow-800', // ESCALATED
    30: 'bg-gray-100 text-gray-800', // CANCELLED
  };
  return colors[stateId] || 'bg-gray-100 text-gray-800';
}

/**
 * Get workflow state name
 */
export function getStateName(stateId: number): string {
  const names: Record<number, string> = {
    0: 'Draft',
    1: 'Pending Review',
    2: 'Finance Review',
    10: 'Approved',
    11: 'Rejected',
    20: 'Escalated',
    30: 'Cancelled',
  };
  return names[stateId] || `State ${stateId}`;
}

/**
 * Get priority badge color
 */
export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    LOW: 'bg-gray-100 text-gray-700',
    MEDIUM: 'bg-blue-100 text-blue-700',
    HIGH: 'bg-orange-100 text-orange-700',
    URGENT: 'bg-red-100 text-red-700',
  };
  return colors[priority] || 'bg-gray-100 text-gray-700';
}

/**
 * Get role display info
 */
export function getRoleInfo(role: string): { label: string; color: string; description: string } {
  const roles: Record<string, { label: string; color: string; description: string }> = {
    ADMIN: {
      label: 'Administrator',
      color: 'role-badge-admin',
      description: 'Full system access including user management',
    },
    MANAGER: {
      label: 'Manager',
      color: 'role-badge-manager',
      description: 'Can create templates and manage workflows',
    },
    APPROVER: {
      label: 'Approver',
      color: 'role-badge-approver',
      description: 'Can approve or reject workflow items',
    },
    USER: {
      label: 'User',
      color: 'role-badge-user',
      description: 'Can create and submit workflows',
    },
    VIEWER: {
      label: 'Viewer',
      color: 'badge-neutral',
      description: 'Read-only access to workflows',
    },
  };
  return roles[role] || { label: role, color: 'badge-neutral', description: '' };
}
