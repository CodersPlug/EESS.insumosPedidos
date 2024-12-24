import { base } from './airtableBase';
import { AIRTABLE_CONFIG } from '../config/airtable';
import { PurchaseRequest } from '../types/purchaseRequest';
import { validateBranchId } from './branchService';
import { validateSupplyId } from './supplyService';

export const submitPurchaseRequests = async (requests: PurchaseRequest[]): Promise<void> => {
  if (!requests.length) {
    throw new Error('No hay pedidos para enviar');
  }

  try {
    // Validate all requests before submitting
    for (const request of requests) {
      const [isValidBranch, isValidSupply] = await Promise.all([
        validateBranchId(request.branchId),
        validateSupplyId(request.supplyId)
      ]);

      if (!isValidBranch) {
        throw new Error(`Sucursal inválida: ${request.supplyName}`);
      }

      if (!isValidSupply) {
        throw new Error(`Insumo inválido: ${request.supplyName}`);
      }
    }

    // Create records in batches
    const records = requests.map(request => ({
      fields: {
        SucursalID: [request.branchId],
        InsumoID: [request.supplyId],
        PedidoCantidad: request.quantity
      }
    }));

    // Process in batches of 10 (Airtable's limit)
    for (let i = 0; i < records.length; i += 10) {
      const batch = records.slice(i, i + 10);
      await base(AIRTABLE_CONFIG.ordersTableId).create(batch);
    }
  } catch (error) {
    console.error('Error submitting purchase requests:', error);
    if (error instanceof Error) {
      throw error; // Preserve the original error message
    }
    throw new Error('Error al enviar los pedidos');
  }
}