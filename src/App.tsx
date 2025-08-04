import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import TransferPage from './components/TransferPage';
import "./index.css"
import { MouseSpeedProvider } from './context/MouseActivityContext';
import { TypingSpeedProvider } from './context/TypingSpeedContext';
import MobileRechargePage from './components/MobileRecharge';
import { ClientDashboard } from './components/ClientDashboard';

const sampleSessions: SessionData[] = [
  {
    user_id: "ivantham789@gmail.com",
    device_os: "Windows",
    login_hour: 2110,
    typing_speed_cpm: 35,
    nav_path: "login>>dashboard>transfer>dashboard>reload",
    nav_path_depth: 5,
    ip_country: "MY",
    session_duration_sec: 89,
    mouse_movement_rate: 15.2,
    device_id: "device_A",
    ip_consistency_score: 0.92,
    login_day_of_week: 1,
    geo_distance_from_usual: 12.4,
    browser_language: "en-US",
    failed_login_attempts_last_24h: 0,
    is_vpn_detected: 0,
    recent_device_change: 1,
    risk_level: "medium",
    timestamp: "2025-01-27T21:10:00Z"
  },
    {
    user_id: "ivantham789@gmail.com",
    device_os: "Windows",
    login_hour: 2200,
    typing_speed_cpm: 78,
    nav_path: "login>>dashboard>transfer",
    nav_path_depth: 5,
    ip_country: "MY",
    session_duration_sec: 23,
    mouse_movement_rate: 35.2,
    device_id: "device_A",
    ip_consistency_score: 0.93,
    login_day_of_week: 1,
    geo_distance_from_usual: 1,
    browser_language: "en-US",
    failed_login_attempts_last_24h: 0,
    is_vpn_detected: 0,
    recent_device_change: 1,
    risk_level: "medium",
    timestamp: "2025-08-04T21:10:00Z"
  }
];


function AppContent() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transfer" element={<TransferPage />} />
        <Route path="/recharge" element={<MobileRechargePage />} />
        <Route path="/Logs" element={<ClientDashboard sessions={sampleSessions} />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <TypingSpeedProvider>
      <MouseSpeedProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </MouseSpeedProvider>
    </TypingSpeedProvider>
  );
}

export default App;
