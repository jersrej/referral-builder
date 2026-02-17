import { useState } from 'react';
import type { ReferralFormValues } from '@/features/referrals/schema';
import ReferralForm from '@/components/form/ReferralForm';
import ReferralPreview from '@/components/preview/ReferralPreview';
import ReferralsTable from '@/components/table/ReferralsTable';

const HomePage = () => {
  const [preview, setPreview] = useState<ReferralFormValues | undefined>(undefined);

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100">
      <div className="mx-auto w-full px-4 py-4 md:px-32 md:py-6">
        <div className="mb-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">Referral Builder</h1>
          <p className="text-xs text-gray-600 mt-0.5">Create and manage your referrals</p>
        </div>

        {/* Two Column Layout: Form | Preview + Table */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
          {/* Left Column: Form */}
          <div>
            <ReferralForm onChange={setPreview} />
          </div>

          {/* Right Column: Preview + Table */}
          <div className="flex flex-col gap-4 h-full">
            <div className="flex-1 min-h-0">
              <ReferralPreview data={preview} />
            </div>
            <div className="flex-1 min-h-0">
              <ReferralsTable />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
