import React from 'react'

interface ButtonProps {
  children: React.ReactNode
  onClick: () => void
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { children, onClick } = props

  return (
    <button onClick={onClick} className="bg-violet-800 text-white cursor-pointer p-2.5 rounded-lg transition-colors hover:bg-violet-700">
      {children}
    </button>
  )
}
