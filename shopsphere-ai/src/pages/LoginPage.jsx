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
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-surface-50 via-white to-primary-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-black text-slate-900">Welcome back</h1>
          <p className="text-slate-500 mt-1.5">Sign in to your ShopSphere account</p>
        </div>

        <div className="card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm">{error}</div>}

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
                <a href="#" className="text-xs text-primary-600 hover:underline font-medium">Forgot password?</a>
              </div>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} className="input-field pr-10" placeholder="••••••••"
                  value={form.password} onChange={e => set('password', e.target.value)} />
                <button type="button" onClick={() => setShowPw(p => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
              {loading ? (
                <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
              ) : <><LogIn className="w-5 h-5" /> Sign In</>}
            </button>
          </form>

        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 font-semibold hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
