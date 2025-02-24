import { combineClasses } from '@/lib/utils';
import { ButtonHTMLAttributes, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={combineClasses(
          'px-4 py-2 rounded-md font-medium transition-colors',
          {
            default: 'bg-blue-500 text-white hover:bg-blue-600',
            outline: 'border border-gray-300 text-gray-700 hover:bg-gray-100',
            ghost: 'text-gray-700 hover:bg-gray-100',
          }[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
