import { base } from './airtableBase';
import { AIRTABLE_CONFIG } from '../config/airtable';
import { Supply } from '../types/supply';

export const searchSupplies = async (query: string): Promise<Supply[]> => {
  if (!query.trim()) return [];
  
  try {
    const records = await base(AIRTABLE_CONFIG.suppliesTableId)
      .select({
        fields: ['InsumoID'],
        filterByFormula: `SEARCH(LOWER("${query}"), LOWER({InsumoID}))`,
        maxRecords: 10,
      })
      .all();

    return records.map((record) => ({
      id: record.id,
      name: record.get('InsumoID') as string,
    }));
  } catch (error) {
    console.error('Error searching supplies:', error);
    throw new Error('Error al buscar insumos');
  }
};

export const validateSupplyId = async (supplyId: string): Promise<boolean> => {
  try {
    const record = await base(AIRTABLE_CONFIG.suppliesTableId).find(supplyId);
    return !!record;
  } catch {
    return false;
  }
};

export const createSupply = async (name: string): Promise<Supply> => {
  try {
    // First check if supply already exists
    const existingRecords = await base(AIRTABLE_CONFIG.suppliesTableId)
      .select({
        fields: ['InsumoID'],
        filterByFormula: `{InsumoID} = '${name}'`,
        maxRecords: 1,
      })
      .all();

    if (existingRecords.length > 0) {
      return {
        id: existingRecords[0].id,
        name: existingRecords[0].get('InsumoID') as string,
      };
    }

    // Create new supply if it doesn't exist
    const record = await base(AIRTABLE_CONFIG.suppliesTableId).create({
      InsumoID: name,
    });

    return {
      id: record.id,
      name: record.get('InsumoID') as string,
    };
  } catch (error) {
    console.error('Error creating supply:', error);
    throw new Error('Error al crear el insumo');
  }
};