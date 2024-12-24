export interface PurchaseRequest {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  date: string;
  requester: string;
}

export type PurchaseRequestFormData = Omit<PurchaseRequest, 'id' | 'date' | 'status'>;