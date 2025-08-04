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