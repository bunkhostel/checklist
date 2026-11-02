import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  KeyRound,
  AlertCircle,
  Clock,
  CheckCircle2,
  Smartphone,
  Mail,
  Phone,
  UserPlus,
  Sparkles,
} from 'lucide-react';
import {
  authenticateUser,
  registerNewUser,
  DEFAULT_ADMIN_CREDENTIALS,
} from '../utils/userStorage';
import { AdminAuthSession } from '../types';

interface AdminLoginScreenProps {
  onLoginSuccess: (session: AdminAuthSession) => void;
  onSwitchToStaff: () => void;
}

export const AdminLoginScreen: React.FC<AdminLoginScreenProps> = ({
  onLoginSuccess,
  onSwitchToStaff,
}) => {
  // Mode: 'login' or 'register'
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Registration State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [regSuccessMessage, setRegSuccessMessage] = useState<string | null>(null);
  const [regErrorMessage, setRegErrorMessage] = useState<string | null>(null);

  // Handle Login Submit
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!password.trim()) {
      setErrorMessage('Please enter your secure password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = authenticateUser(email, password);
      setIsLoading(false);

      if (result.success && result.session) {
        onLoginSuccess(result.session);
      } else {
        setErrorMessage(result.error || 'Authentication failed. Please check credentials.');
      }
    }, 300);
  };

  // Handle Registration Submit (Requirement 2)
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegErrorMessage(null);
    setRegSuccessMessage(null);

    if (!regName.trim()) {
      setRegErrorMessage('Please enter your full name.');
      return;
    }
    if (!regEmail.trim() || !regEmail.includes('@')) {
      setRegErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!regPassword.trim() || regPassword.length < 4) {
      setRegErrorMessage('Password must be at least 4 characters long.');
      return;
    }
    if (!regPhone.trim()) {
      setRegErrorMessage('Please enter your contact phone number.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = registerNewUser({
        name: regName,
        email: regEmail,
        password: regPassword,
        phone: regPhone,
      });
      setIsLoading(false);

      if (res.success) {
        // Requirement 2: Show "Registration successful. Please wait for an admin to approve your account."
        setRegSuccessMessage(
          'Registration successful. Please wait for an admin to approve your account.'
        );
        // Clear registration fields
        setRegName('');
        setRegEmail('');
        setRegPassword('');
        setRegPhone('');
      } else {
        setRegErrorMessage(res.error || 'Registration failed. Please try again.');
      }
    }, 350);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-950 via-stone-900 to-stone-950 flex flex-col justify-center items-center px-4 py-8 text-stone-100 font-sans">
      <div className="w-full max-w-md space-y-5">
        {/* Top Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500 text-stone-950 font-black text-2xl shadow-lg shadow-amber-500/20 ring-4 ring-amber-500/20">
            B
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Bunk Hostel Portal
          </h1>
          <p className="text-xs sm:text-sm text-stone-400 font-medium">
            Admin Audit & User Management Portal
          </p>
        </div>

        {/* Card Box */}
        <div className="bg-stone-900/90 backdrop-blur-md rounded-3xl border border-stone-800 p-6 sm:p-8 shadow-2xl shadow-black/50 space-y-5">
          {/* Header Mode Switcher (Login vs Register) */}
          <div className="flex bg-stone-950/80 p-1 rounded-2xl border border-stone-800">
            <button
              type="button"
              id="tab-btn-signin"
              onClick={() => {
                setAuthMode('login');
                setErrorMessage(null);
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
                authMode === 'login'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Login</span>
            </button>

            <button
              type="button"
              id="tab-btn-register"
              onClick={() => {
                setAuthMode('register');
                setRegErrorMessage(null);
                setRegSuccessMessage(null);
              }}
              className={`flex-1 py-2 rounded-xl text-xs font-black transition flex items-center justify-center gap-1.5 ${
                authMode === 'register'
                  ? 'bg-amber-500 text-stone-950 shadow-md'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register New User</span>
            </button>
          </div>

          {/* ================= LOGIN FORM ================= */}
          {authMode === 'login' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                <div>
                  <h2 className="text-sm font-bold text-white leading-tight">Admin & Manager Sign In</h2>
                  <p className="text-[11px] text-stone-400">Enter your approved credentials</p>
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                  <Clock className="w-3 h-3" />
                  Session Auth
                </span>
              </div>

              {/* Error Banner */}
              {errorMessage && (
                <div className="bg-red-950/60 border border-red-500/40 rounded-2xl p-3 flex items-start gap-2.5 text-red-200 text-xs animate-shake">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <p className="font-semibold">{errorMessage}</p>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-3.5">
                {/* Email Address Field */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      id="admin-username-input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder=""
                      className="w-full pl-10 pr-4 py-2.5 bg-stone-950/80 border border-stone-700 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-medium transition"
                      autoComplete="email"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="admin-password-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 bg-stone-950/80 border border-stone-700 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 font-medium transition"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-500 hover:text-stone-300 transition"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Login Button */}
                <button
                  type="submit"
                  id="btn-admin-login-submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-95 disabled:opacity-50"
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin"></span>
                      Authenticating...
                    </span>
                  ) : (
                    <>
                      <span>Sign In to Admin Portal</span>
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </>
                  )}
                </button>
              </form>

              {/* Switch to Register link */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  id="link-register-toggle"
                  onClick={() => {
                    setAuthMode('register');
                    setRegErrorMessage(null);
                    setRegSuccessMessage(null);
                  }}
                  className="text-xs text-stone-400 hover:text-amber-300 transition"
                >
                  New staff or manager? <strong className="text-amber-400 underline">Register here</strong>
                </button>
              </div>
            </div>
          )}

          {/* ================= REGISTRATION FORM (Requirement 2) ================= */}
          {authMode === 'register' && (
            <div className="space-y-4">
              <div className="pb-2 border-b border-stone-800">
                <h2 className="text-sm font-bold text-white leading-tight">User Registration</h2>
                <p className="text-[11px] text-stone-400">
                  New accounts require administrator approval prior to login
                </p>
              </div>

              {/* Success Banner */}
              {regSuccessMessage && (
                <div className="bg-emerald-950/70 border border-emerald-500/40 rounded-2xl p-4 space-y-2 text-emerald-200 text-xs animate-fadeIn">
                  <div className="flex items-start gap-2.5 font-bold">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <p className="text-sm font-black text-emerald-300">{regSuccessMessage}</p>
                  </div>
                  <p className="text-[11px] text-emerald-100/80 leading-relaxed">
                    Your request is queued under <strong>Pending Approval</strong> in the Admin Dashboard.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('login');
                      setRegSuccessMessage(null);
                    }}
                    className="w-full mt-1 py-2 rounded-xl bg-emerald-500 text-stone-950 font-black text-xs hover:bg-emerald-400 transition"
                  >
                    Return to Login
                  </button>
                </div>
              )}

              {/* Error Banner */}
              {regErrorMessage && (
                <div className="bg-red-950/60 border border-red-500/40 rounded-2xl p-3 flex items-start gap-2.5 text-red-200 text-xs animate-shake">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <p className="font-semibold">{regErrorMessage}</p>
                </div>
              )}

              {!regSuccessMessage && (
                <form onSubmit={handleRegister} className="space-y-3">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="reg-name-input"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="e.g. Aakash Verma"
                        className="w-full pl-10 pr-4 py-2.5 bg-stone-950/80 border border-stone-700 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium transition"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        id="reg-email-input"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="e.g. aakash.verma@bunkhostel.in"
                        className="w-full pl-10 pr-4 py-2.5 bg-stone-950/80 border border-stone-700 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium transition"
                      />
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        id="reg-phone-input"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="e.g. +91 98765 43210"
                        className="w-full pl-10 pr-4 py-2.5 bg-stone-950/80 border border-stone-700 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium transition"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-1">
                    <label className="block text-xs font-bold text-stone-300 uppercase tracking-wider">
                      Password *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-500">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <input
                        type={showRegPassword ? 'text' : 'password'}
                        id="reg-password-input"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Choose a secure password"
                        className="w-full pl-10 pr-10 py-2.5 bg-stone-950/80 border border-stone-700 rounded-xl text-sm text-white placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium transition"
                      />
                      <button
                        type="button"
                        onClick={() => setShowRegPassword(!showRegPassword)}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-500 hover:text-stone-300 transition"
                      >
                        {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    id="btn-register-submit"
                    disabled={isLoading}
                    className="w-full mt-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition active:scale-95 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-stone-950 border-t-transparent rounded-full animate-spin"></span>
                        Registering...
                      </span>
                    ) : (
                      <>
                        <span>Submit Registration Request</span>
                        <UserPlus className="w-4 h-4 stroke-[2.5]" />
                      </>
                    )}
                  </button>
                </form>
              )}

              {/* Back to Login link */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  id="link-signin-toggle"
                  onClick={() => {
                    setAuthMode('login');
                    setRegErrorMessage(null);
                    setRegSuccessMessage(null);
                  }}
                  className="text-xs text-stone-400 hover:text-amber-300 transition"
                >
                  Already have an approved account? <strong className="text-amber-400 underline">Sign In</strong>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Switcher: Back to Staff Checklist */}
        <div className="text-center">
          <button
            type="button"
            onClick={onSwitchToStaff}
            className="inline-flex items-center gap-2 text-xs font-bold text-stone-400 hover:text-amber-400 transition"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>← Switch to Staff Housekeeping App</span>
          </button>
        </div>
      </div>
    </div>
  );
};

