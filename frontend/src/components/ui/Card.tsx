// frontend/src/components/ui/Card.tsx

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className = '', ...props }: CardProps) {
  const classes = `rounded-lg border bg-card text-card-foreground shadow-sm ${className}`;
  return <div className={classes} {...props} />;
}

export function CardHeader({ className = '', ...props }: CardHeaderProps) {
  const classes = `flex flex-col space-y-1.5 p-6 ${className}`;
  return <div className={classes} {...props} />;
}

export function CardTitle({ className = '', ...props }: CardTitleProps) {
  const classes = `text-2xl font-semibold leading-none tracking-tight ${className}`;
  return <h3 className={classes} {...props} />;
}

export function CardDescription({ className = '', ...props }: CardDescriptionProps) {
  const classes = `text-sm text-muted-foreground ${className}`;
  return <p className={classes} {...props} />;
}

export function CardContent({ className = '', ...props }: CardContentProps) {
  const classes = `p-6 pt-0 ${className}`;
  return <div className={classes} {...props} />;
}

export function CardFooter({ className = '', ...props }: CardFooterProps) {
  const classes = `flex items-center p-6 pt-0 ${className}`;
  return <div className={classes} {...props} />;
}