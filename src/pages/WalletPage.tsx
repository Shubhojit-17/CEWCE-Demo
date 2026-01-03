// =============================================================================
// Demo Wallet Page
// =============================================================================

import {
  WalletIcon,
  ArrowPathIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { useDemoStore } from '../store/demoStore';

export function WalletPage() {
  const { currentUser, isWalletConnected, walletBalance, toggleWallet } = useDemoStore();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`✅ ${label} copied to clipboard!`);
  };

  const handleRefreshBalance = () => {
    alert('✅ Demo: Would fetch latest balance from Casper RPC');
  };

  const handleLinkWallet = () => {
    alert('✅ Demo: Would link this wallet to your account!\n\nThis enables:\n- Signing workflow transitions\n- On-chain identity verification\n- Blockchain transaction tracking');
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Wallet Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Connect and manage your Casper wallet for blockchain transactions
        </p>
      </div>

      {/* Connection Status Card */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-medium text-gray-900">Wallet Status</h2>
        </div>
        <div className="card-body">
          {isWalletConnected ? (
            <div className="space-y-6">
              {/* Connected State */}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Wallet Connected</p>
                  <p className="text-sm text-gray-500">Casper Wallet</p>
                </div>
                <button
                  onClick={toggleWallet}
                  className="ml-auto btn-secondary btn-sm"
                >
                  Disconnect
                </button>
              </div>

              {/* Wallet Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-500">Public Key</label>
                  <div className="mt-2 flex items-center gap-2">
                    <code className="text-sm font-mono text-gray-900 flex-1 truncate">
                      {currentUser.publicKey || '01abc...demo...xyz'}
                    </code>
                    <button
                      onClick={() => handleCopy(currentUser.publicKey || '', 'Public key')}
                      className="p-1 hover:bg-gray-200 rounded"
                    >
                      <ClipboardDocumentIcon className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <label className="text-sm font-medium text-gray-500">Balance</label>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-2xl font-semibold text-gray-900">{walletBalance}</span>
                    <span className="text-gray-500">CSPR</span>
                    <button
                      onClick={handleRefreshBalance}
                      className="ml-auto p-1 hover:bg-gray-200 rounded"
                    >
                      <ArrowPathIcon className="h-5 w-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Link Status */}
              {currentUser.publicKey ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-800">
                    <CheckCircleIcon className="h-5 w-5" />
                    <span className="font-medium">Wallet Linked to Account</span>
                  </div>
                  <p className="text-sm text-green-700 mt-1">
                    Your wallet is linked and can be used to sign blockchain transactions.
                  </p>
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-yellow-800">Wallet Not Linked</p>
                      <p className="text-sm text-yellow-700 mt-1">
                        Link your wallet to enable blockchain signing
                      </p>
                    </div>
                    <button onClick={handleLinkWallet} className="btn-primary btn-sm">
                      Link Wallet
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <WalletIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">No Wallet Connected</h3>
              <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
                Connect your Casper Wallet to sign transactions and interact with the blockchain.
              </p>
              <button onClick={toggleWallet} className="btn-primary mt-4">
                <WalletIcon className="h-5 w-5 mr-2" />
                Connect Wallet
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Info Section */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-medium text-gray-900">About Casper Wallet Integration</h2>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center mb-3">
                <WalletIcon className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900">Secure Signing</h3>
              <p className="text-sm text-gray-500 mt-1">
                All workflow transitions are signed with your private key, ensuring authenticity.
              </p>
            </div>
            <div>
              <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center mb-3">
                <CheckCircleIcon className="h-5 w-5 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-900">Immutable Records</h3>
              <p className="text-sm text-gray-500 mt-1">
                Actions are permanently recorded on Casper blockchain for compliance.
              </p>
            </div>
            <div>
              <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center mb-3">
                <InformationCircleIcon className="h-5 w-5 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-900">Identity Verification</h3>
              <p className="text-sm text-gray-500 mt-1">
                Your wallet address serves as your on-chain identity for audit trails.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Note */}
      <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-lg">🎬</span>
          <div>
            <h3 className="font-medium text-purple-900">Demo Mode</h3>
            <p className="text-sm text-purple-700 mt-1">
              In the real application, this would integrate with Casper Wallet browser extension.
              Toggle the wallet connection to simulate connected/disconnected states.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
