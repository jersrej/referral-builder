import { type InputHTMLAttributes, forwardRef, useId } from 'react';
import clsx from 'clsx';

type Variant = 'default' | 'outline' | 'ghost';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  variant?: Variant;
  containerClassName?: string;
}

const variantStyles: Record<Variant, string> = {
  default: 'border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white',
  outline: 'border border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white',
  ghost: 'border border-transparent focus:ring-2 focus:ring-blue-500 bg-gray-50'
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, variant = 'default', className, containerClassName, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className={clsx('flex flex-col gap-1', containerClassName)}>
        {label && (
          <label htmlFor={inputId} className="text-xs font-medium text-gray-700">
            {label}
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          className={clsx(
            'rounded-lg px-3 py-2 text-sm transition-all outline-none placeholder:text-gray-400',
            variantStyles[variant],
            error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
            className
          )}
          {...props}
        />

        {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
