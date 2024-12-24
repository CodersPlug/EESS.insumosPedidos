import React, { useState, useRef, useImperativeHandle, forwardRef, useEffect } from 'react';

export interface QuantityInputRef {
  focus: () => void;
}

interface Props {
  value: number;
  onChange: (value: number) => void;
  onEnter?: () => void;
}

export const QuantityInput = forwardRef<QuantityInputRef, Props>(function QuantityInput(
  { value, onChange, onEnter }, 
  ref
) {
  const [inputValue, setInputValue] = useState(value.toString());
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);

  // Update local state when prop changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setInputValue(value.toString());
  }, [value]);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setInputValue(val);
    onChange(val ? parseInt(val, 10) : 0);
  };

  const handleBlur = () => {
    const val = inputValue.trim();
    const num = val ? parseInt(val, 10) : 1;
    setInputValue(num.toString());
    onChange(num);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && onEnter) {
      e.preventDefault();
      onEnter();
    }
  };

  return (
    <input
      ref={inputRef}
      type="text"
      inputMode="numeric"
      pattern="[0-9]*"
      value={inputValue}
      onChange={handleChange}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onFocus={(e) => e.target.select()}
      className="h-10 w-16 rounded-md border border-gray-300 px-2 text-center text-base"
    />
  );
});