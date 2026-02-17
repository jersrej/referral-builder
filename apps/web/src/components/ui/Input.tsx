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
  default: 'border border-gray-300 focus:ring-2 focus:ring-blue-500',
  outline: 'border border-gray-400 focus:ring-2 focus:ring-blue-500',
  ghost: 'border border-transparent focus:ring-2 focus:ring-blue-500'
};

const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, variant = 'default', className, containerClassName, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
      <div className={clsx('flex flex-col gap-1', containerClassName)}>
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium">
            {label}
          </label>
        )}

        <input
          id={inputId}
          ref={ref}
          className={clsx(
            'rounded-lg px-3 py-2 text-sm transition outline-none',
            variantStyles[variant],
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />

        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
