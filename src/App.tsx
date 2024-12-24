import React, { useState, useRef } from 'react';
import { Header } from './components/Header';
import { SearchBarRef } from './components/SearchBar';
import { RequestList } from './components/RequestList';
import { QuantityInputRef } from './components/QuantityInput';
import { SubmitButton } from './components/SubmitButton';
import { SuccessMessage } from './components/SuccessMessage';
import { Supply } from './types/supply';
import { usePurchaseRequests } from './hooks/usePurchaseRequests';
import { PurchaseForm } from './features/purchases/components/PurchaseForm';
import { useBranchStore } from './hooks/useBranchSelection';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedSupply, setSelectedSupply] = useState<Supply | null>(null);
  const { requests, submitting, error, success, addRequest, removeRequest, submitRequests, clearSuccess } = usePurchaseRequests();
  const { selectedBranchId } = useBranchStore();
  const quantityInputRef = useRef<QuantityInputRef>(null);
  const searchBarRef = useRef<SearchBarRef>(null);

  const handleSupplySelect = (supply: Supply) => {
    setSearchQuery(supply.name);
    setSelectedSupply(supply);
    setTimeout(() => quantityInputRef.current?.focus(), 0);
  };

  const handleAddRequest = () => {
    if (!selectedSupply || quantity < 1) return;

    addRequest({
      supplyId: selectedSupply.id,
      supplyName: selectedSupply.name,
      quantity,
    });

    setSearchQuery('');
    setSelectedSupply(null);
    setQuantity(1);
    setTimeout(() => searchBarRef.current?.focus(), 0);
  };

  const canAdd = selectedSupply && quantity > 0;
  const canSubmit = requests.length > 0 && !submitting;

  return (
    <div className="min-h-screen bg-gray-50 pb-14 md:pb-0">
      <Header />
      
      <main className="mx-auto max-w-4xl p-4">
        <PurchaseForm
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSupplySelect={handleSupplySelect}
          quantity={quantity}
          onQuantityChange={setQuantity}
          onAdd={handleAddRequest}
          canAdd={canAdd}
          searchBarRef={searchBarRef}
          quantityInputRef={quantityInputRef}
        />

        {error && (
          <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <RequestList 
          requests={requests}
          onRemove={removeRequest}
        />

        <SubmitButton 
          onClick={submitRequests}
          disabled={!canSubmit}
          loading={submitting}
        />

        {success && (
          <SuccessMessage
            branchName={success.branchName}
            timestamp={success.timestamp}
            onClose={clearSuccess}
          />
        )}
      </main>
    </div>
  );
}