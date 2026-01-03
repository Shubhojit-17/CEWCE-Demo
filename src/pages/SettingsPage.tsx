// =============================================================================
// Demo Settings Page
// =============================================================================

import { useState } from 'react';
import {
  UserCircleIcon,
  KeyIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import { useDemoStore } from '../store/demoStore';
import { getRoleInfo } from '../lib/utils';

const tabs = [
  { id: 'profile', name: 'Profile', icon: UserCircleIcon },
  { id: 'security', name: 'Security', icon: KeyIcon },
  { id: 'notifications', name: 'Notifications', icon: BellIcon },
];

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const { currentUser, currentRole } = useDemoStore();
  const roleInfo = getRoleInfo(currentRole);

  const [firstName, setFirstName] = useState(currentUser.firstName || '');
  const [lastName, setLastName] = useState(currentUser.lastName || '');
  const [email, setEmail] = useState(currentUser.email || '');

  const handleSaveProfile = () => {
    alert('✅ Demo: Profile would be saved!\n\nChanges would be persisted to the database.');
  };

  const handleChangePassword = () => {
    alert('✅ Demo: Password change would be processed!\n\nThis would validate current password and update to new one.');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <nav className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-enterprise-primary text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                {tab.name}
              </button>
            ))}
          </nav>

          {/* Role info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs font-medium text-gray-500 mb-2">Current Session</p>
            <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${roleInfo.color}`}>
              {roleInfo.label}
            </span>
            <p className="text-xs text-gray-500 mt-2">{currentUser.email}</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-medium text-gray-900">Profile Information</h2>
              </div>
              <div className="card-body">
                <form onSubmit={(e) => { e.preventDefault(); handleSaveProfile(); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="label">First Name</label>
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="input"
                      />
                    </div>
                    <div>
                      <label className="label">Last Name</label>
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="input"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="label">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input"
                    />
                  </div>
                  <div className="pt-4">
                    <button type="submit" className="btn-primary">
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-medium text-gray-900">Security Settings</h2>
              </div>
              <div className="card-body">
                <form onSubmit={(e) => { e.preventDefault(); handleChangePassword(); }} className="space-y-4">
                  <div>
                    <label className="label">Current Password</label>
                    <input type="password" className="input" placeholder="Enter current password" />
                  </div>
                  <div>
                    <label className="label">New Password</label>
                    <input type="password" className="input" placeholder="Enter new password" />
                  </div>
                  <div>
                    <label className="label">Confirm New Password</label>
                    <input type="password" className="input" placeholder="Confirm new password" />
                  </div>
                  <div className="pt-4">
                    <button type="submit" className="btn-primary">
                      Change Password
                    </button>
                  </div>
                </form>

                {/* Two-Factor Authentication */}
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Add an extra layer of security to your account
                  </p>
                  <button
                    onClick={() => alert('✅ Demo: Would open 2FA setup wizard')}
                    className="btn-secondary mt-4"
                  >
                    Enable 2FA
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="card">
              <div className="card-header">
                <h2 className="text-lg font-medium text-gray-900">Notification Preferences</h2>
              </div>
              <div className="card-body space-y-6">
                {[
                  { id: 'email', label: 'Email Notifications', description: 'Receive workflow updates via email' },
                  { id: 'pending', label: 'Pending Actions', description: 'Alert when items need your attention' },
                  { id: 'completed', label: 'Completion Alerts', description: 'Notify when workflows are completed' },
                  { id: 'escalation', label: 'Escalation Warnings', description: 'Alert before SLA deadlines' },
                ].map((pref) => (
                  <div key={pref.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{pref.label}</p>
                      <p className="text-sm text-gray-500">{pref.description}</p>
                    </div>
                    <button
                      type="button"
                      className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-enterprise-primary transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-enterprise-primary focus:ring-offset-2"
                      role="switch"
                      aria-checked="true"
                    >
                      <span className="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" />
                    </button>
                  </div>
                ))}

                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={() => alert('✅ Demo: Notification preferences would be saved')}
                    className="btn-primary"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Demo Note */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
        <p className="text-sm text-purple-800">
          🎬 <strong>Demo Mode:</strong> Changes made here are simulated and won't persist after page refresh.
        </p>
      </div>
    </div>
  );
}
