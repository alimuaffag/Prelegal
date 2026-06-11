'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import NdaForm from '@/components/NdaForm';
import NdaDocument from '@/components/NdaDocument';
import { defaultNdaFormData, NdaFormData } from '@/types/nda';

interface User {
  id: number;
  email: string;
}

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [formData, setFormData] = useState<NdaFormData>(defaultNdaFormData);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('user');
      if (!stored) {
        router.push('/login');
      } else {
        setUser(JSON.parse(stored));
        setReady(true);
      }
    } catch {
      localStorage.removeItem('user');
      router.push('/login');
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  const handleDownload = () => {
    window.print();
  };

  if (!ready) return null;

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* Form sidebar */}
      <aside className="no-print w-80 shrink-0 bg-white border-r border-slate-200 flex flex-col overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h1 className="text-base font-bold" style={{ color: '#032147' }}>Mutual NDA Creator</h1>
            <p className="text-xs mt-0.5" style={{ color: '#888888' }}>
              Fill in the details to generate your agreement
            </p>
          </div>
          <button
            onClick={handleSignOut}
            className="text-xs px-2 py-1 rounded border border-slate-300 text-slate-500 hover:bg-slate-100 transition-colors"
          >
            Sign out
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <NdaForm data={formData} onChange={setFormData} onDownload={handleDownload} />
        </div>
      </aside>

      {/* Document preview */}
      <main className="flex-1 overflow-y-auto bg-slate-200">
        <div className="min-h-full py-8 px-6">
          <div className="no-print flex items-center justify-between mb-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                Document Preview
              </span>
              <span className="text-xs text-slate-400">{user?.email}</span>
            </div>
            <button
              onClick={handleDownload}
              className="rounded-md px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: '#753991' }}
            >
              Download / Print
            </button>
          </div>
          <div className="shadow-lg rounded-sm">
            <NdaDocument data={formData} />
          </div>
        </div>
      </main>
    </div>
  );
}
