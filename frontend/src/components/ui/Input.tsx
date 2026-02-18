'use client'

import React, { useState, useCallback } from 'react'

export interface InputProps {
  // Content
  label: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'number'
  autoComplete?: string
  name?: string

  // State
  value: string
  error?: string
  disabled?: boolean
  required?: boolean

  // Behavior
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void

  // Accessibility
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  id: string

  // Styling
  className?: string
  icon?: React.ReactNode
}

export default function Input({
  label,
  placeholder,
  type = 'text',
  value,
  error,
  disabled = false,
  required = false,
  onChange,
  onBlur,
  onFocus,
  'aria-describedby': ariaDescribedBy,
  'aria-invalid': ariaInvalid,
  id,
  className = '',
  icon,
  name,
  autoComplete,
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)
  
  // Handle focus
  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true)
    onFocus?.(e)
  }, [onFocus])
  
  // Handle blur
  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false)
    onBlur?.(e)
  }, [onBlur])
  
  // Base styles
  const baseStyles = 'block w-full rounded-md border transition-all duration-normal focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  // State styles
  const stateStyles = error
    ? 'border-error-500 text-error-900 placeholder-error-300 focus:border-error-500 focus:ring-error-500'
    : disabled
      ? 'border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed'
      : isFocused
        ? 'border-primary-500 text-gray-900 focus:border-primary-500 focus:ring-primary-500'
        : 'border-gray-300 text-gray-900 hover:border-gray-400'
  
  // Size styles
  const sizeStyles = 'px-4 py-2 text-base min-h-[44px]'
  
  // Icon padding
  const iconPadding = icon ? 'pl-10' : 'pl-4'
  
  // Combine input classes
  const inputClasses = [
    baseStyles,
    stateStyles,
    sizeStyles,
    iconPadding,
    className,
  ].filter(Boolean).join(' ')
  
  // Input type
  const inputType = type === 'password' ? 'password' : type === 'email' ? 'email' : type === 'number' ? 'number' : 'text'
  
  return (
    <div className="w-full">
      {/* Label */}
      <label
        htmlFor={id}
        className={`block text-sm font-medium mb-1 ${
          error ? 'text-error-700' : disabled ? 'text-gray-400' : 'text-gray-700'
        }`}
      >
        {label}
        {required && <span className="text-error-500 ml-1" aria-hidden="true">*</span>}
      </label>
      
      {/* Input wrapper */}
      <div className="relative">
        {/* Icon */}
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        
        {/* Input field */}
        <input
          type={inputType}
          id={id}
          name={name}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          aria-describedby={ariaDescribedBy || (error ? `${id}-error` : undefined)}
          aria-invalid={ariaInvalid || !!error}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      
      {/* Error message */}
      {error && (
        <p
          id={`${id}-error`}
          className="mt-1 text-sm text-error-700 flex items-center"
          role="alert"
        >
          <svg
            className="w-4 h-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  )
}
