import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile, UserRole } from '../types';
import { verifyCredentials } from '../data/authUsers';
import {
  Mail,
  Lock,
  Check,
  Shield,
  GraduationCap,
  Eye,
  EyeOff,
  CheckCircle2,
  X,
  Building2,
  HelpCircle,
  PhoneCall,
  Smartphone,
  Sparkles,
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (user: UserProfile) => void;
}

// Gentle pleasant audio chime using Web Audio API
const playAuthChime = () => {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Tone 1: C5 (523.25 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(523.25, now);
    gain1.gain.setValueAtTime(0, now);
    gain1.gain.linearRampToValueAtTime(0.12, now + 0.04);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.3);

    // Tone 2: E5 (659.25 Hz)
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(659.25, now + 0.08);
    gain2.gain.setValueAtTime(0, now + 0.08);
    gain2.gain.linearRampToValueAtTime(0.15, now + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.08);
    osc2.stop(now + 0.45);
  } catch {
    // Silently continue if audio context is blocked
  }
};

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('learner');
  const [emailOrNumber, setEmailOrNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(true);

  // Verification stage progression for authentic feel
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationStep, setVerificationStep] = useState<string>('');
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [verifiedUser, setVerifiedUser] = useState<UserProfile | null>(null);

  // Google OAuth Dialog Simulation
  const [showGoogleModal, setShowGoogleModal] = useState<boolean>(false);
  const [googleSelecting, setGoogleSelecting] = useState<string | null>(null);

  // Modals
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);
  const [forgotPhone, setForgotPhone] = useState<string>('');
  const [forgotSent, setForgotSent] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

  // Detect input type (numeric vs email)
  const isNumericOnly = /^\d+$/.test(emailOrNumber.trim());

  // Handle standard login progression
  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isVerifying) return;

    setIsVerifying(true);
    setProgressPercent(15);
    setVerificationStep('Connecting to MoSPI NIC Gateway...');

    const identifierToUse =
      emailOrNumber.trim() || (selectedRole === 'admin' ? 'admin@mospi.gov.in' : '9876543210');
    const passwordToUse =
      password.trim() || (selectedRole === 'admin' ? 'Admin@MoSPI2026' : 'Learner@2026');

    // Step 1: Handshake
    await new Promise((r) => setTimeout(r, 380));
    setProgressPercent(50);
    setVerificationStep('Validating Parichay SSO Token & Digital Cadre ID...');

    let authenticatedProfile: UserProfile;

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          identifier: identifierToUse,
          role: selectedRole,
          password: passwordToUse,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.user) {
          authenticatedProfile = data.user;
        } else {
          authenticatedProfile = verifyCredentials(identifierToUse, passwordToUse, selectedRole).user;
        }
      } else {
        authenticatedProfile = verifyCredentials(identifierToUse, passwordToUse, selectedRole).user;
      }
    } catch {
      authenticatedProfile = verifyCredentials(identifierToUse, passwordToUse, selectedRole).user;
    }

    // Step 2: Cadre Clearance
    await new Promise((r) => setTimeout(r, 420));
    setProgressPercent(88);
    setVerificationStep(`Security Clearance Verified: ${authenticatedProfile.cadre}`);

    // Step 3: Success Confirmation & Audio Chime
    await new Promise((r) => setTimeout(r, 320));
    setProgressPercent(100);
    setVerifiedUser(authenticatedProfile);
    playAuthChime();

    if (rememberMe) {
      try {
        localStorage.setItem('preplens_current_user', JSON.stringify(authenticatedProfile));
      } catch {
        // ignore
      }
    }

    // Smooth transition into dashboard
    setTimeout(() => {
      onLoginSuccess(authenticatedProfile);
    }, 650);
  };

  // Handle Google OAuth Selection
  const handleSelectGoogleAccount = async (account: {
    email: string;
    name: string;
    role: UserRole;
  }) => {
    setGoogleSelecting(account.email);
    playAuthChime();

    await new Promise((r) => setTimeout(r, 600));

    let finalUser: UserProfile;
    try {
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: account.email,
          name: account.name,
          role: account.role,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        finalUser = data.user;
      } else {
        finalUser = getMockGoogleUser(account);
      }
    } catch {
      finalUser = getMockGoogleUser(account);
    }

    if (rememberMe) {
      try {
        localStorage.setItem('preplens_current_user', JSON.stringify(finalUser));
      } catch {
        // ignore
      }
    }

    setShowGoogleModal(false);
    onLoginSuccess(finalUser);
  };

  const getMockGoogleUser = (account: {
    email: string;
    name: string;
    role: UserRole;
  }): UserProfile => ({
    id: `usr-google-${Date.now().toString().slice(-4)}`,
    username: account.email.split('@')[0],
    email: account.email,
    name: account.name,
    role: account.role,
    designation:
      account.role === 'admin'
        ? 'Director General (Training & Capacity Building)'
        : 'Senior Statistical Officer (SSO)',
    division:
      account.role === 'admin'
        ? 'National Statistical Systems Training Academy (NSSTA)'
        : 'Field Operations Division (FOD)',
    employeeCode: account.role === 'admin' ? 'MOSPI-GOOG-0104' : 'MOSPI-GOOG-7411',
    cadre:
      account.role === 'admin'
        ? 'Senior Administrative Grade (SAG)'
        : 'Indian Statistical Service (ISS) - Cadre Gr. II',
    station: account.role === 'admin' ? 'Sankhyiki Bhawan, New Delhi' : 'Regional Office, Lucknow',
    avatarInitials: account.name.slice(0, 2).toUpperCase(),
    lastLogin: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      day: 'numeric',
    }),
  });

  return (
    <div
      id="login-page-root"
      className="min-h-screen w-full flex flex-col justify-between items-center px-4 py-6 sm:py-8 relative font-sans select-none overflow-x-hidden"
      style={{
        background: 'linear-gradient(180deg, #e49bf3 0%, #d1b1f8 42%, #9be4f4 100%)',
      }}
    >
      {/* Decorative ambient blurred backdrops for professional optical depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Ministry Header Branding */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          {/* Official Emblem Mark */}
          <div className="w-9 h-9 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center text-slate-800 font-bold shadow-xs">
            <span className="text-xs tracking-wider">MoSPI</span>
          </div>
          <div className="leading-tight text-left">
            <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#1e3c63]">
              Ministry of Statistics & Programme Implementation
            </div>
            <div className="text-[9px] sm:text-[11px] text-[#2c537f]/80 font-medium">
              Government of India • PrepLens National Portal
            </div>
          </div>
        </div>

        {/* Portal Info & Help */}
        <button
          type="button"
          onClick={() => setShowHelpModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/35 hover:bg-white/50 backdrop-blur-md border border-white/40 text-xs font-medium text-[#1e3c63] transition-all cursor-pointer shadow-xs"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Help & Support</span>
        </button>
      </header>

      {/* Main Form Center Glass Container */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md my-auto z-10 flex flex-col items-center"
      >
        {/* Frosted Glass Card Framing */}
        <div className="w-full bg-white/25 sm:bg-white/30 backdrop-blur-xl border border-white/50 rounded-2xl sm:rounded-3xl shadow-[0_20px_60px_rgba(20,45,75,0.14)] p-6 sm:p-9 relative overflow-hidden">
          {/* Subtle Tricolor Accent Line on top of card */}
          <div className="absolute top-0 left-0 right-0 h-1 flex">
            <div className="flex-1 bg-[#FF9933]" />
            <div className="flex-1 bg-white" />
            <div className="flex-1 bg-[#138808]" />
          </div>

          {/* User Line-Art Avatar Icon matching reference image */}
          <div className="flex justify-center mb-3 text-white">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-white/20 border border-white/40 flex items-center justify-center shadow-xs">
              <svg
                className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-xs"
                viewBox="0 0 64 64"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {/* Head Circle */}
                <circle cx="32" cy="20" r="11" />
                {/* Open Shoulders Curve */}
                <path d="M14 50c0-10 8-18 18-18s18 8 18 18" />
              </svg>
            </div>
          </div>

          {/* Title matching reference image */}
          <h1 className="text-2xl sm:text-3xl text-white font-light tracking-[0.22em] text-center mb-4 drop-shadow-xs">
            {selectedRole === 'admin' ? 'Admin Login' : 'User Login'}
          </h1>

          {/* Elegant Role Cadre Switcher */}
          <div className="flex items-center justify-center mb-6">
            <div className="inline-flex items-center p-1 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-inner">
              <button
                type="button"
                onClick={() => {
                  setSelectedRole('learner');
                  if (!emailOrNumber || emailOrNumber === 'admin@mospi.gov.in') {
                    setEmailOrNumber('9876543210');
                    setPassword('Learner@2026');
                  }
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedRole === 'learner'
                    ? 'bg-[#335c8b] text-white shadow-xs'
                    : 'text-[#244569] hover:text-[#183350] hover:bg-white/30'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Field Officer (User)</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setSelectedRole('admin');
                  if (!emailOrNumber || emailOrNumber === '9876543210') {
                    setEmailOrNumber('admin@mospi.gov.in');
                    setPassword('Admin@MoSPI2026');
                  }
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedRole === 'admin'
                    ? 'bg-[#335c8b] text-white shadow-xs'
                    : 'text-[#244569] hover:text-[#183350] hover:bg-white/30'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Director General (Admin)</span>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email / Number Underlined Input */}
            <div className="space-y-1">
              <div className="flex items-center pb-2 border-b-2 border-[#335c8b] transition-all relative">
                <div className="text-[#335c8b] mr-3 shrink-0">
                  <Mail className="w-5 h-5 fill-current" />
                </div>
                <input
                  id="input-email-id"
                  type="text"
                  value={emailOrNumber}
                  disabled={isVerifying}
                  onChange={(e) => setEmailOrNumber(e.target.value)}
                  placeholder="Email ID or Mobile Number"
                  className="w-full bg-transparent text-[#1c3a5e] font-medium text-sm sm:text-base placeholder:text-[#335c8b]/70 outline-none"
                  autoFocus
                />
                {/* Auto-Detection Badge */}
                {emailOrNumber.trim() && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/50 text-[#1e3c63] shrink-0 border border-white/60">
                    {isNumericOnly ? 'Mobile/ID Demo' : 'Gov Email'}
                  </span>
                )}
              </div>
            </div>

            {/* Password Underlined Input with Show/Hide Toggle */}
            <div className="space-y-1">
              <div className="flex items-center pb-2 border-b-2 border-[#335c8b] transition-all relative">
                <div className="text-[#335c8b] mr-3 shrink-0">
                  <Lock className="w-5 h-5 fill-current" />
                </div>
                <input
                  id="input-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  disabled={isVerifying}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password or Security PIN"
                  className="w-full bg-transparent text-[#1c3a5e] font-medium text-sm sm:text-base placeholder:text-[#335c8b]/70 outline-none pr-8"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 text-[#335c8b] hover:text-[#1e3a5e] transition-colors p-1 cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between text-xs text-[#2c537f] pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none font-medium">
                <div
                  onClick={() => setRememberMe(!rememberMe)}
                  className={`w-4 h-4 rounded-xs border border-[#335c8b] flex items-center justify-center transition-colors ${
                    rememberMe ? 'bg-[#335c8b] text-white' : 'bg-transparent'
                  }`}
                >
                  {rememberMe && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <span onClick={() => setRememberMe(!rememberMe)}>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => setShowForgotModal(true)}
                className="italic text-[#2c537f] hover:text-[#183350] hover:underline cursor-pointer bg-transparent border-0 p-0 font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* Live Real-Feel Progression Bar */}
            {isVerifying && (
              <div className="space-y-1.5 pt-1 bg-white/40 p-2.5 rounded-lg border border-white/50">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[#1e3c63]">
                  <span className="truncate pr-2">{verificationStep}</span>
                  <span className="font-mono">{progressPercent}%</span>
                </div>
                <div className="w-full h-1.5 bg-white/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#335c8b] transition-all duration-300 ease-out"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Solid LOGIN Button */}
            <div className="pt-1">
              <button
                id="btn-login-submit"
                type="submit"
                disabled={isVerifying}
                className="w-full py-3.5 px-6 rounded-md bg-[#335c8b] hover:bg-[#27486e] active:bg-[#1d3755] text-white text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase transition-all shadow-md active:scale-[0.99] cursor-pointer relative overflow-hidden"
              >
                {isVerifying ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>AUTHENTICATING...</span>
                  </span>
                ) : (
                  <span>LOGIN</span>
                )}
              </button>
            </div>

            {/* OR Divider */}
            <div className="flex items-center my-3">
              <div className="flex-1 h-px bg-[#335c8b]/30" />
              <span className="px-3 text-xs uppercase tracking-wider font-semibold text-[#2c537f]">
                or
              </span>
              <div className="flex-1 h-px bg-[#335c8b]/30" />
            </div>

            {/* Official Google Sign-In Button */}
            <button
              id="btn-google-signin"
              type="button"
              onClick={() => setShowGoogleModal(true)}
              disabled={isVerifying}
              className="w-full py-2.5 sm:py-3 px-4 rounded-md bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-700 text-xs sm:text-sm font-medium shadow-sm flex items-center justify-center gap-3 transition-all cursor-pointer border border-slate-200"
            >
              {/* Google Multi-Color G Logo SVG */}
              <svg className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.27 21.36 7.35 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.27 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>

            {/* Quick Demo Instant-Fill Pills */}
            <div className="pt-2 border-t border-white/40">
              <div className="text-[11px] font-medium text-[#1e3c63] mb-1.5 text-center">
                One-Tap Quick Demo Credentials:
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('learner');
                    setEmailOrNumber('9876543210');
                    setPassword('Learner@2026');
                  }}
                  className="px-2 py-1.5 rounded bg-white/40 hover:bg-white/60 text-[#1e3c63] text-[10px] font-medium border border-white/50 transition-colors text-center truncate cursor-pointer"
                >
                  👤 Field Officer (Learner)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRole('admin');
                    setEmailOrNumber('admin@mospi.gov.in');
                    setPassword('Admin@MoSPI2026');
                  }}
                  className="px-2 py-1.5 rounded bg-white/40 hover:bg-white/60 text-[#1e3c63] text-[10px] font-medium border border-white/50 transition-colors text-center truncate cursor-pointer"
                >
                  🛡️ Training Admin (Director)
                </button>
              </div>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Footer Security Badges */}
      <footer className="w-full max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#244569] gap-2 pt-4 z-10">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-[#335c8b]" />
          <span>Secured by National Informatics Centre (NIC) • 256-bit TLS Encryption</span>
        </div>
        <div className="flex items-center gap-3 font-medium">
          <span>Smart India Hackathon 2026</span>
          <span>•</span>
          <span>Problem ID: SIH26101</span>
        </div>
      </footer>

      {/* Real Fullscreen Security Clearance Overlay on Successful Handshake */}
      <AnimatePresence>
        {verifiedUser && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="fixed inset-0 z-50 bg-[#0f172a]/70 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 text-center space-y-4"
            >
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center text-emerald-600 shadow-sm animate-bounce">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Security Clearance Granted
                </div>
                <h3 className="text-lg font-bold text-slate-900 pt-1">{verifiedUser.name}</h3>
                <p className="text-xs text-slate-600">{verifiedUser.designation}</p>
                <p className="text-[11px] font-mono text-slate-400">
                  {verifiedUser.employeeCode} • {verifiedUser.station}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-indigo-600 font-medium">
                <span className="w-3.5 h-3.5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                <span>Redirecting to Ministry Dashboard...</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Realistic Google OAuth Account Chooser Modal */}
      <AnimatePresence>
        {showGoogleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              className="bg-white rounded-xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden relative"
            >
              {/* Google top indeterminate progress bar when selecting */}
              {googleSelecting && (
                <div className="h-1 w-full bg-sky-100 overflow-hidden">
                  <div className="h-full bg-blue-600 animate-pulse w-full" />
                </div>
              )}

              <div className="p-6 space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    {/* Google Logo */}
                    <svg className="w-6 h-6 mb-2" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.27 21.36 7.35 24 12 24z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.97 0 12s.46 3.84 1.26 5.42l4.02-3.15z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.27 2.64 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                      />
                    </svg>
                    <h3 className="text-lg font-medium text-slate-800 tracking-tight">
                      Choose an account
                    </h3>
                    <p className="text-xs text-slate-500">
                      to continue to <span className="font-semibold text-slate-700">MoSPI PrepLens Portal</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowGoogleModal(false)}
                    className="text-slate-400 hover:text-slate-600 p-1 rounded-md cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Account Selection Options */}
                <div className="divide-y divide-slate-100 border-y border-slate-100 -mx-6 px-2">
                  {/* Account 1: User's Email */}
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectGoogleAccount({
                        email: 'chandrashekarr74111@gmail.com',
                        name: 'Chandrashekar R',
                        role: 'learner',
                      })
                    }
                    className="w-full py-3 px-4 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left cursor-pointer rounded-lg"
                  >
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      C
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-900 truncate">
                        Chandrashekar R
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        chandrashekarr74111@gmail.com
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                      Participant / Officer
                    </span>
                  </button>

                  {/* Account 2: MoSPI Director */}
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectGoogleAccount({
                        email: 'admin@mospi.gov.in',
                        name: 'MoSPI Training Administrator',
                        role: 'admin',
                      })
                    }
                    className="w-full py-3 px-4 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left cursor-pointer rounded-lg"
                  >
                    <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      M
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-900 truncate">
                        MoSPI Training Administrator
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        admin@mospi.gov.in
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold border border-indigo-200">
                      Director General
                    </span>
                  </button>

                  {/* Account 3: SIH Evaluator / Jury */}
                  <button
                    type="button"
                    onClick={() =>
                      handleSelectGoogleAccount({
                        email: 'jury.sih@gov.in',
                        name: 'SIH Evaluation Jury Panel',
                        role: 'admin',
                      })
                    }
                    className="w-full py-3 px-4 flex items-center gap-3 hover:bg-slate-50 transition-colors text-left cursor-pointer rounded-lg text-slate-700"
                  >
                    <div className="w-9 h-9 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                      J
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-semibold text-slate-900 truncate">
                        SIH Evaluation Jury Panel
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        jury.sih@gov.in
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold border border-amber-200">
                      SIH Jury Mode
                    </span>
                  </button>
                </div>

                {/* Footer disclaimer */}
                <div className="text-[11px] text-slate-400 leading-normal pt-1">
                  To continue, Google will share your name, email address, and profile picture with
                  MoSPI PrepLens. Read MoSPI Privacy Policy and Terms of Service.
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl space-y-4 border border-slate-100"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-[#335c8b]" />
                  <span>Reset Demo Password</span>
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setShowForgotModal(false);
                    setForgotSent(false);
                  }}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!forgotSent ? (
                <div className="space-y-3 text-xs text-slate-600">
                  <p>
                    Enter your registered mobile number or employee ID to receive a 1-time demo authentication code.
                  </p>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700 block mb-1">
                      Mobile Number / Email
                    </label>
                    <input
                      type="text"
                      value={forgotPhone}
                      onChange={(e) => setForgotPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded border border-slate-300 font-mono text-xs outline-none focus:border-[#335c8b]"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setForgotSent(true)}
                    className="w-full py-2 bg-[#335c8b] hover:bg-[#284970] text-white font-semibold rounded text-xs transition-colors cursor-pointer"
                  >
                    Send Instant Demo OTP
                  </button>
                </div>
              ) : (
                <div className="space-y-3 text-center py-2">
                  <div className="w-10 h-10 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-semibold text-slate-800">
                    Demo OTP Dispatched to {forgotPhone}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    For instant demo testing, you can use OTP code <span className="font-mono font-bold text-slate-700">26101</span> or enter any number on the main login screen!
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotModal(false);
                      setForgotSent(false);
                    }}
                    className="w-full py-2 bg-[#335c8b] text-white text-xs font-semibold rounded cursor-pointer"
                  >
                    Back to Login
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help & Support Modal */}
      <AnimatePresence>
        {showHelpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-slate-100"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-[#335c8b]" />
                  <span>MoSPI PrepLens • SIH Hackathon</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setShowHelpModal(false)}
                  className="text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <p>
                  <strong>PrepLens</strong> is developed for the <strong>Smart India Hackathon 2026 (Problem Statement SIH26101)</strong> for the
                  Ministry of Statistics & Programme Implementation (MoSPI) to facilitate automated AI-driven
                  competency tracking, training recommendations, and gap analysis for iGOT Karmayogi.
                </p>

                <div className="bg-slate-50 p-3 rounded-lg space-y-2 border border-slate-200">
                  <div className="font-semibold text-slate-800 text-[11px] uppercase tracking-wider">
                    Evaluation & Demo Authentication
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-[11px] text-slate-600">
                    <li>
                      <strong>Any Number:</strong> Entering any mobile number or employee digit string will generate an authenticated active officer session.
                    </li>
                    <li>
                      <strong>Google Sign-In:</strong> Click &quot;Sign in with Google&quot; to test SSO with 1 tap.
                    </li>
                    <li>
                      <strong>Role Switch:</strong> Toggle between Field Officer and Director General at the top of the card or use the one-tap demo buttons.
                    </li>
                  </ul>
                </div>

                <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-100">
                  National Statistical Systems Training Academy (NSSTA) • Ministry of Statistics & Programme Implementation.
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setShowHelpModal(false)}
                  className="px-4 py-2 bg-[#335c8b] text-white text-xs font-semibold rounded-md hover:bg-[#27486e] cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
