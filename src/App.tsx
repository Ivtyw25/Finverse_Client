import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import TransferPage from './components/TransferPage';
import "./index.css"
import { MouseSpeedProvider } from './context/MouseActivityContext';
import { TypingSpeedProvider } from './context/TypingSpeedContext';

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
