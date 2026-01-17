import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
  type?: 'submit' | 'button'
  styleType?: 'base' | 'advanced' | 'error'
  tailwindClasses?: string
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, onClick, type = 'button', styleType = 'base', tailwindClasses } = props

  let className: string

  switch (styleType) {
    case 'base':
      className = `text-black cursor-pointer p-2.5  ${tailwindClasses} dark:text-white`
      break
    case 'advanced':
      className = 'bg-violet-800 text-white cursor-pointer p-2.5 rounded-lg transition-colors hover:bg-violet-700 dark:bg-gray-600'
      break
    case 'error':
      className = 'bg-red-500 cursor-pointer p-2.5 rounded-lg transition-colors hover:bg-red-400'
      break
  }

  return (
    <button onClick={onClick} type={type} className={className}>
      {children}
    </button>
  )
}
