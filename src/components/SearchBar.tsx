import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Search, Loader2, Plus } from 'lucide-react';
import { useSupplySearch } from '../hooks/useSupplySearch';
import { Supply } from '../types/supply';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSelect: (supply: Supply) => void;
}

export interface SearchBarRef {
  focus: () => void;
}

export const SearchBar = forwardRef<SearchBarRef, Props>(function SearchBar(
  { value, onChange, onSelect }, 
  ref
) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: supplies, loading, error, search, create } = useSupplySearch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      search(value);
    }, 300);

    return () => clearTimeout(timer);
  }, [value, search]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCreateSupply = async () => {
    if (!value.trim()) return;
    
    try {
      const supply = await create(value);
      onSelect(supply);
      setIsOpen(false);
      setSelectedIndex(-1);
    } catch (error) {
      // Error is already handled in the hook
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent) => {
    if (!value.trim()) return;

    switch (e.key) {
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && supplies[selectedIndex]) {
          onSelect(supplies[selectedIndex]);
          setIsOpen(false);
          setSelectedIndex(-1);
        } else if (supplies.length === 0) {
          await handleCreateSupply();
        }
        break;
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < supplies.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : prev);
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <div className="relative flex-1" ref={dropdownRef}>
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
      
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setIsOpen(true);
          setSelectedIndex(-1);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        placeholder="Buscar insumo..."
        className="h-10 w-full rounded-md border border-gray-300 pl-10 pr-3 text-base"
      />

      {loading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <Loader2 className="h-5 w-5 animate-spin text-gray-400" />
        </div>
      )}

      {isOpen && value && (supplies.length > 0 || loading || error || value.trim()) && (
        <div className="absolute z-10 mt-1 w-full overflow-hidden rounded-md border border-gray-200 bg-white py-1 shadow-lg">
          {error ? (
            <div className="px-3 py-2 text-base text-red-500">
              {error}
            </div>
          ) : loading ? (
            <div className="px-3 py-2 text-base text-gray-500">
              Buscando...
            </div>
          ) : supplies.length === 0 && value.trim() ? (
            <button
              onClick={handleCreateSupply}
              className="flex w-full items-center gap-2 px-3 py-2 text-base text-blue-600 hover:bg-gray-50"
            >
              <Plus className="h-4 w-4" />
              <span>Crear "{value}"</span>
            </button>
          ) : (
            supplies.map((supply, index) => (
              <button
                key={supply.id}
                onClick={() => {
                  onSelect(supply);
                  setIsOpen(false);
                  setSelectedIndex(-1);
                }}
                className={`
                  w-full px-3 py-1.5 text-left text-base transition-colors
                  ${index === selectedIndex ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-50'}
                `}
              >
                {supply.name}
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
});