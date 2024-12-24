import React from 'react';
import { ClipboardList } from 'lucide-react';
import { UserMenu } from './UserMenu';

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-6 w-6 text-blue-500" />
          <h1 className="text-2xl font-medium">Pedidos</h1>
        </div>
        
        <UserMenu />
      </div>
    </header>
  );
}