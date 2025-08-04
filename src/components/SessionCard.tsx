import React from 'react';
import type { SessionData } from '../types';
import { RiskBadge } from './RiskBadge';
import { 
  Monitor, 
  Clock, 
  MousePointer, 
  Globe, 
  MapPin,
  Timer,
} from 'lucide-react';

interface SessionCardProps {
  session: SessionData;
}

export const SessionCard: React.FC<SessionCardProps> = ({ session }) => {
  const formatLoginTime = (hour: number) => {
    const hourStr = hour.toString().padStart(4, '0');
    const h = parseInt(hourStr.substring(0, 2));
    const m = parseInt(hourStr.substring(2, 4));
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const getDayOfWeek = (day: number) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day] || 'Unknown';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {session.user_id}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {session.timestamp || 'Recent session'}
          </p>
        </div>
        <RiskBadge risk={session.risk_level} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Monitor className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Device</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{session.device_os}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Login Time</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {formatLoginTime(session.login_hour)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">{session.ip_country}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Timer className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {formatDuration(session.session_duration_sec)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MousePointer className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Typing Speed</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {session.typing_speed_cpm} CPM
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400">Geo Distance</p>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {session.geo_distance_from_usual}km
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">IP Consistency:</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {(session.ip_consistency_score * 100).toFixed(0)}%
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">VPN:</span>
            <span className={`font-medium ${session.is_vpn_detected ? 'text-red-600' : 'text-green-600'}`}>
              {session.is_vpn_detected ? 'Detected' : 'None'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Device Change:</span>
            <span className={`font-medium ${session.recent_device_change ? 'text-yellow-600' : 'text-gray-900 dark:text-white'}`}>
              {session.recent_device_change ? 'Yes' : 'No'}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 dark:text-gray-400">Failed Logins:</span>
            <span className={`font-medium ${session.failed_login_attempts_last_24h > 0 ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
              {session.failed_login_attempts_last_24h}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};