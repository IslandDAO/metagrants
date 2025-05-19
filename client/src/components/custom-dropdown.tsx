import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CustomDropdownProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function CustomDropdown({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className,
}: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Find the selected option label
  const selectedOption = options.find(option => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative w-full", className)} ref={dropdownRef}>
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-full items-center justify-between rounded-md border border-[#3c4759] bg-[#2c374b] px-3 py-2 text-sm text-[#f1f5fb] ring-offset-[#2c374b] hover:bg-[#343e52] data-[placeholder]:text-[#8896b0] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-1"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="line-clamp-1">{displayText}</span>
        <ChevronDown className="h-4 w-4 text-[#8896b0]" />
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div 
          className="absolute left-0 z-[9999] mt-1 max-h-60 w-full overflow-auto rounded-md border border-[#3c4759] bg-[#1c2431] p-1 shadow-lg" 
          role="listbox"
        >
          {options.map((option) => (
            <div
              key={option.value}
              className={cn(
                "relative cursor-pointer select-none rounded-sm px-2 py-1.5 text-sm text-[#f1f5fb] hover:bg-[#2c374b] focus:bg-[#3b82f6] focus:text-white",
                value === option.value && "bg-[#3b82f660] font-medium"
              )}
              onClick={() => handleOptionClick(option.value)}
              role="option"
              aria-selected={value === option.value}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}