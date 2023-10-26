import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, lastValueFrom } from "rxjs";

import { Province } from "../models/master/province";
import { Locality } from "../models/master/locality";
import { LocalityService } from "../services/master/locality.service";
import { ProvinceService } from "../services/master/province.service";
import { SexService } from "../services/master/sex.service";
import { SpeciesService } from "../services/master/species.service";
import { RaceService } from "../services/master/race.service";
import { CoatService } from "../services/master/coat.service";
import { Sex } from "../models/master/sex";
import { Species } from "../models/master/species";
import { Race } from "../models/master/race";
import { Coat } from "../models/master/coat";
import { ProductService } from "../services/inventory/product.service";



@Injectable({
    providedIn: 'root'
})
export class MasterCacheService {
    private lock = false;
    private interval;
    private pendingProvince = new BehaviorSubject(null);
    private pendingLocality = new BehaviorSubject(null);
    private pendingSex = new BehaviorSubject(null);
    private pendingSpecies = new BehaviorSubject(null);
    private pendingRace = new BehaviorSubject(null);
    private pendingCoat = new BehaviorSubject(null);

    constructor(private provinceService: ProvinceService,
      private localityService: LocalityService,
      private sexService: SexService,
      private speciesService: SpeciesService,
      private raceService: RaceService,
      private coatService: CoatService,
      private productService: ProductService
    ) {
    }

    getCacheAndUpdate(key: string, resultsFunction: Observable<any>, expirationDays = 1): Promise<any> {
        return new Promise<any>(resolve => {
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
                const subscription = resultsFunction.subscribe(results => {
                    if (results) {
                        const exDate = new Date();
                        exDate.setDate(exDate.getDate() + expirationDays);
                        localStorage.setItem(key, JSON.stringify({
                            content: results,
                            expirationDate: exDate.toISOString()
                        }));
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
                resolve(cacheData)
            }
        });

    }

    getLocalities() {
        return this.getCacheAndUpdate('localities', this.localityService.findAllLocality());
    }

    getProvinces() {
        return this.getCacheAndUpdate('provinces', this.provinceService.findAllProvince());
    }

    getSex() {
        return this.getCacheAndUpdate('sexes', this.sexService.findAllSex());
    }

    getCoat() {
        return this.getCacheAndUpdate('coats', this.coatService.findAllCoat());
    }

    getSpecies() {
        return this.getCacheAndUpdate('species', this.speciesService.findAllSpecies());
    }

    getRace() {
        return this.getCacheAndUpdate('races', this.raceService.findAllRace());
    }

    getProducts() {
        return this.getCacheAndUpdate('products', this.productService.findAllProduct());
    }



    storeItemToSend(key, itemData) {
        const cachedData = localStorage.getItem(key);
        let parsedData;
        if (cachedData) {
            parsedData = JSON.parse(cachedData);
        } else {
            parsedData = [];
        }
        parsedData.push(itemData)
        localStorage.setItem(key, JSON.stringify(parsedData));
    }


    /**
     * Envia la provincia al backend
     * @param item
     * @returns
     */
    sendNewProvince(item) {
        return lastValueFrom(this.provinceService.createProvince({ body: item }));
    }

    /**
     * Envia la localidad al backend
     * @param item
     * @returns
     */
    sendNewLocality(item) {
        return lastValueFrom(this.localityService.createLocality({ body: item }));
    }

    /**
     * Send the object to the backend
     * @param item
     * @returns
     */
    sendNewSex(item) {
        return lastValueFrom(this.sexService.createSex({ body: item }));
    }
    /**
     * Send the object to the backend
     * @param item
     * @returns
     */
    sendNewCoat(item) {
        return lastValueFrom(this.coatService.createCoat({ body: item }));
    }

    /**
     * Send the object to the backend
     * @param item
     * @returns
     */
    sendNewSpecies(item) {
        return lastValueFrom(this.speciesService.createSpecies({ body: item }));
    }

    /**
     * Send the object to the backend
     * @param item
     * @returns
     */
    sendNewRace(item) {
        return lastValueFrom(this.raceService.createRace({ body: item }));
    }


    /**
     * Almacena una provincia para ser enviada
     * @param itemData
     */
    async newProvince(itemData: Province) {
        this.storeItemToSend('newProvince', itemData);
        this.syncPending();

    }

    /**
     * Almacena una localidad para ser enviada
     * @param itemData
     */
    async newLocality(itemData: Locality) {
        this.storeItemToSend('newLocality', itemData);
        this.syncPending();

    }

    /**
     * Save an object in localstorage to send to the backend
     * @param itemData
     */
    async newSex(itemData: Sex) {
        this.storeItemToSend('newSex', itemData);
        this.syncPending();

    }

    /**
     * Save an object in localstorage to send to the backend
     * @param itemData
     */
    async newSpecies(itemData: Species) {
        this.storeItemToSend('newSpecies', itemData);
        this.syncPending();

    }


    /**
     * Save an object in localstorage to send to the backend
     * @param itemData
     */
    async newRace(itemData: Race) {
        this.storeItemToSend('newRace', itemData);
        this.syncPending();

    }

    /**
     * Save an object in localstorage to send to the backend
     * @param itemData
     */
    async newCoat(itemData: Coat) {
        this.storeItemToSend('newCoat', itemData);
        this.syncPending();

    }


   /**
    * Obtiene los registros pendientes de provincias
    * @returns pending element
    */
    getPendingProvince() {
        this.checkPending();
        return this.pendingProvince;
    }

     /**
    * Obtiene los registros pendientes de localidades
    * @returns pending element
    */
    getPendingLocality() {
        this.checkPending();
        return this.pendingProvince;
    }


    /**
    * Get the pending registries to send
    * @returns pending element
    */
    getPendingSex() {
        this.checkPending();
        return this.pendingSex;
    }

    /**
    * Get the pending registries to send
    * @returns pending element
    */
    getPendingSpecies() {
        this.checkPending();
        return this.pendingSpecies;
    }



    /**
    * Get the pending registries to send
    * @returns pending element
    */
    getPendingRace() {
        this.checkPending();
        return this.pendingRace;
    }


    /**
    * Get the pending registries to send
    * @returns pending element
    */
    getPendingCoat() {
        this.checkPending();
        return this.pendingCoat;
    }





    async syncPending() {
        const sendMethods = {
            newProvince : (item) => this.sendNewProvince(item),
            newLocality: (item) => this.sendNewLocality(item),
            newSex: (item) => this.sendNewSex(item),
            newSpecies: (item) => this.sendNewSpecies(item),
            newCoat: (item) => this.sendNewCoat(item),
            newRace: (item) => this.sendNewRace(item),



        };
        const pendingObservable = {
          newProvince: this.pendingProvince,
          newLocality: this.pendingLocality,
          newSex: this.pendingSex,
          newRace: this.pendingRace,
          newSpecies: this.pendingSpecies,
          newCoat: this.pendingCoat,
        };

        if (!this.lock) {
            this.lock = true;
            try {
                for (const key of [ 'newProvince', 'newLocality', 'newSex', 'newRace', 'newSpecies', 'newCoat']) {
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
                                console.log('No se puede enviar', item)
                            }
                        }

                    } else {
                        pendingObservable[key].next(0);
                    }
                }
            } catch (e) {
                console.error(e)
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
