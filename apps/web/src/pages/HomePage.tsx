import { useState } from 'react';
import type { ReferralFormValues } from '@/features/referrals/schema';
import ReferralForm from '@/components/form/ReferralForm';
import ReferralPreview from '@/components/preview/ReferralPreview';
import ReferralsTable from '@/components/table/ReferralsTable';

const HomePage = () => {
  const [preview, setPreview] = useState<ReferralFormValues>();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-6 md:py-8">
        <h1 className="text-xl md:text-2xl font-semibold mb-6">Referral Builder</h1>

        {/* Form + Preview */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <ReferralForm onChange={setPreview} />
          <ReferralPreview data={preview} />
        </div>

        {/* Table */}
        <div className="mt-8">
          <ReferralsTable />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
