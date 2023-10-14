/* tslint:disable */

import { Debt } from './debt';
import { Pet } from './pet';

/* eslint-disable */
export class Client {
  /**
   * province id reference
   */
  Dep: number;

  /**
   * country identification number
   */
  Identif: string;

  /**
   * locality id reference
   */
  Loc: number;

  /**
   * mongo id
   */
  '_id': string;

  /**
   * full description
   */
  ayn: string;

  /**
   * debt quantity
   */
  cantidadDeuda: string;

  /**
   * postal code
   */
  codp: string;

  /**
   * postal code
   */
  codp2: string;

  /**
   * mongo id
   */
  codt: string;
  codt2: string;

  /**
   * indicates if the client have debt
   */
  deuda: boolean;

  /**
   * address
   */
  dir: string;

  /**
   * email
   */
  email: string;

  /**
   * register date
   */
  feci: string;
  fecu: string;

  /**
   * sql id
   */
  idc: number;

  /**
   * Indicates if the client has writed lopd document
   */
  lopd: boolean;
  mark: number;

  /**
   * list of pets
   */
  mascotas: Array<Pet>;
  motuv: string;
  obra: number;

  /**
   * client observations
   */
  obs: string;

  /**
   * Indicates if the client is dangerous
   */
  problematico: boolean;
  tel: string;

  /**
   * phone
   */
  tel2: string;
  telC: string;

  /**
   * movile phone
   */
  telC2: string;

  /**
   * Client debts
   */
  debts: Array<Debt>;
}
