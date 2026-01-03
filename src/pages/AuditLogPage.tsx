// =============================================================================
// Demo Audit Log Page
// =============================================================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowTopRightOnSquareIcon,
  InformationCircleIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { useDemoStore, MOCK_AUDIT_ENTRIES } from '../store/demoStore';
import { formatDateTime, truncateHash, getStateName, getRoleInfo } from '../lib/utils';

export function AuditLogPage() {
  const { currentRole, canAccessAudit } = useDemoStore();
  const roleInfo = getRoleInfo(currentRole);

  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('');

  // Check access
  if (!canAccessAudit()) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center py-16">
          <LockClosedIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">Access Restricted</h2>
          <p className="text-gray-500 mt-2">
            The audit log is only accessible to Admin, Manager, and Approver roles.
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Current role: <span className={roleInfo.color}>{roleInfo.label}</span>
          </p>
          <Link to="/" className="btn-primary mt-6 inline-flex">
            Switch Role
          </Link>
        </div>
      </div>
    );
  }

  const auditEntries = MOCK_AUDIT_ENTRIES;
  
  // Filter entries
  const filteredEntries = auditEntries.filter(entry => {
    const matchesSearch = !search ||
      entry.instanceTitle.toLowerCase().includes(search.toLowerCase()) ||
      entry.actor.displayName?.toLowerCase().includes(search.toLowerCase());
    const matchesAction = !actionFilter || entry.action === actionFilter;
    return matchesSearch && matchesAction;
  });

  const actions = ['', 'submit', 'approve', 'reject', 'escalate', 'cancel'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Role context banner */}
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <InformationCircleIcon className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-yellow-900">
              Audit Access: <span className="text-yellow-600">{roleInfo.label}</span>
            </h3>
            <p className="text-sm text-yellow-700 mt-1">
              You have access to view the complete audit trail. All entries are immutably recorded on Casper blockchain.
            </p>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Log</h1>
          <p className="mt-1 text-sm text-gray-500">
            Immutable record of all workflow transitions
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <form className="flex-1" onSubmit={(e) => e.preventDefault()}>
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search audit entries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input pl-10"
            />
          </div>
        </form>
        <div className="flex items-center gap-2">
          <FunnelIcon className="h-5 w-5 text-gray-400" />
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="input"
          >
            <option value="">All Actions</option>
            {actions.slice(1).map((action) => (
              <option key={action} value={action}>
                {action.charAt(0).toUpperCase() + action.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Audit Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Timestamp
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Workflow
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transition
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Blockchain
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEntries.map((entry) => (
                <tr key={entry.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDateTime(entry.createdAt)}
                  </td>
                  <td className="px-6 py-4">
                    <Link
                      to={`/workflows/${entry.instanceId}`}
                      className="text-sm font-medium text-enterprise-primary hover:text-blue-800"
                    >
                      {entry.instanceTitle}
                    </Link>
                    <p className="text-xs text-gray-500">{entry.templateName}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      entry.action === 'approve' ? 'bg-green-100 text-green-700' :
                      entry.action === 'reject' ? 'bg-red-100 text-red-700' :
                      entry.action === 'escalate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {entry.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getStateName(entry.fromState)} → {getStateName(entry.toState)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{entry.actor.displayName}</div>
                    {entry.actor.publicKey && (
                      <div className="text-xs text-gray-500 font-mono">
                        {truncateHash(entry.actor.publicKey, 6, 4)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {entry.deployHash ? (
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`🔗 Would open Casper Explorer for:\n${entry.deployHash}`);
                        }}
                        className="inline-flex items-center gap-1 text-sm text-enterprise-primary hover:text-blue-800"
                      >
                        <span className="font-mono">{truncateHash(entry.deployHash, 6, 4)}</span>
                        <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                      </a>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEntries.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No audit entries found.</p>
          </div>
        )}
      </div>

      {/* Blockchain verification info */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-center gap-2 text-green-800">
          <span className="text-lg">⛓️</span>
          <span className="font-medium">Blockchain Verified</span>
        </div>
        <p className="text-sm text-green-700 mt-2">
          All audit entries are permanently recorded on the Casper blockchain, 
          providing an immutable and verifiable compliance trail.
        </p>
      </div>
    </div>
  );
}
