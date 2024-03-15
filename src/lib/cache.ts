import { EventEmitter } from "@solana/wallet-adapter-base";

export class Cache extends EventEmitter {
  get<T>(key: string, initialValue: T | null = null) {
    const loadedValue = window.localStorage.getItem(key);
    if (loadedValue) return JSON.parse(loadedValue) as T;
    return initialValue;
  }

  set<T>(key: string, value: T) {
    window.localStorage.setItem(key, JSON.stringify(value));
    this.emit("update", { key, value });
  }

  static #instance: Cache;

  static get instance() {
    if (!Cache.#instance) Cache.#instance = new Cache();
    return Cache.#instance;
  }
}
