import React from 'react';
import { Dropdown } from './ui/Dropdown';
import { useBranches } from '../hooks/useBranches';
import { useBranchStore } from '../hooks/useBranchSelection';

export function UserMenu() {
  const { data: branches, loading, error } = useBranches();
  const { selectedBranchId, setSelectedBranchId } = useBranchStore();

  if (loading) {
    return (
      <div className="h-9 w-40 animate-pulse rounded-md bg-gray-100">
        <div className="h-full w-full rounded bg-gray-200" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-md px-3 py-2 text-sm text-red-500">
        Error al cargar sucursales
      </div>
    );
  }

  const options = branches.map(branch => ({
    id: branch.id,
    label: branch.name,
  }));

  return (
    <div className="w-40">
      <Dropdown
        options={options}
        value={selectedBranchId}
        onChange={setSelectedBranchId}
        placeholder="Seleccionar sucursal"
      />
    </div>
  );
}