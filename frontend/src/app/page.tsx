'use client';

import { useState } from 'react';
import NdaForm from '@/components/NdaForm';
import NdaDocument from '@/components/NdaDocument';
import { defaultNdaFormData, NdaFormData } from '@/types/nda';

export default function Home() {
  const [formData, setFormData] = useState<NdaFormData>(defaultNdaFormData);

  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* Form sidebar */}
      <aside className="no-print w-80 shrink-0 bg-white border-r border-slate-200 flex flex-col overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50">
          <h1 className="text-base font-bold text-slate-800">Mutual NDA Creator</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Fill in the details to generate your agreement
          </p>
        </div>
        <div className="flex-1 overflow-hidden">
          <NdaForm data={formData} onChange={setFormData} onDownload={handleDownload} />
        </div>
      </aside>

      {/* Document preview */}
      <main className="flex-1 overflow-y-auto bg-slate-200">
        <div className="min-h-full py-8 px-6">
          <div className="no-print flex items-center justify-between mb-4 max-w-4xl mx-auto">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
              Document Preview
            </span>
            <button
              onClick={handleDownload}
              className="rounded-md bg-slate-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors"
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
