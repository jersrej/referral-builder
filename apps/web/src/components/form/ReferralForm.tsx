import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { referralSchema, type ReferralFormValues } from '@/features/referrals/schema';
import { useCreateReferral } from '@/features/referrals/hooks/useCreateReferral';
import { useEffect, useState } from 'react';
import Card from '../ui/Card';
import FormInput from './FormInput';
import Button from '../ui/Button';
import { toast } from 'sonner';
import type { AxiosError } from 'axios';

interface Props {
  onChange?: (values: ReferralFormValues) => void;
  defaultValues?: Partial<ReferralFormValues>;
  onSubmit?: (values: FormData) => Promise<void>;
  isSubmitting?: boolean;
}

const blankValues: ReferralFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  homeNumber: '',
  street: '',
  suburb: '',
  state: '',
  postcode: '',
  country: '',
  avatar: undefined,
  avatarUrl: undefined
};

const ReferralForm = ({ onChange, defaultValues, onSubmit, isSubmitting }: Props) => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [removedExistingAvatar, setRemovedExistingAvatar] = useState<boolean>(false);

  const { control, handleSubmit, watch, reset } = useForm<ReferralFormValues>({
    resolver: zodResolver(referralSchema),
    defaultValues: {
      ...blankValues,
      ...defaultValues
    }
  });

  useEffect(() => {
    if (defaultValues?.avatar && typeof defaultValues.avatar === 'string') {
      setAvatarPreview(defaultValues.avatar);
    }
  }, [defaultValues]);

  const { mutateAsync: createReferralForm, isPending } = useCreateReferral();

  const onSubmitHandler = async (data: ReferralFormValues) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (key === 'avatar' && value?.[0]) {
        formData.append('avatar', value[0]);
      } else if (key !== 'avatar' && key !== 'avatarUrl' && value) {
        formData.append(key, value as string);
      }
    });

    if (removedExistingAvatar && !data.avatar) {
      formData.append('removeAvatar', 'true');
    }

    // for editing existing referral
    if (onSubmit) {
      await onSubmit(formData);
      return;
    }

    await createReferralForm(formData, {
      onSuccess: () => {
        toast.success('Referral created successfully!');
        setAvatarPreview(null);
        setRemovedExistingAvatar(false);
        reset({ ...blankValues, avatar: undefined });
        onChange?.({ ...blankValues, avatar: undefined });
      },
      onError: () => {
        toast.error('Failed to create referral. Please try again.');
      }
    });
  };

  useEffect(() => {
    const subscription = watch((value) => {
      onChange?.(value as ReferralFormValues);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  return (
    <Card title="Referral Form">
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput name="firstName" control={control} label="First Name" />
          <FormInput name="lastName" control={control} label="Last Name" />
        </div>

        <FormInput name="email" control={control} label="Email" type="email" />
        <FormInput name="phone" control={control} label="Phone" />

        <div className="grid grid-cols-2 gap-4">
          <FormInput name="homeNumber" control={control} label="Home #" />
          <FormInput name="street" control={control} label="Street" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormInput name="suburb" control={control} label="Suburb" />
          <FormInput name="state" control={control} label="State" />
          <FormInput name="postcode" control={control} label="Postcode" />
        </div>

        <FormInput name="country" control={control} label="Country" />

        {/* Avatar Upload */}
        <Controller
          name="avatar"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">Avatar</label>

              {/* Existing Avatar (Edit Mode) */}
              {defaultValues?.avatarUrl && !avatarPreview && !removedExistingAvatar && (
                <div className="relative w-fit">
                  <img
                    src={defaultValues.avatarUrl}
                    alt="Current avatar"
                    className="h-20 w-20 rounded-full object-cover border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setRemovedExistingAvatar(true);
                      setAvatarPreview(null);
                      field.onChange(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              )}

              {/* New Preview */}
              {avatarPreview && (
                <div className="relative w-fit">
                  <img
                    src={avatarPreview}
                    alt="Avatar preview"
                    className="h-20 w-20 rounded-full object-cover border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setAvatarPreview(null);
                      field.onChange(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full"
                  >
                    ✕
                  </button>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const previewUrl = URL.createObjectURL(file);
                    setAvatarPreview(previewUrl);
                    setRemovedExistingAvatar(false);
                    field.onChange(e.target.files);
                  }
                }}
                className="block w-full text-sm"
              />
            </div>
          )}
        />

        <Button type="submit" loading={isSubmitting || isPending}>
          {onSubmit ? 'Update Referral' : 'Create Referral'}
        </Button>
      </form>
    </Card>
  );
};

export default ReferralForm;
