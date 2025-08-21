import React from 'react';

interface ChipProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const variantStyles = {
  primary: 'bg-[#265b4e]/10 text-[#265b4e] hover:bg-[#265b4e]/20',
  secondary: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
  success: 'bg-green-100 text-green-800 hover:bg-green-200',
  warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
  error: 'bg-red-100 text-red-800 hover:bg-red-200',
};

const sizeStyles = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1 text-sm',
  lg: 'px-4 py-2 text-base',
};

export function Chip({
  children,
  variant = 'primary',
  size = 'md',
  className = ''
}: ChipProps) {
  const baseStyles = 'inline-flex items-center rounded-full font-medium transition-colors';
  const variantStyle = variantStyles[variant];
  const sizeStyle = sizeStyles[size];

  return (
    <span className={`${baseStyles} ${variantStyle} ${sizeStyle} ${className}`}>
      {children}
    </span>
  );
}