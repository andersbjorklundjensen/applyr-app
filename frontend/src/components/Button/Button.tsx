import React from 'react';

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
  color?: 'green' | 'red' | 'yellow' | 'blue';
  fillBlock?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const colorClasses = {
  green: 'bg-[#88cf8f] text-white hover:bg-[#7bc182]',
  red: 'bg-[#e24f54] text-white hover:bg-[#d43f44]',
  yellow: 'bg-[#f6cd42] text-[#555] hover:bg-[#f4c632]',
  blue: 'bg-blue-300 text-white hover:bg-blue-400',
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  color = 'green',
  fillBlock = false,
  type = 'button',
}) => {
  const baseClasses =
    'px-6 py-2.5 rounded-full border-none transition-colors duration-200';
  const widthClass = fillBlock ? 'w-full' : 'w-auto';
  const colorClass = colorClasses[color] || colorClasses.green;

  return (
    <button
      type={type}
      className={`${baseClasses} ${colorClass} ${widthClass}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
