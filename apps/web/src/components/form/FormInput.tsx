import { type Control, Controller } from 'react-hook-form';
import Input from '@/components/ui/Input';

interface Props {
  name: string;
  control: Control<any>;
  label?: string;
  type?: string;
  placeholder?: string;
}

const FormInput = ({ name, control, label, type = 'text', placeholder }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Input
          {...field}
          type={type}
          label={label}
          placeholder={placeholder}
          error={fieldState.error?.message}
        />
      )}
    />
  );
};

export default FormInput;
