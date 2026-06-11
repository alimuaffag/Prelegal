'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.detail ?? 'Sign in failed');
        setLoading(false);
        return;
      }
      const user = await res.json();
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/');
    } catch {
      setError('Could not connect to server');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-md px-8 py-10">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-1" style={{ color: '#032147' }}>
            Prelegal
          </h1>
          <p className="text-sm" style={{ color: '#888888' }}>
            Enter your email to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Email address
            </label>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ '--tw-ring-color': '#209dd7' } as React.CSSProperties}
            />
          </div>

          {error && (
            <p className="text-xs text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity disabled:opacity-60"
            style={{ backgroundColor: '#753991' }}
          >
            {loading ? 'Signing in…' : 'Continue'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs" style={{ color: '#888888' }}>
          New users are created automatically.
        </p>
      </div>
    </div>
  );
}
