import LoginForm from './LoginForm';
import SecurityBadges from './SecurityBadges';
import { Building2, Shield } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">SecureBank</h1>
                <p className="text-xs text-slate-500">Mobile Banking Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Secure Connection</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-8">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-2">Welcome Back</h2>
                <p className="text-blue-100">Sign in to your account to continue</p>
              </div>
            </div>

            {/* Card Body */}
            <div className="px-8 py-8">
              <LoginForm />
            </div>
          </div>

          {/* Security Badges */}
          <SecurityBadges />

          {/* Footer Links */}
          <div className="text-center mt-8 space-y-2">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                Sign up here
              </button>
            </p>
            <div className="flex justify-center gap-4 text-xs text-slate-500">
              <button className="hover:text-slate-700 transition-colors duration-200">
                Privacy Policy
              </button>
              <span>•</span>
              <button className="hover:text-slate-700 transition-colors duration-200">
                Terms of Service
              </button>
              <span>•</span>
              <button className="hover:text-slate-700 transition-colors duration-200">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-slate-400">
              © 2025 SecureBank. All rights reserved. Member FDIC.
            </p>
            <p className="text-xs text-slate-500 mt-1">
              This is a demo banking application for educational purposes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}