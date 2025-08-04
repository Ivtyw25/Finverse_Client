import React, { useState, useMemo } from 'react';
import type { DashboardProps} from '../types';
import { SessionCard } from './SessionCard';
import { Search, Filter, BarChart3, Users, AlertTriangle, TrendingUp } from 'lucide-react';

export const ClientDashboard: React.FC<DashboardProps> = ({ 
  sessions, 
  title = "Security Dashboard" 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [sortBy, setSortBy] = useState<'timestamp' | 'risk' | 'user_id'>('risk');

  // Statistics calculations
  const statistics = useMemo(() => {
    const total = sessions.length;
    const highRisk = sessions.filter(s => s.risk_level === 'high').length;
    const mediumRisk = sessions.filter(s => s.risk_level === 'medium').length;
    const lowRisk = sessions.filter(s => s.risk_level === 'low').length;
    const vpnDetected = sessions.filter(s => s.is_vpn_detected === 1).length;

    return { total, highRisk, mediumRisk, lowRisk, vpnDetected };
  }, [sessions]);

  // Filter and sort sessions
  const filteredAndSortedSessions = useMemo(() => {
    let filtered = sessions.filter(session => {
      const matchesSearch = session.user_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           session.device_os.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           session.ip_country.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRisk = riskFilter === 'all' || session.risk_level === riskFilter;
      
      return matchesSearch && matchesRisk;
    });

    // Sort sessions
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'risk':
          const riskOrder = { high: 3, medium: 2, low: 1 };
          return riskOrder[b.risk_level] - riskOrder[a.risk_level];
        case 'user_id':
          return a.user_id.localeCompare(b.user_id);
        case 'timestamp':
        default:
          return new Date(b.timestamp || '').getTime() - new Date(a.timestamp || '').getTime();
      }
    });

    return filtered;
  }, [sessions, searchTerm, riskFilter, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor and analyze suspicious user sessions in real-time
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Sessions</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{statistics.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-red-200 dark:border-red-800">
            <div className="flex items-center">
              <AlertTriangle className="w-8 h-8 text-red-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">High Risk</p>
                <p className="text-2xl font-bold text-red-600">{statistics.highRisk}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-center">
              <BarChart3 className="w-8 h-8 text-yellow-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Medium Risk</p>
                <p className="text-2xl font-bold text-yellow-600">{statistics.mediumRisk}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-green-200 dark:border-green-800">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Low Risk</p>
                <p className="text-2xl font-bold text-green-600">{statistics.lowRisk}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center">
              <Filter className="w-8 h-8 text-purple-500" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">VPN Detected</p>
                <p className="text-2xl font-bold text-purple-600">{statistics.vpnDetected}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by user ID, device, or country..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <select
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={riskFilter}
                onChange={(e) => setRiskFilter(e.target.value as any)}
              >
                <option value="all">All Risk Levels</option>
                <option value="high">High Risk</option>
                <option value="medium">Medium Risk</option>
                <option value="low">Low Risk</option>
              </select>

              <select
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="risk">Sort by Risk</option>
                <option value="timestamp">Sort by Time</option>
                <option value="user_id">Sort by User ID</option>
              </select>
            </div>
          </div>
        </div>

        {/* Session Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedSessions.map((session, index) => (
            <SessionCard key={`${session.user_id}-${index}`} session={session} />
          ))}
        </div>

        {filteredAndSortedSessions.length === 0 && (
          <div className="text-center py-12">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No sessions found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};