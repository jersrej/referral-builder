import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { referralSchema, type ReferralType } from '@/features/referrals/schema';
import { useCreateReferral } from '@/features/referrals/hooks/useCreateReferral';
import { useEffect, useState } from 'react';
import Card from '../ui/Card';
import FormInput from './FormInput';
import Button from '../ui/Button';
import FileUpload from '../ui/FileUpload';
import { toast } from 'sonner';

interface Props {
  onChange?: (values: ReferralType | undefined) => void;
  defaultValues?: Partial<ReferralType>;
  onSubmit?: (values: FormData) => Promise<void>;
  isSubmitting?: boolean;
}

const blankValues: ReferralType = {
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

  const { control, handleSubmit, watch, reset } = useForm<ReferralType>({
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

  const onSubmitHandler = async (data: ReferralType) => {
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
        onChange?.(undefined);
      },
      onError: () => {
        toast.error('Failed to create referral. Please try again.');
      }
    });
  };

  useEffect(() => {
    const subscription = watch((value) => {
      onChange?.(value as ReferralType);
    });
    return () => subscription.unsubscribe();
  }, [watch, onChange]);

  return (
    <Card title="Referral Form">
      <form
        onSubmit={handleSubmit(onSubmitHandler)}
        className="space-y-4"
        aria-label="Referral form"
      >
        {/* Personal Information Section */}
        <fieldset className="space-y-2.5">
          <legend className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Personal Information
          </legend>
          <div className="space-y-3 pl-1">
            <div className="grid grid-cols-2 gap-3">
              <FormInput name="firstName" control={control} label="First Name" />
              <FormInput name="lastName" control={control} label="Last Name" />
            </div>

            <FormInput name="email" control={control} label="Email" type="email" />
            <FormInput name="phone" control={control} label="Phone" />
          </div>
        </fieldset>

        {/* Address Section */}
        <fieldset className="space-y-2.5 pt-2 border-t border-gray-100">
          <legend className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Address
          </legend>
          <div className="space-y-3 pl-1">
            <div className="grid grid-cols-2 gap-3">
              <FormInput name="homeNumber" control={control} label="Home #" />
              <FormInput name="street" control={control} label="Street" />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <FormInput name="suburb" control={control} label="Suburb" />
              <FormInput name="state" control={control} label="State" />
              <FormInput name="postcode" control={control} label="Postcode" />
            </div>

            <FormInput name="country" control={control} label="Country" />
          </div>
        </fieldset>

        {/* Avatar Section */}
        <fieldset className="pt-2 border-t border-gray-100">
          <legend className="sr-only">Avatar upload</legend>
          <Controller
            name="avatar"
            control={control}
            render={({ field }) => (
              <FileUpload
                value={field.value}
                onChange={(files) => {
                  if (files && files.length > 0) {
                    const previewUrl = URL.createObjectURL(files[0]);
                    setAvatarPreview(previewUrl);
                    setRemovedExistingAvatar(false);
                    field.onChange(files);
                  }
                }}
                preview={
                  avatarPreview ||
                  (defaultValues?.avatarUrl && !removedExistingAvatar
                    ? defaultValues.avatarUrl
                    : null)
                }
                onRemove={() => {
                  setAvatarPreview(null);
                  setRemovedExistingAvatar(true);
                  field.onChange(null);
                }}
              />
            )}
          />
        </fieldset>

        <Button
          type="submit"
          loading={isSubmitting || isPending}
          className="w-full"
          aria-label={onSubmit ? 'Update referral' : 'Create referral'}
        >
          {onSubmit ? 'Update Referral' : 'Create Referral'}
        </Button>
      </form>
    </Card>
  );
};

export default ReferralForm;
