import React from 'react';
import { AlertTriangle, AlertCircle, CheckCircle } from 'lucide-react';

interface RiskBadgeProps {
  risk: 'high' | 'medium' | 'low';
  size?: 'sm' | 'md' | 'lg';
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ risk, size = 'md' }) => {
  const getRiskStyles = () => {
    switch (risk) {
      case 'high':
        return {
          bg: 'bg-red-100 dark:bg-red-900/30',
          text: 'text-red-800 dark:text-red-400',
          border: 'border-red-200 dark:border-red-800',
          icon: AlertTriangle
        };
      case 'medium':
        return {
          bg: 'bg-yellow-100 dark:bg-yellow-900/30',
          text: 'text-yellow-800 dark:text-yellow-400',
          border: 'border-yellow-200 dark:border-yellow-800',
          icon: AlertCircle
        };
      case 'low':
        return {
          bg: 'bg-green-100 dark:bg-green-900/30',
          text: 'text-green-800 dark:text-green-400',
          border: 'border-green-200 dark:border-green-800',
          icon: CheckCircle
        };
    }
  };

  const styles = getRiskStyles();
  const Icon = styles.icon;
  
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  return (
    <span className={`
      inline-flex items-center gap-1.5 rounded-full border font-medium
      ${styles.bg} ${styles.text} ${styles.border} ${sizeClasses[size]}
    `}>
      <Icon className={iconSizes[size]} />
      {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
    </span>
  );
};