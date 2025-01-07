'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

interface ButtonProps {
  href?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  variant?: 'primary' | 'secondary'
}

export function Button({ 
  href, 
  onClick, 
  children, 
  className = '',
  style,
  variant = 'primary'
}: ButtonProps) {
  const baseClasses = `inline-block font-medium py-3 px-8 rounded-full transition-all duration-300`
  const variantClasses = {
    primary: 'appointment-btn pulse',
    secondary: 'bg-secondary hover:bg-secondary-light text-white'
  }

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={combinedClasses} style={style}>
        {children}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className={combinedClasses} style={style}>
      {children}
    </button>
  )
}
