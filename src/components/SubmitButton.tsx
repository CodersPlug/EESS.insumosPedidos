import React from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export function SubmitButton({ onClick, disabled = false, loading = false }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        fixed bottom-0 left-0 right-0 h-14 w-full
        text-lg font-medium text-white transition-colors 
        md:static md:mt-8 md:h-12 md:rounded-md
        ${disabled || loading
          ? 'cursor-not-allowed bg-gray-300' 
          : 'bg-blue-500 hover:bg-blue-600'
        }
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-5 w-5 animate-spin" />
          <span>Enviando...</span>
        </div>
      ) : (
        'Enviar'
      )}
    </button>
  );
}