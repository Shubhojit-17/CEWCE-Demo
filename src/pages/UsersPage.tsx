// =============================================================================
// Demo Users Page (Admin Only)
// =============================================================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheckIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  LockClosedIcon,
} from '@heroicons/react/24/outline';
import { useDemoStore, MOCK_USERS } from '../store/demoStore';
import { formatDate, truncateHash, getRoleInfo } from '../lib/utils';

export function UsersPage() {
  const { currentRole, canAccessUsers } = useDemoStore();
  const roleInfo = getRoleInfo(currentRole);

  const [searchTerm, setSearchTerm] = useState('');

  // Check access
  if (!canAccessUsers()) {
    return (
      <div className="space-y-6 animate-fade-in">
        <div className="text-center py-16">
          <LockClosedIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900">Admin Access Required</h2>
          <p className="text-gray-500 mt-2">
            User management is only available to Administrators.
          </p>
          <p className="text-sm text-gray-400 mt-4">
            Current role: <span className={roleInfo.color}>{roleInfo.label}</span>
          </p>
          <Link to="/" className="btn-primary mt-6 inline-flex">
            Switch to Admin Role
          </Link>
        </div>
      </div>
    );
  }

  const users = MOCK_USERS;
  const filteredUsers = users.filter(
    (u) =>
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.publicKey?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignRole = (userName: string) => {
    alert(`✅ Demo: Would open role assignment modal for ${userName}!\n\nAdmins can assign roles:\n- ADMIN\n- MANAGER\n- APPROVER\n- USER\n- VIEWER`);
  };

  const handleRemoveRole = (userName: string, role: string) => {
    alert(`✅ Demo: Would remove "${role}" role from ${userName}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Admin badge */}
      <div className="bg-gradient-to-r from-red-50 to-rose-50 border border-red-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <ShieldCheckIcon className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-900">
              Administrator Access
            </h3>
            <p className="text-sm text-red-700 mt-1">
              You have full access to manage users and their roles. Changes here affect system-wide permissions.
            </p>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage users and role assignments
          </p>
        </div>
        <button
          onClick={() => alert('✅ Demo: Would open invite user modal')}
          className="btn-primary"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Invite User
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input pl-10"
        />
      </div>

      {/* Users Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Wallet
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Roles
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-enterprise-primary/10 flex items-center justify-center">
                        <span className="text-sm font-medium text-enterprise-primary">
                          {user.firstName?.charAt(0) || user.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.publicKey ? (
                      <span className="text-sm font-mono text-gray-600">
                        {truncateHash(user.publicKey, 8, 6)}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">Not linked</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role) => {
                        const roleInfo = getRoleInfo(role);
                        return (
                          <span
                            key={role}
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${roleInfo.color}`}
                          >
                            {role}
                            <button
                              onClick={() => handleRemoveRole(`${user.firstName} ${user.lastName}`, role)}
                              className="hover:text-red-600 ml-1"
                              title="Remove role"
                            >
                              ×
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => handleAssignRole(`${user.firstName} ${user.lastName}`)}
                      className="btn-sm btn-secondary"
                    >
                      <PlusIcon className="h-4 w-4 mr-1" />
                      Add Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No users found.</p>
          </div>
        )}
      </div>

      {/* Role explanation */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">👥 Role Hierarchy</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {['ADMIN', 'MANAGER', 'APPROVER', 'USER', 'VIEWER'].map((role) => {
            const info = getRoleInfo(role);
            return (
              <div key={role} className="bg-white rounded-lg p-3 border border-gray-200">
                <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${info.color}`}>
                  {role}
                </span>
                <p className="text-xs text-gray-600 mt-2">{info.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
