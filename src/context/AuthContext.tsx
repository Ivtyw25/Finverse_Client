import { createContext, useContext, useState, useEffect, useRef} from 'react';
import type { ReactNode } from 'react';
import type { User, Account, Transaction } from '../types';
import { useMouseSpeed } from './MouseActivityContext';
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  accounts: Account[];
  recentTransactions: Transaction[];
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loginTime: Date | null;
  loginDay: number | null;
  session_seconds: number | 0;
  loginHour: number | null;
  endSession: () => void;
  deviceID: string | null;
  navPath: string;
  navPathDepth: number
  resetNavPath: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data
const mockUser: User = {
  id: '1',
  name: 'Ivan',
  username: 'ivtyw127',
  password: "Ivantham123@123",
};

const mockAccounts: Account[] = [
  {
    id: '1',
    type: 'savings',
    balance: 6584.14,
    accountNumber: '****7467',
    name: "current savings"
  },
];

const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'transfer',
    amount: -500.00,
    description: 'Transfer to Sarah Johnson',
    date: '2025-01-15',
    status: 'completed',
    recipient: 'Sarah Johnson'
  },
  {
    id: '2',
    type: 'payment',
    amount: -125.50,
    description: 'Electric Bill Payment',
    date: '2025-01-14',
    status: 'completed'
  },
  {
    id: '3',
    type: 'deposit',
    amount: 2500.00,
    description: 'Salary Deposit',
    date: '2025-01-13',
    status: 'completed'
  },
  {
    id: '4',
    type: 'payment',
    amount: -89.99,
    description: 'Internet Bill',
    date: '2025-01-12',
    status: 'completed'
  }
];

function getOrCreateDeviceId(): string {
    let deviceID = localStorage.getItem('device_id');
    if (!deviceID){
        deviceID = uuidv4();
        localStorage.setItem('device_id', deviceID)
    }
    return deviceID
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const {resetSpeeds, movementSpeeds, averageSpeed} = useMouseSpeed();
  const [user, setUser] = useState<User | null>(null);
  const [accounts] = useState<Account[]>(mockAccounts);
  const [recentTransactions] = useState<Transaction[]>(mockTransactions);
  const [loginTime, setLoginTime] = useState<Date | null>(null);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [loginDay, setLoginDay] = useState<number | null>(null);
  const [loginHour, setLoginHour] = useState<number | null>(null);
  const [session_seconds, setSession] = useState<number | 0>(0);
  const location = useLocation();
  const [navPath, setNavPath] = useState<string>('');
  const [navPathHistory, setNavPathHistory] = useState<string[]>(['login']);
  const [navPathDepth, setNavPathDepth] = useState<number>(0);




  const login = async (username: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    if (username && password) {
      setUser(mockUser);
      const device = getOrCreateDeviceId();
      setDeviceId(device);
      const now = new Date();
      setLoginTime(now);
      const dayOfLogin = new Date().getDay();
      setLoginDay(dayOfLogin);
      const hour = now.getHours();     
      const minute = now.getMinutes(); 
      const numericTime = hour * 100 + minute;
      setLoginHour(numericTime)
      
      return true;
    }
    return false;
  };

  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const currentPath = location.pathname.replace('/','')
    if (navPathHistory.length === 0 || navPathHistory[navPathHistory.length - 1] !== currentPath) {
      setNavPathHistory((prevHistory) => {
        const newHistory = [...prevHistory, currentPath];
        return newHistory;
      });
    }
  }, [location]); // Re-run this effect when the location changes

  useEffect(() => {
    if (navPathHistory.length > 0) {
      setNavPath(navPathHistory.join('>'));
      setNavPathDepth(navPathHistory.length);
    } else {
      setNavPath('');
      setNavPathDepth(0);
    }
  }, [navPathHistory]);

  const endSession = () => {
    if (loginTime) {
      const endTime = new Date();
      const sessionDurationMs = endTime.getTime() - loginTime.getTime();
      const seconds = Math.floor((sessionDurationMs / 1000) % 60);
      setSession(seconds)

      console.log("Average Mouse Speed:", averageSpeed);
      console.log("Movement Speeds:", movementSpeeds);
      setLoginTime(null);
      resetSpeeds();
      console.log("device id is " + deviceId);
      console.log("login day: " + loginDay)
    } else {
      console.warn("Session has not started yet.");
    }
  };

  const resetNavPath = () => {
    setNavPathHistory([]);
  };

  const logout = () => {
    setUser(null);
    setLoginTime(null);
    console.log("User logged out.");
  };

  return (
    <AuthContext.Provider value={{
      user,
      navPath,
      accounts,
      recentTransactions,
      isAuthenticated: !!user,
      login,
      logout,
      loginTime,
      endSession,
      deviceID: deviceId,
      loginDay,
      loginHour,
      session_seconds,
      resetNavPath,
      navPathDepth
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
