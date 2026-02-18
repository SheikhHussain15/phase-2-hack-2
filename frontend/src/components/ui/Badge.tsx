'use client'

import React from 'react'

export interface BadgeProps {
  // Content
  children: React.ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  size?: 'sm' | 'md'
  
  // Styling
  className?: string
  icon?: React.ReactNode
}

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  icon,
}: BadgeProps) {
  // Base styles
  const baseStyles = 'inline-flex items-center font-medium rounded-full'
  
  // Variant styles
  const variantStyles = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-success-100 text-success-800',
    warning: 'bg-warning-100 text-warning-800',
    error: 'bg-error-100 text-error-800',
    info: 'bg-info-100 text-info-800',
  }
  
  // Size styles
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
  }
  
  // Combine classes
  const badgeClasses = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className,
  ].filter(Boolean).join(' ')
  
  return (
    <span className={badgeClasses}>
      {/* Icon */}
      {icon && (
        <span className="mr-1">
          {icon}
        </span>
      )}
      
      {/* Text */}
      {children}
    </span>
  )
}
