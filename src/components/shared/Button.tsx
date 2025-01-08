'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

interface ButtonProps {
  type?: 'submit'
  href?: string
  onClick?: () => void
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  variant?: 'primary' | 'secondary'
  loading?: boolean
}

export function Button({ 
  type,
  href, 
  onClick, 
  children, 
  className = '',
  style,
  variant = 'primary',
  loading = false
}: ButtonProps) {
  const baseClasses = `inline-block font-medium py-3 px-8 rounded-full transition-all duration-300`
  const variantClasses = {
    primary: 'appointment-btn pulse',
    secondary: 'bg-secondary hover:bg-secondary-light text-white'
  }

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`

  const buttonContent = (
    <>
      {loading ? (
        <svg className="w-4 h-4 animate-spin mr-2" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      ) : null}
      {children}
    </>
  )

  if (href) {
    return (
      <Link href={href} className={combinedClasses} style={style}>
        {buttonContent}
      </Link>
    )
  }

  return (
    <button onClick={onClick} type={type} className={combinedClasses} style={style}>
      {buttonContent}
    </button>
  )
}
