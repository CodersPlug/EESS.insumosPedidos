import { base } from './airtableBase';
import { AIRTABLE_CONFIG } from '../config/airtable';
import { Branch } from '../types/branch';

export const getBranches = async (): Promise<Branch[]> => {
  try {
    const records = await base(AIRTABLE_CONFIG.branchesTableId)
      .select({
        fields: ['SucursalID'],
        sort: [{ field: 'SucursalID', direction: 'asc' }],
      })
      .all();

    return records.map((record) => ({
      id: record.id,
      name: record.get('SucursalID') as string,
    }));
  } catch (error) {
    console.error('Error fetching branches:', error);
    throw new Error('Error al cargar las sucursales');
  }
};

export const validateBranchId = async (branchId: string): Promise<boolean> => {
  try {
    const record = await base(AIRTABLE_CONFIG.branchesTableId).find(branchId);
    return !!record;
  } catch {
    return false;
  }
};

export const getBranchName = async (branchId: string): Promise<string | null> => {
  try {
    const record = await base(AIRTABLE_CONFIG.branchesTableId).find(branchId);
    return record ? (record.get('SucursalID') as string) : null;
  } catch (error) {
    console.error('Error fetching branch name:', error);
    return null;
  }
};