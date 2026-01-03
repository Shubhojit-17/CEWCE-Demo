# CEWCE Demo Website

> **🎬 Demo Mode** - A standalone demonstration website for judges and presentation purposes.

## Overview

This demo website is an exact visual replica of the CEWCE (Casper Enterprise Workflow & Compliance Engine) frontend, designed specifically for:

- **Judging sessions** - Allow judges to explore all features without authentication
- **Screen recording** - Perfect for creating YouTube demo videos
- **Presentation** - Showcase the project's capabilities to stakeholders

## Quick Start

### Prerequisites
- Node.js 18+ installed
- pnpm (recommended) or npm

### Installation & Running

```bash
# Navigate to demo-website folder
cd demo-website

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The demo will open at **http://localhost:5174** (different port from main app).

## How to Use the Demo

### 1. Role Selection (Start Here)
When you open the demo, you'll see a **Role Selection Page** with four roles:

| Role | Access Level |
|------|--------------|
| **Admin** | Full access including user management |
| **Manager** | Create templates, manage all workflows |
| **Approver** | Approve/reject assigned workflows |
| **User** | Create and submit workflows |

**Click any role** to instantly access that role's dashboard view.

### 2. Quick Role Switching
Once inside the dashboard, use the **purple demo bar** at the top to:
- See your current role
- Quick-switch between roles with one click
- Return to role selection

### 3. Exploring Features

#### Dashboard
- View statistics (changes based on role)
- See recent workflows (filtered by role permissions)
- Access audit log (Admin/Manager/Approver only)

#### Workflows
- Browse workflow instances
- Click to view details and available actions
- Create new workflows from templates
- Approve/reject (if you have permission)

#### Templates
- View workflow templates
- Create new templates (Admin/Manager)
- Publish templates to blockchain (simulated)

#### Audit Log
- Immutable record of all actions
- Blockchain verification indicators
- Only visible to Admin/Manager/Approver

#### Users (Admin Only)
- View all system users
- Manage role assignments
- Invite new users

#### Wallet
- Connect/disconnect wallet (simulated)
- View balance and public key
- Link wallet to account

#### Settings
- Profile management
- Security settings
- Notification preferences

## Suggested Demo Flow (for Video Recording)

### Flow 1: Admin Overview (2-3 min)
1. Select **Admin** role
2. Show dashboard with all statistics
3. Navigate to **Users** → demonstrate user management
4. Go to **Audit Log** → show blockchain verification
5. Quick-switch to User role to show difference

### Flow 2: Workflow Lifecycle (3-4 min)
1. Select **User** role
2. Create new workflow from template
3. Switch to **Approver** role
4. Find the workflow and approve it
5. Show audit trail with blockchain hash

### Flow 3: Template Management (2 min)
1. Select **Manager** role
2. Navigate to **Templates**
3. Show template creation (simulated)
4. Explain state machine and SLA settings

### Flow 4: Role Comparison (1-2 min)
1. Quick-switch through all roles on Dashboard
2. Point out how stats and visibility change
3. Show restricted access (e.g., Users page for non-admin)

## Key Demo Highlights

✅ **No Authentication Required** - Direct role selection  
✅ **Real UI Components** - Identical to production  
✅ **Mock Data** - Realistic sample workflows and users  
✅ **Role-Based Views** - See exactly what each role can access  
✅ **Blockchain Indicators** - Simulated deploy hashes and verification  
✅ **Responsive Design** - Works on all screen sizes  

## Demo Data

The demo includes pre-populated mock data:

- **5 Users** with different role combinations
- **3 Templates** (Document Approval, Purchase Request, Contract Signing)
- **5 Workflows** in various states (Draft, Pending, Completed, Escalated)
- **5 Audit Entries** showing workflow transitions

## Technical Notes

- Built with React + TypeScript + Tailwind CSS
- Uses Zustand for state management
- No backend dependencies
- All data is static/mocked
- Actions show demo alerts explaining what would happen in production

## File Structure

```
demo-website/
├── src/
│   ├── App.tsx              # Main routes
│   ├── main.tsx             # Entry point
│   ├── index.css            # Styles (matching original)
│   ├── layouts/
│   │   └── DashboardLayout.tsx
│   ├── pages/
│   │   ├── RoleSelectionPage.tsx
│   │   ├── DashboardPage.tsx
│   │   ├── WorkflowsPage.tsx
│   │   ├── WorkflowDetailPage.tsx
│   │   ├── CreateWorkflowPage.tsx
│   │   ├── TemplatesPage.tsx
│   │   ├── AuditLogPage.tsx
│   │   ├── UsersPage.tsx
│   │   ├── WalletPage.tsx
│   │   └── SettingsPage.tsx
│   ├── store/
│   │   └── demoStore.ts     # Mock data & state
│   └── lib/
│       └── utils.ts         # Utility functions
├── package.json
├── tailwind.config.js
├── vite.config.ts
└── README.md
```

## Building for Production

```bash
# Build optimized version
pnpm build

# Preview production build
pnpm preview
```

The built files will be in `dist/` folder and can be deployed to any static hosting.

---

**⚠️ Important:** This is a demo-only website. It does not connect to any backend or blockchain. All actions are simulated for demonstration purposes.
