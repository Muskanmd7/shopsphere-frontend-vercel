import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Eye, EyeOff, UserPlus, CheckCircle } from 'lucide-react';
import api from "../services/api";
export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.includes('@')) e.email = 'Valid email required';
    if (form.password.length < 6) e.password = 'Min 6 characters';
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match';
    return e;
  };

  const handleSubmit = async (e) => {

  e.preventDefault();

  const errs = validate();

  if (Object.keys(errs).length) {
    setErrors(errs);
    return;
  }

  setErrors({});
  setLoading(true);

  try {

    await api.post("/register", {

      username: form.name,
      email: form.email,
      password: form.password,
      role: "USER"

    });

    alert("Registration Successful!");

    navigate("/login");

  } catch (error) {

    console.error(error);

    alert("Registration Failed!");

  } finally {

    setLoading(false);

  }

};

  const passwordStrength = () => {
    const p = form.password;
    if (!p) return null;
    if (p.length < 6) return { label: 'Weak', color: 'bg-blush-400', width: '33%' };
    if (p.length < 10) return { label: 'Fair', color: 'bg-amber-400', width: '66%' };
    return { label: 'Strong', color: 'bg-sage-500', width: '100%' };
  };
  const strength = passwordStrength();

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 bg-hero-pastel relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-200/40 to-blush-200/30 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-sage-200/30 to-cream-200/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-blush-400 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-glow">
            <Sparkles className="w-7 h-7 text-white" strokeWidth={1.8} />
          </div>
          <h1 className="font-display text-3xl font-semibold text-surface-800">Create account</h1>
          <p className="text-surface-300 mt-1.5 text-sm">Join ShopSphere today</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">Full Name</label>
              <input className="input-field" placeholder="Enter Username" value={form.name} onChange={e => set('name', e.target.value)} />
              {errors.name && <p className="text-xs text-blush-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="label">Email address</label>
              <input type="email" className="input-field" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
              {errors.email && <p className="text-xs text-blush-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} className="input-field pr-10" placeholder="Min 6 characters"
                  value={form.password} onChange={e => set('password', e.target.value)} />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-300 hover:text-surface-800">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {strength && (
                <div className="mt-1.5">
                  <div className="h-1 bg-surface-100 rounded-full overflow-hidden">
                    <div className={`h-full ${strength.color} transition-all`} style={{ width: strength.width }} />
                  </div>
                  <p className={`text-xs mt-0.5 font-medium ${strength.label === 'Strong' ? 'text-sage-500' : strength.label === 'Fair' ? 'text-amber-500' : 'text-blush-500'}`}>{strength.label}</p>
                </div>
              )}
              {errors.password && <p className="text-xs text-blush-500 mt-1">{errors.password}</p>}
            </div>

            <div>
              <label className="label">Confirm Password</label>
              <div className="relative">
                <input type="password" className="input-field pr-10" placeholder="Repeat password"
                  value={form.confirm} onChange={e => set('confirm', e.target.value)} />
                {form.confirm && form.confirm === form.password && (
                  <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-sage-500" />
                )}
              </div>
              {errors.confirm && <p className="text-xs text-blush-500 mt-1">{errors.confirm}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base">
              {loading ? (
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : <><UserPlus className="w-5 h-5" /> Create Account</>}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-surface-300 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary-600 font-semibold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
