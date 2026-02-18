import { type Control, Controller, type FieldValues, type Path } from 'react-hook-form';
import Input from '@/components/ui/Input';

interface Props<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  type?: string;
  placeholder?: string;
}

const FormInput = <T extends FieldValues>({
  name,
  control,
  label,
  type = 'text',
  placeholder
}: Props<T>) => {
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
