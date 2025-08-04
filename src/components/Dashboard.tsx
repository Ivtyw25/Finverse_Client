import {
  Send, 
  Receipt, 
  Smartphone, 
  TrendingUp,
  Eye,
  EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AccountCard from './AccountCard';
import QuickActions from './QuickActions';
import RecentTransactions from './RecentTransactions';
import { useState } from 'react';

export default function Dashboard() {
  const { user, accounts, recentTransactions } = useAuth();
  const [showBalance, setShowBalance] = useState(true);

  const totalBalance = accounts.reduce((sum, acc) => {
    return acc.type === 'credit' ? sum + acc.balance : sum + acc.balance;
  }, 0);

  const quickActions = [
    {
      id: '1',
      title: 'Transfer Money',
      icon: Send,
      description: 'Send to contacts',
      action: 'transfer'
    },
    {
      id: '2',
      title: 'Pay Bills',
      icon: Receipt,
      description: 'Utilities & more',
      action: 'bills'
    },
    {
      id: '3',
      title: 'Mobile Recharge',
      icon: Smartphone,
      description: 'Top up phone',
      action: 'recharge'
    },
    {
      id: '4',
      title: 'Investments',
      icon: TrendingUp,
      description: 'Manage portfolio',
      action: 'invest'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header with Balance */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="px-6 pt-12 pb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-lg font-medium text-blue-100">Good morning,</h1>
              <h2 className="text-2xl font-bold">{user?.name}</h2>
            </div>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-2 rounded-full bg-blue-500/20 hover:bg-blue-500/30 transition-colors"
            >
              {showBalance ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Total Balance */}
          <div className="mb-6">
            <p className="text-blue-100 text-sm mb-1">Total Balance</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">
                {showBalance ? `$${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '••••••'}
              </span>
              <span className="text-blue-200 text-sm">USD</span>
            </div>
          </div>

          {/* Account Cards Scroll */}
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
            {accounts.map((account) => (
              <AccountCard 
                key={account.id} 
                account={account} 
                showBalance={showBalance}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Quick Actions */}
        <QuickActions actions={quickActions} />

        {/* Recent Transactions */}
        <RecentTransactions transactions={recentTransactions} />
      </div>
    </div>
  );
}