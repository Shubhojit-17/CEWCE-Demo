// =============================================================================
// Demo Workflows Page
// =============================================================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { useDemoStore } from '../store/demoStore';
import { formatDate, getStateName, getStateColor, getPriorityColor, getRoleInfo } from '../lib/utils';

export function WorkflowsPage() {
  const { currentRole, getVisibleWorkflows, canApproveWorkflows } = useDemoStore();
  const roleInfo = getRoleInfo(currentRole);
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const allWorkflows = getVisibleWorkflows();
  
  // Filter workflows
  const workflows = allWorkflows.filter(wf => {
    const matchesSearch = !search || 
      wf.title.toLowerCase().includes(search.toLowerCase()) ||
      wf.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = !statusFilter || wf.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statuses = ['', 'DRAFT', 'PENDING', 'COMPLETED', 'CANCELLED', 'ESCALATED'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Role context banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <InformationCircleIcon className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900">
              Workflow Access: <span className="text-blue-600">{roleInfo.label}</span>
            </h3>
            <p className="text-sm text-blue-700 mt-1">
              {currentRole === 'ADMIN' || currentRole === 'MANAGER' 
                ? `You can see all ${allWorkflows.length} workflows in the system.`
                : `You can see ${allWorkflows.length} workflows (assigned to you or initiated by you).`
              }
              {canApproveWorkflows() && ' You can approve or reject pending items.'}
            </p>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workflows</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track all workflow instances
          </p>
        </div>
        <Link to="/workflows/new" className="btn-primary">
          <PlusIcon className="h-5 w-5 mr-2" />
          New Workflow
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <form className="flex-1" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search workflows..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10"
            />
          </div>
        </form>
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-5 w-5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input"
          >
            <option value="">All Statuses</option>
            {statuses.slice(1).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Workflows Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Workflow
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Template
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  State
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {workflows.map((workflow) => (
                <tr key={workflow.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <Link
                      to={`/workflows/${workflow.id}`}
                      className="text-sm font-medium text-enterprise-primary hover:text-blue-800"
                    >
                      {workflow.title}
                    </Link>
                    <p className="text-sm text-gray-500 truncate max-w-xs">
                      {workflow.description}
                    </p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{workflow.templateName}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStateColor(workflow.currentState)}`}>
                      {getStateName(workflow.currentState)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(workflow.priority)}`}>
                      {workflow.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {workflow.assigneeName || '—'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(workflow.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {workflows.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No workflows found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Demo hint */}
      <div className="text-center text-sm text-gray-500">
        💡 Click on a workflow title to view details and available actions
      </div>
    </div>
  );
}
