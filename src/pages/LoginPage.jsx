import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, Eye, EyeOff, LogIn } from 'lucide-react';
import api from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
  username: '',
  password: ''
});
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {

  e.preventDefault();

  setError("");

  if (!form.username || !form.password) {

    setError("Please fill in all fields.");

    return;

  }

  setLoading(true);

  try {

    const response = await api.post("/login", {

      username: form.username,
      password: form.password,
  
    });

    localStorage.setItem("token", response.data);
    localStorage.setItem("username",form.username);


    alert("Login Successful!");

    navigate("/");

  } catch (error) {

  console.log(error);

  console.log(error.response);

  console.log(error.response?.data);

  console.log(error.response?.status);

  setError("Login Failed");

} finally {

    setLoading(false);

  }

};
  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 bg-hero-pastel relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary-200/40 to-blush-200/30 rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-tr from-sage-200/30 to-cream-200/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-400 to-blush-400 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-glow">
            <Sparkles className="w-7 h-7 text-white" strokeWidth={1.8} />
          </div>
          <h1 className="font-display text-3xl font-semibold text-surface-800">Welcome back</h1>
          <p className="text-surface-300 mt-1.5 text-sm">Sign in to your ShopSphere account</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-blush-50 border border-blush-200 text-blush-600 rounded-2xl px-4 py-3 text-sm">{error}</div>}

            <label className="label">Username</label>

        <input
     className="input-field"
      placeholder="Enter username"
     value={form.username}
     onChange={e => set('username', e.target.value)}
      />

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="label mb-0">Password</label>
                <a href="#" className="text-xs text-primary-500 hover:underline font-medium">Forgot password?</a>
              </div>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} className="input-field pr-10" placeholder="••••••••"
                  value={form.password} onChange={e => set('password', e.target.value)} />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-300 hover:text-surface-800">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 text-base">
              {loading ? (
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : <><LogIn className="w-5 h-5" /> Sign In</>}
            </button>
          </form>

        </div>

        <p className="text-center text-sm text-surface-300 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 font-semibold hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
