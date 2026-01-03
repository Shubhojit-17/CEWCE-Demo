// =============================================================================
// Demo Dashboard Page
// =============================================================================

import { Link } from 'react-router-dom';
import {
  DocumentDuplicateIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { useDemoStore, MOCK_AUDIT_ENTRIES } from '../store/demoStore';
import { formatRelativeTime, getStateName, getStateColor, getRoleInfo } from '../lib/utils';

// Feature tooltip component
function FeatureTooltip({ children, tip }: { children: React.ReactNode; tip: string }) {
  return (
    <div className="group relative inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
        {tip}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const { currentRole, getVisibleWorkflows, canAccessAudit } = useDemoStore();
  const roleInfo = getRoleInfo(currentRole);
  
  const workflows = getVisibleWorkflows();
  const recentWorkflows = workflows.slice(0, 5);
  const recentLogs = canAccessAudit() ? MOCK_AUDIT_ENTRIES.slice(0, 5) : [];

  // Calculate stats based on visible workflows
  const stats = {
    totalWorkflows: workflows.length,
    pendingWorkflows: workflows.filter(w => w.status === 'PENDING').length,
    completedWorkflows: workflows.filter(w => w.status === 'COMPLETED').length,
    escalatedWorkflows: workflows.filter(w => w.status === 'ESCALATED').length,
  };

  const statCards = [
    {
      name: 'Total Workflows',
      value: stats.totalWorkflows,
      icon: DocumentDuplicateIcon,
      color: 'bg-blue-500',
      tip: 'Total number of workflows visible to your role',
    },
    {
      name: 'Pending Review',
      value: stats.pendingWorkflows,
      icon: ClockIcon,
      color: 'bg-yellow-500',
      tip: 'Workflows awaiting action or approval',
    },
    {
      name: 'Completed',
      value: stats.completedWorkflows,
      icon: CheckCircleIcon,
      color: 'bg-green-500',
      tip: 'Successfully completed workflows',
    },
    {
      name: 'Escalated',
      value: stats.escalatedWorkflows,
      icon: ExclamationTriangleIcon,
      color: 'bg-red-500',
      tip: 'Workflows that require elevated attention',
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Role-specific welcome banner */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <InformationCircleIcon className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-purple-900">
              Viewing as: <span className={roleInfo.color.replace('role-badge-', 'text-').replace('-800', '-600')}>{roleInfo.label}</span>
            </h3>
            <p className="text-sm text-purple-700 mt-1">
              {currentRole === 'ADMIN' && 'You have full access to all features including user management and system configuration.'}
              {currentRole === 'MANAGER' && 'You can create templates, view all workflows, and manage approvals.'}
              {currentRole === 'APPROVER' && 'You can approve or reject workflows assigned to you.'}
              {currentRole === 'USER' && 'You can create and submit workflows for approval.'}
            </p>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Overview of your workflow engine activity
          </p>
        </div>
        <Link to="/workflows/new" className="btn-primary">
          Create Workflow
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <FeatureTooltip key={stat.name} tip={stat.tip}>
            <div className="card hover:shadow-md transition-shadow">
              <div className="card-body">
                <div className="flex items-center">
                  <div className={`${stat.color} rounded-lg p-3`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                    <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            </div>
          </FeatureTooltip>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Workflows */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium text-gray-900">Recent Workflows</h2>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                {workflows.length} visible
              </span>
            </div>
            <Link to="/workflows" className="text-sm text-enterprise-primary hover:text-blue-800">
              View all
            </Link>
          </div>
          <div className="card-body p-0">
            {recentWorkflows.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {recentWorkflows.map((workflow) => (
                  <li key={workflow.id}>
                    <Link
                      to={`/workflows/${workflow.id}`}
                      className="block px-6 py-4 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {workflow.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatRelativeTime(workflow.createdAt)}
                          </p>
                        </div>
                        <div className="ml-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStateColor(
                              workflow.currentState
                            )}`}
                          >
                            {getStateName(workflow.currentState)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 text-center text-gray-500">
                No workflows visible for your role.{' '}
                <Link to="/workflows/new" className="text-enterprise-primary hover:underline">
                  Create your first workflow
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity / Audit Log */}
        <div className="card">
          <div className="card-header flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
              {!canAccessAudit() && (
                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                  Limited access
                </span>
              )}
            </div>
            {canAccessAudit() && (
              <Link to="/audit" className="text-sm text-enterprise-primary hover:text-blue-800">
                View audit log
              </Link>
            )}
          </div>
          <div className="card-body p-0">
            {canAccessAudit() && recentLogs.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {recentLogs.map((log) => (
                  <li key={log.id} className="px-6 py-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-600">
                            {log.actor.displayName?.charAt(0) || '?'}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-gray-900">
                          <span className="font-medium">{log.actor.displayName}</span>
                          {' '}{log.action}d{' '}
                          <span className="font-medium">{log.instanceTitle}</span>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatRelativeTime(log.createdAt)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-6 text-center text-gray-500">
                {canAccessAudit() 
                  ? 'No recent activity to display.'
                  : (
                    <div>
                      <p className="mb-2">🔒 Audit log access restricted</p>
                      <p className="text-xs">Requires Manager, Approver, or Admin role</p>
                    </div>
                  )
                }
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Demo feature highlight */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">🎯 Key Features to Explore</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900">📋 Workflow Management</h4>
            <p className="text-sm text-gray-600 mt-1">Create, track, and manage approval workflows with blockchain verification</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900">🔐 Role-Based Access</h4>
            <p className="text-sm text-gray-600 mt-1">Different views and permissions for Admin, Manager, Approver, and User roles</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="font-medium text-gray-900">⛓️ Blockchain Audit</h4>
            <p className="text-sm text-gray-600 mt-1">Immutable audit trail on Casper Network for compliance and transparency</p>
          </div>
        </div>
      </div>
    </div>
  );
}
