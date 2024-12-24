export interface Branch {
  id: string;
  name: string;
}

export interface BranchesState {
  data: Branch[];
  loading: boolean;
  error: string | null;
  selected: string | null;
}