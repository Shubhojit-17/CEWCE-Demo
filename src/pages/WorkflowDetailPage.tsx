// =============================================================================
// Demo Workflow Detail Page
// =============================================================================

import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { useDemoStore, MOCK_WORKFLOWS, MOCK_TEMPLATES, MOCK_AUDIT_ENTRIES } from '../store/demoStore';
import { formatDateTime, formatRelativeTime, getStateName, getStateColor, getPriorityColor, truncateHash, getRoleInfo } from '../lib/utils';

export function WorkflowDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentRole, canApproveWorkflows } = useDemoStore();
  const roleInfo = getRoleInfo(currentRole);

  const [showActionModal, setShowActionModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  // Find workflow
  const workflow = MOCK_WORKFLOWS.find(w => w.id === id);
  const template = workflow ? MOCK_TEMPLATES.find(t => t.id === workflow.templateId) : null;
  const auditLogs = MOCK_AUDIT_ENTRIES.filter(e => e.instanceId === id);

  if (!workflow) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Workflow Not Found</h2>
        <p className="text-gray-500 mt-2">The requested workflow does not exist.</p>
        <Link to="/workflows" className="btn-primary mt-4">
          Back to Workflows
        </Link>
      </div>
    );
  }

  // Determine available actions based on current state and role
  const getAvailableActions = () => {
    if (!canApproveWorkflows()) return [];
    if (!template) return [];

    const currentState = workflow.currentState;
    const transitions = template.transitions.filter(t => t.from === currentState);
    
    return transitions.map(t => ({
      action: t.action,
      label: t.label || t.action,
      toState: t.to,
    }));
  };

  const availableActions = getAvailableActions();

  const handleAction = (action: string) => {
    setSelectedAction(action);
    setShowActionModal(true);
  };

  const executeAction = () => {
    // In demo mode, just show a success message
    alert(`✅ Demo: "${selectedAction}" action would be executed!\n\nIn the real app, this would:\n1. Submit to blockchain\n2. Update workflow state\n3. Record in audit log`);
    setShowActionModal(false);
    setSelectedAction(null);
    setComment('');
  };

  const getActionButtonStyle = (action: string) => {
    if (action === 'approve' || action === 'sign') return 'btn-success';
    if (action === 'reject' || action === 'cancel') return 'btn-danger';
    if (action === 'escalate') return 'bg-yellow-500 text-white hover:bg-yellow-600';
    return 'btn-primary';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/workflows')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeftIcon className="h-5 w-5 text-gray-500" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{workflow.title}</h1>
          <p className="mt-1 text-sm text-gray-500">{workflow.templateName}</p>
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStateColor(workflow.currentState)}`}>
          {getStateName(workflow.currentState)}
        </span>
      </div>

      {/* Role context */}
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <InformationCircleIcon className="h-6 w-6 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-purple-900">
              Your Access: <span className="text-purple-600">{roleInfo.label}</span>
            </h3>
            <p className="text-sm text-purple-700 mt-1">
              {canApproveWorkflows() 
                ? `You can take actions on this workflow. Available actions: ${availableActions.length > 0 ? availableActions.map(a => a.label).join(', ') : 'None (terminal state)'}`
                : 'You have view-only access to this workflow.'
              }
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Details Card */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-medium text-gray-900">Details</h2>
            </div>
            <div className="card-body space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500">Description</label>
                <p className="mt-1 text-gray-900">{workflow.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Priority</label>
                  <p className="mt-1">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(workflow.priority)}`}>
                      {workflow.priority}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Created</label>
                  <p className="mt-1 text-gray-900">{formatDateTime(workflow.createdAt)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Initiator</label>
                  <p className="mt-1 text-gray-900">{workflow.initiatorName}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">Assignee</label>
                  <p className="mt-1 text-gray-900">{workflow.assigneeName || '—'}</p>
                </div>
              </div>
              {workflow.deployHash && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Blockchain Hash</label>
                  <p className="mt-1 font-mono text-sm text-gray-900">
                    {truncateHash(workflow.deployHash, 12, 8)}
                    <span className="ml-2 text-xs text-green-600">✓ Verified on Casper</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Actions Card */}
          {availableActions.length > 0 && (
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-medium text-gray-900">Available Actions</h2>
              </div>
              <div className="card-body">
                <div className="flex flex-wrap gap-3">
                  {availableActions.map((action) => (
                    <button
                      key={action.action}
                      onClick={() => handleAction(action.action)}
                      className={`btn ${getActionButtonStyle(action.action)}`}
                    >
                      {action.action === 'approve' && <CheckCircleIcon className="h-5 w-5 mr-2" />}
                      {action.action === 'reject' && <XCircleIcon className="h-5 w-5 mr-2" />}
                      {action.action === 'escalate' && <ExclamationTriangleIcon className="h-5 w-5 mr-2" />}
                      {action.label}
                    </button>
                  ))}
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  💡 Actions are recorded on the Casper blockchain for immutable audit trail
                </p>
              </div>
            </div>
          )}

          {/* Audit Trail */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-medium text-gray-900">Audit Trail</h2>
            </div>
            <div className="card-body p-0">
              {auditLogs.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {auditLogs.map((log) => (
                    <li key={log.id} className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0">
                          <div className="h-8 w-8 rounded-full bg-enterprise-primary/10 flex items-center justify-center">
                            <DocumentTextIcon className="h-4 w-4 text-enterprise-primary" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">
                            <span className="font-medium">{log.actor.displayName}</span>
                            {' '}{log.action}d this workflow
                          </p>
                          {log.comment && (
                            <p className="text-sm text-gray-600 mt-1 italic">"{log.comment}"</p>
                          )}
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>{formatRelativeTime(log.createdAt)}</span>
                            {log.deployHash && (
                              <span className="font-mono text-green-600">
                                ⛓️ {truncateHash(log.deployHash, 6, 4)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No audit entries yet
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* State Timeline */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-medium text-gray-900">Workflow States</h2>
            </div>
            <div className="card-body">
              {template?.states.map((state) => {
                const isActive = state.id === workflow.currentState;
                const isPast = state.id < workflow.currentState || 
                  (workflow.currentState >= 10 && state.id < 10);
                
                return (
                  <div key={state.id} className="flex items-center gap-3 py-2">
                    <div className={`h-3 w-3 rounded-full ${
                      isActive ? 'bg-enterprise-primary ring-4 ring-enterprise-primary/20' :
                      isPast ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                    <span className={`text-sm ${isActive ? 'font-medium text-gray-900' : 'text-gray-500'}`}>
                      {state.name}
                    </span>
                    {isActive && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                        Current
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Info */}
          <div className="card">
            <div className="card-header">
              <h2 className="text-lg font-medium text-gray-900">Quick Info</h2>
            </div>
            <div className="card-body space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Status</span>
                <span className={`badge ${getStateColor(workflow.currentState)}`}>
                  {workflow.status}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">SLA Days</span>
                <span className="text-gray-900">{template?.slaDays || 7}</span>
              </div>
              {workflow.dueDate && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Due Date</span>
                  <span className="text-gray-900">{formatDateTime(workflow.dueDate)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Action: {selectedAction}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="label">Comment (optional)</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="input"
                  rows={3}
                  placeholder="Add a comment..."
                />
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  ⚠️ Demo Mode: This action will be simulated. In production, it would be recorded on the Casper blockchain.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowActionModal(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button
                  onClick={executeAction}
                  className={`btn flex-1 ${getActionButtonStyle(selectedAction || '')}`}
                >
                  Confirm {selectedAction}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
