import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';
import { formatDateTime } from '../utils/formatters';

interface Props {
  branchName: string;
  timestamp: string;
  onClose: () => void;
}

export function SuccessMessage({ branchName, timestamp, onClose }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto close after 5 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 animate-fade-in">
      <div className="rounded-lg bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <CheckCircle className="h-6 w-6 text-green-500" />
          </div>
          <div className="ml-3 w-0 flex-1">
            <p className="text-sm font-medium text-gray-900">
              Pedido enviado correctamente
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Sucursal: {branchName}
            </p>
            <p className="text-sm text-gray-500">
              Fecha: {formatDateTime(timestamp)}
            </p>
          </div>
          <div className="ml-4 flex flex-shrink-0">
            <button
              onClick={onClose}
              className="inline-flex rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <span className="sr-only">Cerrar</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}