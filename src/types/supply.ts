export interface Supply {
  id: string;
  name: string;
}

export interface SupplySearchState {
  data: Supply[];
  loading: boolean;
  error: string | null;
}