/* tslint:disable */

import { Batch } from './batch';

/* eslint-disable */
export class Product {
  '_id': string;
  active: boolean;
  deleted: boolean;
  id: number;
  name: string;
  providerId: number;
  typeProductId: number;
  unityTypeId: number;
  showStore: boolean;
  batches: Batch[];
  description: string;
  price: number;
  finalPrice: number;
  taxTypeId: number;
}
