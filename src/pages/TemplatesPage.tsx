// =============================================================================
// Demo Templates Page
// =============================================================================

import { PlusIcon, PencilIcon, RocketLaunchIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { useDemoStore } from '../store/demoStore';
import { formatDate, getRoleInfo } from '../lib/utils';

export function TemplatesPage() {
  const { currentRole, getVisibleTemplates, canCreateTemplates } = useDemoStore();
  const roleInfo = getRoleInfo(currentRole);
  const templates = getVisibleTemplates();

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      DRAFT: 'bg-gray-100 text-gray-700',
      PUBLISHED: 'bg-green-100 text-green-700',
      DEPRECATED: 'bg-yellow-100 text-yellow-700',
      ARCHIVED: 'bg-red-100 text-red-700',
    };
    return styles[status] || 'bg-gray-100 text-gray-700';
  };

  const handleCreateTemplate = () => {
    alert('✅ Demo: Template creation modal would open!\n\nIn the real app, you would:\n1. Define workflow states\n2. Configure transitions\n3. Set SLA parameters\n4. Deploy to blockchain');
  };

  const handlePublish = (name: string) => {
    alert(`✅ Demo: Template "${name}" would be published!\n\nThis deploys the workflow contract to Casper blockchain.`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Role context banner */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <InformationCircleIcon className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-green-900">
              Template Access: <span className="text-green-600">{roleInfo.label}</span>
            </h3>
            <p className="text-sm text-green-700 mt-1">
              {canCreateTemplates()
                ? `You can create and manage workflow templates. Viewing ${templates.length} templates.`
                : `You can view published templates only. ${templates.length} templates available.`
              }
            </p>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workflow Templates</h1>
          <p className="mt-1 text-sm text-gray-500">
            Define and manage reusable workflow definitions
          </p>
        </div>
        {canCreateTemplates() && (
          <button onClick={handleCreateTemplate} className="btn-primary">
            <PlusIcon className="h-5 w-5 mr-2" />
            New Template
          </button>
        )}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div key={template.id} className="card hover:shadow-md transition-shadow">
            <div className="card-body">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(template.status)}`}>
                  {template.status}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">States:</span>
                  <span className="ml-2 text-gray-900">{template.states.length}</span>
                </div>
                <div>
                  <span className="text-gray-500">Version:</span>
                  <span className="ml-2 text-gray-900">v{template.version}</span>
                </div>
                <div>
                  <span className="text-gray-500">SLA:</span>
                  <span className="ml-2 text-gray-900">{template.slaDays} days</span>
                </div>
                <div>
                  <span className="text-gray-500">Escalation:</span>
                  <span className="ml-2 text-gray-900">{template.escalationDays} days</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Created: {formatDate(template.createdAt)}
                </p>
              </div>

              {canCreateTemplates() && (
                <div className="mt-4 flex gap-2">
                  {template.status === 'DRAFT' && (
                    <>
                      <button className="btn-sm btn-secondary flex-1">
                        <PencilIcon className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                      <button
                        onClick={() => handlePublish(template.name)}
                        className="btn-sm btn-primary flex-1"
                      >
                        <RocketLaunchIcon className="h-4 w-4 mr-1" />
                        Publish
                      </button>
                    </>
                  )}
                  {template.status === 'PUBLISHED' && (
                    <button className="btn-sm btn-secondary flex-1">
                      View Details
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {templates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No templates available.</p>
        </div>
      )}

      {/* Feature explanation */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">📋 About Workflow Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <h4 className="font-medium text-gray-900">What are templates?</h4>
            <p className="mt-1">Templates define the structure of workflows: states, transitions, and rules.</p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900">Blockchain deployment</h4>
            <p className="mt-1">Published templates are deployed as smart contracts on Casper Network.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
