import React from 'react';
import { CreditCard, PiggyBank, Wallet } from 'lucide-react';
import type { Account } from '../types/index';

interface AccountCardProps {
  account: Account;
  showBalance: boolean;
}

export default function AccountCard({ account, showBalance }: AccountCardProps) {
  const getAccountIcon = (type: string) => {
    switch (type) {
      case 'checking':
        return Wallet;
      case 'savings':
        return PiggyBank;
      case 'credit':
        return CreditCard;
      default:
        return Wallet;
    }
  };

  const getAccountColor = (type: string) => {
    switch (type) {
      case 'checking':
        return 'from-emerald-500 to-emerald-600';
      case 'savings':
        return 'from-purple-500 to-purple-600';
      case 'credit':
        return 'from-orange-500 to-orange-600';
      default:
        return 'from-blue-500 to-blue-600';
    }
  };

  const Icon = getAccountIcon(account.type);
  const isCredit = account.type === 'credit';
  const displayBalance = isCredit ? Math.abs(account.balance) : account.balance;

  return (
    <div className={`min-w-[280px] bg-gradient-to-br ${getAccountColor(account.type)} rounded-2xl p-6 text-white shadow-lg`}>
      <div className="flex justify-between items-start mb-4">
        <div className="bg-white/20 p-3 rounded-xl">
          <Icon className="h-6 w-6" />
        </div>
        <div className="text-right">
          <p className="text-white/80 text-sm">{account.accountNumber}</p>
        </div>
      </div>
      
      <div>
        <p className="text-white/90 text-sm mb-1">{account.name}</p>
        <p className="text-2xl font-bold">
          {showBalance ? (
            <>
              {isCredit && '-'}${displayBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </>
          ) : (
            '••••••'
          )}
        </p>
        {isCredit && (
          <p className="text-white/80 text-xs mt-1">Available Credit</p>
        )}
      </div>
    </div>
  );
}