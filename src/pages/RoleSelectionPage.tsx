// =============================================================================
// Role Selection Page - Demo Entry Point
// =============================================================================

import { useNavigate } from 'react-router-dom';
import {
  ShieldCheckIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { useDemoStore, DemoRole } from '../store/demoStore';
import { getRoleInfo } from '../lib/utils';

interface RoleCard {
  role: DemoRole;
  icon: React.ComponentType<{ className?: string }>;
  features: string[];
}

const roles: RoleCard[] = [
  {
    role: 'ADMIN',
    icon: ShieldCheckIcon,
    features: [
      'Full system access',
      'User management',
      'All workflow operations',
      'Audit log access',
      'Template management',
    ],
  },
  {
    role: 'MANAGER',
    icon: UserGroupIcon,
    features: [
      'Create & manage templates',
      'View all workflows',
      'Approve/reject items',
      'Access audit logs',
    ],
  },
  {
    role: 'APPROVER',
    icon: ClipboardDocumentCheckIcon,
    features: [
      'Approve/reject workflows',
      'View assigned items',
      'Add comments',
      'Limited audit access',
    ],
  },
  {
    role: 'USER',
    icon: UserIcon,
    features: [
      'Create workflows',
      'Submit for approval',
      'Track own submissions',
      'View templates',
    ],
  },
];

export function RoleSelectionPage() {
  const navigate = useNavigate();
  const { setRole } = useDemoStore();

  const handleRoleSelect = (role: DemoRole) => {
    setRole(role);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-enterprise-primary via-casper-800 to-casper-900">
      {/* Demo Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center py-3 px-4">
        <div className="flex items-center justify-center gap-2">
          <span className="animate-pulse-slow">🎬</span>
          <span className="font-medium">DEMO MODE</span>
          <span className="text-white/80">|</span>
          <span className="text-sm">Select a role to explore the application</span>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-48px)] px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-sm">
              <svg
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">
            CEWCE Demo
          </h1>
          <p className="text-xl text-white/80 mb-2">
            Casper Enterprise Workflow & Compliance Engine
          </p>
          <p className="text-white/60 max-w-2xl mx-auto">
            Experience enterprise workflow management powered by Casper blockchain.
            Select a role below to explore different user perspectives.
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full animate-slide-up">
          {roles.map((roleCard, index) => {
            const roleInfo = getRoleInfo(roleCard.role);
            return (
              <button
                key={roleCard.role}
                onClick={() => handleRoleSelect(roleCard.role)}
                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-left hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-white/10 hover:border-white/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Role Icon */}
                <div className="mb-4">
                  <div className="h-14 w-14 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                    <roleCard.icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Role Info */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {roleInfo.label}
                </h3>
                <p className="text-white/60 text-sm mb-4">
                  {roleInfo.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2">
                  {roleCard.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                      <svg className="h-4 w-4 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover indicator */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-white/40 text-sm">
            Powered by Casper Network • Blockchain-Verified Workflows
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <span className="flex items-center gap-2 text-white/60 text-sm">
              <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></span>
              Testnet Connected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
