import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { validateEmail, validatePassword } from '../../utils/validation';
import { Lock, Mail, ShieldCheck, KeyRound, Sparkles, AlertCircle } from 'lucide-react';

export const LoginPage = () => {
  const { login, isLoading, authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect destination after successful login (Experiment 4 topic e)
  const from = location.state?.from?.pathname || '/reservations';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleFillDemo = () => {
    setEmail('student@university.edu');
    setPassword('Secret123!');
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation (Experiment 4 topic f)
    const errs = {};
    const emailErr = validateEmail(email);
    if (emailErr) errs.email = emailErr;

    const passErr = validatePassword(password);
    if (passErr) errs.password = passErr;

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const result = await login(email, password);
    if (result.success) {
      // Redirect back to protected route or reservations
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="w-14 h-14 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl text-white mb-3">
          <Lock className="w-7 h-7" />
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          Sign In to Your Account
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Experiment 4 & 8: Controlled Form, JWT Token Simulation & Protected Route Guards
        </p>

        {location.state?.from && (
          <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 text-xs flex items-center justify-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>You must log in to access <strong>{location.state.from.pathname}</strong></span>
          </div>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-slate-800/90 backdrop-blur-md py-8 px-6 sm:px-10 shadow-2xl rounded-3xl border border-slate-700 space-y-6">
          {authError && (
            <div className="p-3 bg-rose-500/20 border border-rose-500/40 rounded-xl text-xs text-rose-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <Input
                label="Email / Username"
                type="email"
                required
                icon={Mail}
                placeholder="student@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                className="text-white"
              />
            </div>

            <div>
              <Input
                label="Password"
                type="password"
                required
                icon={KeyRound}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full shadow-lg shadow-indigo-500/20"
              isLoading={isLoading}
            >
              Sign In (Generate Token)
            </Button>
          </form>

          {/* Quick Demo Credentials */}
          <div className="pt-4 border-t border-slate-700/80">
            <button
              type="button"
              onClick={handleFillDemo}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-700/60 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Auto-Fill Test Credentials</span>
            </button>
          </div>

          <div className="text-center text-xs text-slate-400 pt-2">
            <Link to="/" className="text-indigo-400 hover:text-indigo-300 font-medium">
              ← Return to Hotel Booking Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
