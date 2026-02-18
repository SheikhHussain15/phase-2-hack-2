'use client'

import React from 'react'

export interface ButtonProps {
  // Content
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode

  // State
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean

  // Behavior
  type?: 'button' | 'submit' | 'reset'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void

  // Accessibility
  'aria-label'?: string
  'aria-disabled'?: boolean

  // Styling
  className?: string
  style?: React.CSSProperties
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  'aria-label': ariaLabel,
  'aria-disabled': ariaDisabled,
  className = '',
  style,
}: ButtonProps) {
  // Base styles
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-all duration-normal focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  // Variant styles
  const variantStyles = {
    primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus:ring-primary-500 shadow-sm hover:shadow-md',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 focus:ring-gray-500 border border-gray-300',
    danger: 'bg-error-500 text-white hover:bg-error-600 active:bg-error-700 focus:ring-error-500 shadow-sm',
    ghost: 'bg-transparent text-primary-500 hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500',
  }
  
  // Size styles
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm min-h-[32px]',
    md: 'px-4 py-2 text-base min-h-[40px]',
    lg: 'px-6 py-3 text-lg min-h-[48px]',
  }
  
  // Disabled/Loading styles
  const disabledStyles = disabled || loading 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer'
  
  // Full width
  const widthStyles = fullWidth ? 'w-full' : ''
  
  // Combine all classes
  const buttonClasses = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    disabledStyles,
    widthStyles,
    className,
  ].filter(Boolean).join(' ')
  
  // Handle click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) {
      e.preventDefault()
      return
    }
    onClick?.(e)
  }
  
  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      aria-disabled={ariaDisabled || disabled || loading}
      style={style}
      onClick={handleClick}
    >
      {/* Icon */}
      {icon && !loading && (
        <span className="mr-2 inline-flex items-center">
          {icon}
        </span>
      )}

      {/* Loading Spinner */}
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}

      {children}
    </button>
  )
}
