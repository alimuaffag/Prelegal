'use client';

import { NdaFormData } from '@/types/nda';

interface NdaFormProps {
  data: NdaFormData;
  onChange: (data: NdaFormData) => void;
  onDownload: () => void;
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3 mt-6 first:mt-0 border-b border-slate-200 pb-1">
      {children}
    </h3>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
      {children}
    </div>
  );
}

const inputClass =
  'w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';

const textareaClass =
  'w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none';

export default function NdaForm({ data, onChange, onDownload }: NdaFormProps) {
  const set = <K extends keyof NdaFormData>(key: K, value: NdaFormData[K]) =>
    onChange({ ...data, [key]: value });

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <SectionHeading>Agreement Details</SectionHeading>

        <Field label="Purpose">
          <textarea
            className={textareaClass}
            rows={3}
            value={data.purpose}
            onChange={(e) => set('purpose', e.target.value)}
            placeholder="How confidential information may be used"
          />
        </Field>

        <Field label="Effective Date">
          <input
            type="date"
            className={inputClass}
            value={data.effectiveDate}
            onChange={(e) => set('effectiveDate', e.target.value)}
          />
        </Field>

        <SectionHeading>Term</SectionHeading>

        <Field label="MNDA Term">
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="mndaTermType"
                value="expires"
                checked={data.mndaTermType === 'expires'}
                onChange={() => set('mndaTermType', 'expires')}
                className="accent-blue-600"
              />
              <span className="text-sm text-slate-700">Expires after</span>
              <input
                type="number"
                min={1}
                value={data.mndaTermYears}
                onChange={(e) => set('mndaTermYears', Number(e.target.value))}
                disabled={data.mndaTermType !== 'expires'}
                className="w-16 rounded border border-slate-300 px-2 py-1 text-sm disabled:opacity-40"
              />
              <span className="text-sm text-slate-700">year(s)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="mndaTermType"
                value="continues"
                checked={data.mndaTermType === 'continues'}
                onChange={() => set('mndaTermType', 'continues')}
                className="accent-blue-600"
              />
              <span className="text-sm text-slate-700">Continues until terminated</span>
            </label>
          </div>
        </Field>

        <Field label="Term of Confidentiality">
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="confidentialityTermType"
                value="years"
                checked={data.confidentialityTermType === 'years'}
                onChange={() => set('confidentialityTermType', 'years')}
                className="accent-blue-600"
              />
              <input
                type="number"
                min={1}
                value={data.confidentialityTermYears}
                onChange={(e) => set('confidentialityTermYears', Number(e.target.value))}
                disabled={data.confidentialityTermType !== 'years'}
                className="w-16 rounded border border-slate-300 px-2 py-1 text-sm disabled:opacity-40"
              />
              <span className="text-sm text-slate-700">year(s) from Effective Date</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="confidentialityTermType"
                value="perpetuity"
                checked={data.confidentialityTermType === 'perpetuity'}
                onChange={() => set('confidentialityTermType', 'perpetuity')}
                className="accent-blue-600"
              />
              <span className="text-sm text-slate-700">In perpetuity</span>
            </label>
          </div>
        </Field>

        <SectionHeading>Jurisdiction</SectionHeading>

        <Field label="Governing Law (State)">
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. Delaware"
            value={data.governingLaw}
            onChange={(e) => set('governingLaw', e.target.value)}
          />
        </Field>

        <Field label="Jurisdiction">
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. New Castle, DE"
            value={data.jurisdiction}
            onChange={(e) => set('jurisdiction', e.target.value)}
          />
        </Field>

        <SectionHeading>Party 1</SectionHeading>

        <Field label="Company">
          <input
            type="text"
            className={inputClass}
            placeholder="Company name"
            value={data.party1Company}
            onChange={(e) => set('party1Company', e.target.value)}
          />
        </Field>
        <Field label="Signatory Name">
          <input
            type="text"
            className={inputClass}
            placeholder="Full name"
            value={data.party1Name}
            onChange={(e) => set('party1Name', e.target.value)}
          />
        </Field>
        <Field label="Title">
          <input
            type="text"
            className={inputClass}
            placeholder="Title"
            value={data.party1Title}
            onChange={(e) => set('party1Title', e.target.value)}
          />
        </Field>
        <Field label="Notice Address">
          <input
            type="text"
            className={inputClass}
            placeholder="Email or postal address"
            value={data.party1Address}
            onChange={(e) => set('party1Address', e.target.value)}
          />
        </Field>

        <SectionHeading>Party 2</SectionHeading>

        <Field label="Company">
          <input
            type="text"
            className={inputClass}
            placeholder="Company name"
            value={data.party2Company}
            onChange={(e) => set('party2Company', e.target.value)}
          />
        </Field>
        <Field label="Signatory Name">
          <input
            type="text"
            className={inputClass}
            placeholder="Full name"
            value={data.party2Name}
            onChange={(e) => set('party2Name', e.target.value)}
          />
        </Field>
        <Field label="Title">
          <input
            type="text"
            className={inputClass}
            placeholder="Title"
            value={data.party2Title}
            onChange={(e) => set('party2Title', e.target.value)}
          />
        </Field>
        <Field label="Notice Address">
          <input
            type="text"
            className={inputClass}
            placeholder="Email or postal address"
            value={data.party2Address}
            onChange={(e) => set('party2Address', e.target.value)}
          />
        </Field>
      </div>

      <div className="border-t border-slate-200 px-5 py-4 bg-slate-50">
        <button
          onClick={onDownload}
          className="w-full rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 active:bg-blue-800 transition-colors"
        >
          Download / Print
        </button>
      </div>
    </div>
  );
}
