import Airtable from 'airtable';
import { AIRTABLE_CONFIG } from '../config/airtable';

export const base = new Airtable({ apiKey: AIRTABLE_CONFIG.apiKey }).base(AIRTABLE_CONFIG.baseId);