'use client'

import React from 'react'

export interface SkeletonProps {
  // Shape
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded'
  
  // Sizing
  width?: string | number
  height?: string | number
  lines?: number  // For text variant
  
  // Styling
  className?: string
  animation?: 'shimmer' | 'pulse' | 'none'
}

export default function Skeleton({
  variant = 'text',
  width,
  height,
  lines = 1,
  className = '',
  animation = 'shimmer',
}: SkeletonProps) {
  // Base styles
  const baseStyles = 'bg-gray-200'
  
  // Variant styles
  const variantStyles = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded',
    rounded: 'rounded-lg',
  }
  
  // Animation styles
  const animationStyles = {
    shimmer: 'animate-shimmer bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:1000px_100%]',
    pulse: 'animate-pulse',
    none: '',
  }
  
  // Inline styles
  const inlineStyles: React.CSSProperties = {}
  
  if (width) {
    inlineStyles.width = typeof width === 'string' ? width : `${width}px`
  }
  
  if (height) {
    inlineStyles.height = typeof height === 'string' ? height : `${height}px`
  }
  
  // Render multiple lines for text variant
  if (variant === 'text' && lines > 1) {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={`${baseStyles} ${variantStyles[variant]} ${animationStyles[animation]}`}
            style={inlineStyles}
          />
        ))}
      </div>
    )
  }
  
  // Single element
  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${animationStyles[animation]} ${className}`}
      style={inlineStyles}
    />
  )
}
