import type { ReferralFormValues } from '@/features/referrals/schema';
import Card from '../ui/Card';

interface Props {
  data?: ReferralFormValues;
}

const ReferralPreview = ({ data }: Props) => {
  if (!data) {
    return (
      <Card title="Preview">
        <p className="text-sm text-gray-500">Fill out the form to see a live preview.</p>
      </Card>
    );
  }

  const avatar = data.avatar?.[0] ? URL.createObjectURL(data.avatar[0]) : null;

  return (
    <Card title="Preview">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {avatar && (
          <img src={avatar} alt="avatar" className="h-20 w-20 rounded-full object-cover" />
        )}

        <div>
          <p className="font-semibold">
            {data.firstName} {data.lastName}
          </p>
          <p className="text-sm text-gray-600">{data.email}</p>
          <p className="text-sm">{data.phone}</p>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-700">
        <p>
          {data.homeNumber} {data.street}
        </p>
        <p>
          {data.suburb}, {data.state} {data.postcode}
        </p>
        <p>{data.country}</p>
      </div>
    </Card>
  );
};

export default ReferralPreview;
