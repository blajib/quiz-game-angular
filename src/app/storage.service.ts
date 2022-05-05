import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    const storage = await this.storage.create();
    // eslint-disable-next-line no-underscore-dangle
    this._storage = storage;
  }

  // Create and expose methods that users of this service can
  // call, for example:
  public set(key: string, value: any) {
    this.storage?.set(key, value);
  }

  async get(key: string) {
    return await this.storage.get(key);
  }

  public remove(key: string) {
    this.storage.remove(key);
  }

  async ifExist(key: string) {
    //console.log('pseudo', this.storage.get('isSaveInformations'));
    if (await this.storage.get(key)) {
      return true;
    }
    return false;
  }
}
