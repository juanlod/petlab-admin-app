import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { StoreProviderService } from '../services/inventory/store-provider.service';
import { ProductTypeService } from '../services/inventory/product-type.service';
import { UnityTypeService } from '../services/inventory/unity-type.service';
import { StoreProvider } from '../models/inventory/store-provider';
import { UnityType } from '../models/inventory/unity-type';
import { ProductType } from '../models/inventory/product-type';

@Injectable({
  providedIn: 'root',
})
export class InventoryCacheService {
  private lock = false;
  private interval;
  private pendingUnityType = new BehaviorSubject(null);
  private pendingProvider = new BehaviorSubject(null);
  private pendingProductType = new BehaviorSubject(null);

  constructor(
    private unityService: UnityTypeService,
    private providerService: StoreProviderService,
    private productTypeServive: ProductTypeService
  ) {}

  getCacheAndUpdate(
    key: string,
    resultsFunction: Observable<any>,
    expirationDays = 1
  ): Promise<any> {
    return new Promise<any>((resolve) => {
      const cachedData = localStorage.getItem(key);
      let cacheData;
      let request = false;
      if (cachedData) {
        // The info is in the cache
        const parsedData = JSON.parse(cachedData);
        if (new Date() > new Date(parsedData['expirationDate'])) {
          // The data is old, we will return what we have but we are going to refresh de cache
          request = true;
        }
        cacheData = parsedData['content'];
      } else {
        // No data in cache... we have to get it
        request = true;
      }
      if (request) {
        // We have to get the data, to update the cache or to return it
        const subscription = resultsFunction.subscribe((results) => {
          if (results) {
            const exDate = new Date();
            exDate.setDate(exDate.getDate() + expirationDays);
            localStorage.setItem(
              key,
              JSON.stringify({
                content: results,
                expirationDate: exDate.toISOString(),
              })
            );
            if (!cacheData) {
              // That is the first time because we don't have the data in the cache, so we have to resolve it now
              resolve(results);
            }
            subscription.unsubscribe();
          }
        });
      }
      if (cacheData) {
        // We have parsedData from cache, let's return it
        resolve(cacheData);
      }
    });
  }

  getUnities() {
    return this.getCacheAndUpdate(
      'product-unities',
      this.unityService.findAllUnityType()
    );
  }


  getProductTypes() {
    return this.getCacheAndUpdate(
      'product-types',
      this.productTypeServive.findAllProductType()
    );
  }
    getProviders() {
    return this.getCacheAndUpdate(
      'product-providers',
      this.providerService.findAllStoreProvider()
    );
  }


  storeItemToSend(key, itemData) {
    const cachedData = localStorage.getItem(key);
    let parsedData;
    if (cachedData) {
      parsedData = JSON.parse(cachedData);
    } else {
      parsedData = [];
    }
    parsedData.push(itemData);
    localStorage.setItem(key, JSON.stringify(parsedData));
  }

  /**
   * Envia la provincia al backend
   * @param item
   * @returns
   */
  sendNewUnityType(item) {
    return lastValueFrom(this.unityService.createUnityType({ body: item }));
  }

  /**
   * Envia la localidad al backend
   * @param item
   * @returns
   */
  sendNewProductType(item) {
    return lastValueFrom(this.productTypeServive.createProductType({ body: item }));
  }

  /**
   * Send the object to the backend
   * @param item
   * @returns
   */
  sendNewProductProvider(item) {
    return lastValueFrom(this.providerService.createStoreProvider({ body: item }));
  }


  /**
   * Almacena una provincia para ser enviada
   * @param itemData
   */
  async newProductProvider(itemData: StoreProvider) {
    this.storeItemToSend('newProductProvider', itemData);
    this.syncPending();
  }

  /**
   * Almacena una localidad para ser enviada
   * @param itemData
   */
  async newUnityType(itemData: UnityType) {
    this.storeItemToSend('newUnityType', itemData);
    this.syncPending();
  }

  /**
   * Save an object in localstorage to send to the backend
   * @param itemData
   */
  async newProductType(itemData: ProductType) {
    this.storeItemToSend('newProductType', itemData);
    this.syncPending();
  }



  /**
   * Obtiene los registros pendientes de provincias
   * @returns pending element
   */
  getPendingProviders() {
    this.checkPending();
    return this.pendingProvider;
  }

  /**
   * Obtiene los registros pendientes de localidades
   * @returns pending element
   */
  getPendingUnityType() {
    this.checkPending();
    return this.pendingUnityType;
  }

  /**
   * Get the pending registries to send
   * @returns pending element
   */
  getPendingProductType() {
    this.checkPending();
    return this.pendingProductType;
  }



  async syncPending() {
    const sendMethods = {
      newProductProvider: (item) => this.sendNewProductProvider(item),
      newUnityType: (item) => this.sendNewUnityType(item),
      newProductType: (item) => this.sendNewProductType(item),
    };
    const pendingObservable = {
      newProductProvider: this.pendingProductType,
      newUnityType: this.pendingUnityType,
      newProductType: this.pendingProductType,

    };

    if (!this.lock) {
      this.lock = true;
      try {
        for (const key of [
          'newProductProvider',
          'newUnityType',
          'newProductType',
        ]) {
          const cachedData = localStorage.getItem(key);
          if (cachedData) {
            const parsedData = JSON.parse(cachedData);
            const pending = [...parsedData];
            pendingObservable[key].next(pending.length);
            for (const item of parsedData) {
              try {
                await sendMethods[key](item);
                pending.shift();
                if (pending.length > 0) {
                  localStorage.setItem(key, JSON.stringify(pending)); // Update array in case of loss
                } else {
                  localStorage.removeItem(key);
                }
              } catch (e) {
                console.log('No se puede enviar', item);
              }
            }
          } else {
            pendingObservable[key].next(0);
          }
        }
      } catch (e) {
        console.error(e);
      }
      this.lock = false;
      // release lock
    }
  }

  checkPending() {
    if (!this.interval) {
      this.syncPending();
      this.interval = setInterval(() => this.syncPending(), 10 * 1000);
    }
  }
}
