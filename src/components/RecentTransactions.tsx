import React from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Receipt, 
  Send,
  ChevronRight 
} from 'lucide-react';
import type { Transaction } from '../types/index';

interface RecentTransactionsProps {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const getTransactionIcon = (type: string, amount: number) => {
    if (amount > 0) return ArrowDownLeft;
    
    switch (type) {
      case 'transfer':
        return Send;
      case 'payment':
        return Receipt;
      default:
        return ArrowUpRight;
    }
  };

  const getTransactionColor = (amount: number) => {
    return amount > 0 ? 'text-green-600' : 'text-red-600';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Recent Transactions</h3>
        <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {transactions.map((transaction) => {
          const Icon = getTransactionIcon(transaction.type, transaction.amount);
          const isPositive = transaction.amount > 0;
          
          return (
            <div key={transaction.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${isPositive ? 'bg-green-100' : 'bg-red-100'}`}>
                  <Icon className={`h-5 w-5 ${isPositive ? 'text-green-600' : 'text-red-600'}`} />
                </div>
                <div>
                  <h4 className="font-medium text-slate-900 text-sm">
                    {transaction.description}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {formatDate(transaction.date)} • {transaction.status}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <span className={`font-semibold text-sm ${getTransactionColor(transaction.amount)}`}>
                  {isPositive ? '+' : ''}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}