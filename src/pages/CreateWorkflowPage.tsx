// =============================================================================
// Demo Create Workflow Page
// =============================================================================

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useDemoStore } from '../store/demoStore';

export function CreateWorkflowPage() {
  const navigate = useNavigate();
  const { getVisibleTemplates } = useDemoStore();

  const templates = getVisibleTemplates().filter(t => t.status === 'PUBLISHED');
  
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('MEDIUM');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTemplate || !title) {
      alert('Please select a template and enter a title');
      return;
    }

    // Demo: Show success and navigate
    alert(`✅ Demo: Workflow "${title}" would be created!\n\nIn the real app, this would:\n1. Create workflow instance\n2. Record on Casper blockchain\n3. Notify relevant parties`);
    navigate('/workflows');
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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Workflow</h1>
          <p className="mt-1 text-sm text-gray-500">
            Start a new workflow instance from a template
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Template Selection */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-medium text-gray-900">Select Template</h2>
          </div>
          <div className="card-body">
            {templates.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    type="button"
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`relative p-4 rounded-lg border-2 text-left transition-all ${
                      selectedTemplate === template.id
                        ? 'border-enterprise-primary bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {selectedTemplate === template.id && (
                      <div className="absolute top-2 right-2">
                        <CheckIcon className="h-5 w-5 text-enterprise-primary" />
                      </div>
                    )}
                    <h3 className="font-medium text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{template.description}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        {template.states.length} states
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        SLA: {template.slaDays} days
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No published templates available.
              </div>
            )}
          </div>
        </div>

        {/* Workflow Details */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-medium text-gray-900">Workflow Details</h2>
          </div>
          <div className="card-body space-y-4">
            <div>
              <label className="label">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input"
                placeholder="Enter workflow title"
                required
              />
            </div>
            <div>
              <label className="label">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input"
                rows={3}
                placeholder="Describe the purpose of this workflow"
              />
            </div>
            <div>
              <label className="label">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="input"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="URGENT">Urgent</option>
              </select>
            </div>
          </div>
        </div>

        {/* Demo Notice */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
          <p className="text-sm text-purple-800">
            🎬 <strong>Demo Mode:</strong> Submitting will simulate workflow creation. 
            In the real application, this would create a blockchain-verified workflow instance.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/workflows')}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!selectedTemplate || !title}
            className="btn-primary"
          >
            Create Workflow
          </button>
        </div>
      </form>
    </div>
  );
}
