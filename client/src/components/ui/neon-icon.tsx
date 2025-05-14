import React from 'react';
import { cn } from '@/lib/utils';

interface NeonIconProps {
  type: 'trophy' | 'chart' | 'money-bag' | 'coin';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const NeonIcon: React.FC<NeonIconProps> = ({ 
  type, 
  className, 
  size = 'md',
  color
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };
  
  const colorClass = color || '';
  
  const renderIcon = () => {
    switch (type) {
      case 'trophy':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={cn("drop-shadow-[0_0_8px_rgba(147,51,234,0.7)]", sizeClasses[size], colorClass, className)}
          >
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
            <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
            <path d="M4 22h16" />
            <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
          </svg>
        );
      
      case 'chart':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={cn("drop-shadow-[0_0_8px_rgba(99,102,241,0.7)]", sizeClasses[size], colorClass, className)}
          >
            <path d="M3 3v18h18" />
            <path d="M18 17V9" />
            <path d="M13 17V5" />
            <path d="M8 17v-3" />
          </svg>
        );
      
      case 'money-bag':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={cn("drop-shadow-[0_0_8px_rgba(59,130,246,0.7)]", sizeClasses[size], colorClass, className)}
          >
            <path d="M6 9V2h12v7" />
            <path d="M8.5 2h7" />
            <path d="M12 12V9" />
            <circle cx="12" cy="16" r="2" />
            <path d="M8 22h8a4 4 0 0 0 4-4v-7a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v7a4 4 0 0 0 4 4Z" />
          </svg>
        );
      
      case 'coin':
        return (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={cn("drop-shadow-[0_0_8px_rgba(249,115,22,0.7)]", sizeClasses[size], colorClass, className)}
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v12" />
            <path d="M8 12h8" />
          </svg>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <div className="animate-glow-pulse">
      {renderIcon()}
    </div>
  );
};

export default NeonIcon;