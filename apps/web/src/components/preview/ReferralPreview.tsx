import type { ReferralType } from '@/features/referrals/schema';
import Card from '../ui/Card';
import { Mail, Phone, MapPin, User } from 'lucide-react';

interface Props {
  data?: ReferralType;
}

const ReferralPreview = ({ data }: Props) => {
  if (!data) {
    return (
      <Card title="Preview">
        <div
          className="flex flex-col items-center justify-center py-8 px-4"
          role="status"
          aria-label="Empty preview"
        >
          <div
            className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3"
            aria-hidden="true"
          >
            <User size={24} className="text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-700 mb-0.5">No preview available</p>
          <p className="text-xs text-gray-500 text-center">
            Fill out the form to see a live preview of the referral
          </p>
        </div>
      </Card>
    );
  }

  const avatar = data.avatar?.[0] ? URL.createObjectURL(data.avatar[0]) : null;
  const hasName = data.firstName || data.lastName;
  const hasAddress = data.homeNumber || data.street || data.suburb || data.state || data.postcode;

  return (
    <Card title="Preview">
      <div className="space-y-4" role="region" aria-live="polite" aria-label="Referral preview">
        {/* Profile Section */}
        <div className="flex items-start gap-3">
          {avatar ? (
            <img
              src={avatar}
              alt={`${data.firstName || 'User'} ${data.lastName || ''} avatar`}
              className="h-16 w-16 rounded-full object-cover border-2 border-gray-200 shadow-sm shrink-0"
            />
          ) : (
            <div
              className="h-16 w-16 rounded-full bg-linear-to-br from-blue-100 to-blue-200 flex items-center justify-center shrink-0 border-2 border-gray-200"
              aria-hidden="true"
            >
              <User size={24} className="text-blue-600" aria-hidden="true" />
            </div>
          )}

          <div className="flex-1 min-w-0 pt-1">
            {hasName ? (
              <h3 className="font-semibold text-base text-gray-900 truncate">
                {data.firstName} {data.lastName}
              </h3>
            ) : (
              <p className="text-sm text-gray-400 italic">Name not provided</p>
            )}

            {data.email && (
              <div className="flex items-center gap-2 mt-1.5 text-gray-600">
                <Mail size={12} className="shrink-0" aria-hidden="true" />
                <p className="text-sm truncate" aria-label={`Email: ${data.email}`}>
                  {data.email}
                </p>
              </div>
            )}

            {data.phone && (
              <div className="flex items-center gap-2 mt-1 text-gray-600">
                <Phone size={12} className="shrink-0" aria-hidden="true" />
                <p className="text-sm" aria-label={`Phone: ${data.phone}`}>
                  {data.phone}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Address Section */}
        {hasAddress && (
          <div className="pt-3 border-t border-gray-100">
            <div className="flex items-start gap-2 text-gray-700">
              <MapPin size={14} className="mt-0.5 shrink-0 text-gray-500" aria-hidden="true" />
              <div className="text-sm space-y-0.5">
                {(data.homeNumber || data.street) && (
                  <p>
                    {data.homeNumber} {data.street}
                  </p>
                )}
                {(data.suburb || data.state || data.postcode) && (
                  <p>{[data.suburb, data.state, data.postcode].filter(Boolean).join(', ')}</p>
                )}
                {data.country && <p>{data.country}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ReferralPreview;
