'use client';

import { NdaFormData } from '@/types/nda';
import {
  formatDate,
  getMndaTermText,
  getConfidentialityTermText,
  processStandardTerms,
} from '@/lib/ndaTemplate';

interface NdaDocumentProps {
  data: NdaFormData;
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-gray-200">
      <td className="py-2 pr-4 font-semibold text-sm align-top w-48 text-gray-700">{label}</td>
      <td className="py-2 text-sm text-gray-900">{value || <span className="text-gray-400 italic">Not specified</span>}</td>
    </tr>
  );
}

function SignatureTable({ data }: { data: NdaFormData }) {
  return (
    <table className="w-full border border-gray-300 text-sm mt-4">
      <thead>
        <tr className="bg-gray-50">
          <th className="border border-gray-300 px-3 py-2 text-left font-semibold text-gray-700 w-1/4"></th>
          <th className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-700">
            {data.party1Company || 'Party 1'}
          </th>
          <th className="border border-gray-300 px-3 py-2 text-center font-semibold text-gray-700">
            {data.party2Company || 'Party 2'}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-300 px-3 py-2 font-medium text-gray-600">Signature</td>
          <td className="border border-gray-300 px-3 py-8"></td>
          <td className="border border-gray-300 px-3 py-8"></td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-3 py-2 font-medium text-gray-600">Print Name</td>
          <td className="border border-gray-300 px-3 py-2">{data.party1Name}</td>
          <td className="border border-gray-300 px-3 py-2">{data.party2Name}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-3 py-2 font-medium text-gray-600">Title</td>
          <td className="border border-gray-300 px-3 py-2">{data.party1Title}</td>
          <td className="border border-gray-300 px-3 py-2">{data.party2Title}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-3 py-2 font-medium text-gray-600">Company</td>
          <td className="border border-gray-300 px-3 py-2">{data.party1Company}</td>
          <td className="border border-gray-300 px-3 py-2">{data.party2Company}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-3 py-2 font-medium text-gray-600">Notice Address</td>
          <td className="border border-gray-300 px-3 py-2">{data.party1Address}</td>
          <td className="border border-gray-300 px-3 py-2">{data.party2Address}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-3 py-2 font-medium text-gray-600">Date</td>
          <td className="border border-gray-300 px-3 py-6"></td>
          <td className="border border-gray-300 px-3 py-6"></td>
        </tr>
      </tbody>
    </table>
  );
}

export default function NdaDocument({ data }: NdaDocumentProps) {
  const standardTermsHtml = processStandardTerms(data);

  const mndaTermLabel =
    data.mndaTermType === 'expires'
      ? `Expires ${data.mndaTermYears} year(s) from Effective Date`
      : 'Continues until terminated';

  const confidentialityLabel =
    data.confidentialityTermType === 'years'
      ? `${data.confidentialityTermYears} year(s) from Effective Date`
      : 'In perpetuity';

  return (
    <div id="nda-document" className="bg-white text-gray-900 font-serif text-sm leading-relaxed max-w-4xl mx-auto px-12 py-10">
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold uppercase tracking-widest">
          Mutual Non-Disclosure Agreement
        </h1>
      </div>

      {/* Using this MNDA */}
      <div className="mb-6 text-sm text-gray-700">
        <p>
          This Mutual Non-Disclosure Agreement (the &ldquo;MNDA&rdquo;) consists of: (1) this Cover
          Page (&ldquo;<strong>Cover Page</strong>&rdquo;) and (2) the Common Paper Mutual NDA
          Standard Terms Version 1.0 (&ldquo;<strong>Standard Terms</strong>&rdquo;) identical to
          those posted at{' '}
          <a
            href="https://commonpaper.com/standards/mutual-nda/1.0"
            className="text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            commonpaper.com/standards/mutual-nda/1.0
          </a>
          . Any modifications of the Standard Terms should be made on the Cover Page, which will
          control over conflicts with the Standard Terms.
        </p>
      </div>

      <hr className="border-gray-300 mb-6" />

      {/* Cover page fields */}
      <table className="w-full mb-6">
        <tbody>
          <FieldRow label="Purpose" value={data.purpose} />
          <FieldRow label="Effective Date" value={formatDate(data.effectiveDate)} />
          <FieldRow label="MNDA Term" value={mndaTermLabel} />
          <FieldRow label="Term of Confidentiality" value={confidentialityLabel} />
          <FieldRow
            label="Governing Law"
            value={data.governingLaw}
          />
          <FieldRow label="Jurisdiction" value={data.jurisdiction} />
          <FieldRow label="MNDA Modifications" value="None" />
        </tbody>
      </table>

      <p className="text-sm text-gray-700 mb-4">
        By signing this Cover Page, each party agrees to enter into this MNDA as of the Effective Date.
      </p>

      <SignatureTable data={data} />

      <p className="text-xs text-gray-500 mt-2 mb-8">
        Common Paper Mutual Non-Disclosure Agreement (Version 1.0) free to use under{' '}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          CC BY 4.0
        </a>
        .
      </p>

      <hr className="border-gray-300 mb-6" />

      {/* Standard Terms */}
      <div
        className="standard-terms"
        dangerouslySetInnerHTML={{ __html: standardTermsHtml }}
      />

      <p className="text-xs text-gray-500 mt-6">
        Common Paper Mutual Non-Disclosure Agreement{' '}
        <a
          href="https://commonpaper.com/standards/mutual-nda/1.0/"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Version 1.0
        </a>{' '}
        free to use under{' '}
        <a
          href="https://creativecommons.org/licenses/by/4.0/"
          className="underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          CC BY 4.0
        </a>
        .
      </p>
    </div>
  );
}
