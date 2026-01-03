// =============================================================================
// Demo App - Main Application Component
// =============================================================================

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import { DashboardLayout } from './layouts/DashboardLayout';

// Pages
import { RoleSelectionPage } from './pages/RoleSelectionPage';
import { DashboardPage } from './pages/DashboardPage';
import { WorkflowsPage } from './pages/WorkflowsPage';
import { WorkflowDetailPage } from './pages/WorkflowDetailPage';
import { CreateWorkflowPage } from './pages/CreateWorkflowPage';
import { TemplatesPage } from './pages/TemplatesPage';
import { AuditLogPage } from './pages/AuditLogPage';
import { UsersPage } from './pages/UsersPage';
import { WalletPage } from './pages/WalletPage';
import { SettingsPage } from './pages/SettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Role Selection - Entry Point */}
        <Route path="/" element={<RoleSelectionPage />} />

        {/* Dashboard Routes - All accessible after role selection */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/workflows" element={<WorkflowsPage />} />
          <Route path="/workflows/new" element={<CreateWorkflowPage />} />
          <Route path="/workflows/:id" element={<WorkflowDetailPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/audit" element={<AuditLogPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Route>

        {/* Catch all - redirect to role selection */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
