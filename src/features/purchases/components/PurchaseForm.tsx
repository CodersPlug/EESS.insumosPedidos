import React from 'react';
import { SearchBar } from '../../../components/SearchBar';
import { QuantityInput } from '../../../components/QuantityInput';
import { Supply } from '../../../types/supply';

interface Props {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSupplySelect: (supply: Supply) => void;
  quantity: number;
  onQuantityChange: (value: number) => void;
  onAdd: () => void;
  canAdd: boolean;
  searchBarRef: React.RefObject<any>;
  quantityInputRef: React.RefObject<any>;
}

export function PurchaseForm({
  searchQuery,
  onSearchChange,
  onSupplySelect,
  quantity,
  onQuantityChange,
  onAdd,
  canAdd,
  searchBarRef,
  quantityInputRef,
}: Props) {
  return (
    <div className="flex items-center gap-2">
      <SearchBar 
        ref={searchBarRef}
        value={searchQuery}
        onChange={onSearchChange}
        onSelect={onSupplySelect}
      />
      
      <div className="flex items-center gap-2">
        <QuantityInput 
          ref={quantityInputRef}
          value={quantity}
          onChange={onQuantityChange}
          onEnter={() => canAdd && onAdd()}
        />
        
        <div className="w-10">
          <button
            onClick={onAdd}
            disabled={!canAdd}
            className={`
              flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors
              ${canAdd 
                ? 'bg-blue-500 hover:bg-blue-600' 
                : 'cursor-not-allowed bg-gray-300'
              }
            `}
          >
            <span className="text-xl">+</span>
          </button>
        </div>
      </div>
    </div>
  );
}