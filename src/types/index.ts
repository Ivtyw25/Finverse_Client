export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
}

export interface Account {
  id: string;
  type: 'checking' | 'savings' | 'credit';
  balance: number;
  accountNumber: string;
  name: string;
}

export interface Transaction {
  id: string;
  type: 'transfer' | 'payment' | 'deposit' | 'withdrawal';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  recipient?: string;
}

export interface QuickAction {
  id: string;
  title: string;
  icon: any;
  description: string;
  action: string;
}

export interface TransferFormData {
  bank: string;
  accountNumber: string;
  accountType: string;
  amount: string;
  reference: string;
  description: string;
};

export type BankOption = {
  label: string;
  value: string;
};

export const bankOptions: BankOption[] = [
  { label: 'Maybank', value: 'maybank' },
  { label: 'CIMB', value: 'cimb' },
  { label: 'Public Bank', value: 'public_bank' },
  { label: 'RHB Bank', value: 'rhb' },
  { label: 'Bank Islam', value: 'bank islam' },
  { label: 'HSBC Bank', value: 'hsbc' },
  { label: 'AM Bank', value: 'am bank' },
  { label: 'Standard Chartered Bank', value: 'standard chatered bank' },
];

export interface SessionData {
  user_id: string;
  device_os: string;
  login_hour: number;
  typing_speed_cpm: number;
  nav_path: string;
  nav_path_depth: number;
  ip_country: string;
  session_duration_sec: number;
  mouse_movement_rate: number;
  device_id: string;
  ip_consistency_score: number;
  login_day_of_week: number;
  geo_distance_from_usual: number;
  browser_language: string;
  failed_login_attempts_last_24h: number;
  is_vpn_detected: number;
  recent_device_change: number;
  risk_level: 'high' | 'medium' | 'low';
  timestamp?: string;
}

export interface DashboardProps {
  sessions: SessionData[];
  title?: string;
}