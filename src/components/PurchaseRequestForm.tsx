import React from 'react';
import { PurchaseRequestFormData } from '../types';
import { translations } from '../constants/translations';

interface Props {
  onSubmit: (data: PurchaseRequestFormData) => void;
}

export function PurchaseRequestForm({ onSubmit }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data: PurchaseRequestFormData = {
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      amount: Number(formData.get('amount')),
      requester: formData.get('requester') as string,
    };
    onSubmit(data);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          {translations.labels.title}
        </label>
        <input
          type="text"
          name="title"
          id="title"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          {translations.labels.description}
        </label>
        <textarea
          name="description"
          id="description"
          required
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2"
        />
      </div>

      <div>
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
          {translations.labels.amount}
        </label>
        <input
          type="number"
          name="amount"
          id="amount"
          required
          min="0"
          step="0.01"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2"
        />
      </div>

      <div>
        <label htmlFor="requester" className="block text-sm font-medium text-gray-700">
          {translations.labels.requester}
        </label>
        <input
          type="text"
          name="requester"
          id="requester"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 bg-white p-2"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {translations.buttons.submit}
      </button>
    </form>
  );
}