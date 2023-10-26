/* tslint:disable */
/* eslint-disable */
export class PetHistory {

  /**
   * mongo id
   */
  '_id'?: string;

  /**
   * photography size
   */
  cantFotos?: number;

  /**
   * desease information
   */
  cli?: string = '';

  /**
   * reason for medical consultation
   */
  consultationReason?: string = '';

  /**
   * creation date
   */
  fec?: string;

  /**
   * sql id
   */
  idClinica?: number;

  /**
   * pet id
   */
  idm?: number;
  idu?: number;

  /**
   * weight
   */
  pes?: number;

  /**
   * temperature
   */
  tmp?: number;


  /**
   * type of register
   */
  type?: string;


  /**
   * Indica si se fija al principio
   */
  fixed?: boolean;
}
