export interface PurchaseRequest {
  id: string;
  branchId: string;
  supplyId: string;
  supplyName: string;
  quantity: number;
  createdAt: string;
}

export interface PurchaseRequestsState {
  items: PurchaseRequest[];
}