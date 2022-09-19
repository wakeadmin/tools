import { NoopObject } from '@wakeadmin/utils';

export class Cache {
  public keys: string[] = [];

  private cache: Record<string, any> = {};
  private recovered: Record<string, boolean> = {};

  constructor(private namespace: string = 'i18n') {
    this.recoverKeys();
  }

  set(locale: string, messages: any) {
    this.cache[locale] = messages;

    this.save(locale);
  }

  get(locale: string) {
    if (!this.recovered[locale]) {
      this.recover(locale);
      this.recovered[locale] = true;
    }

    return this.cache[locale] ?? NoopObject;
  }

  private save(locale: string) {
    window.localStorage.setItem(this.localeMessageKey(locale), JSON.stringify(this.cache[locale]));

    if (!this.keys.includes(locale)) {
      this.keys.push(locale);
      window.localStorage.setItem(this.keysKey(), JSON.stringify(this.keys));
    }
  }

  private recover(locale: string) {
    const value = window.localStorage.getItem(this.localeMessageKey(locale));

    if (value != null) {
      this.cache[locale] = JSON.parse(value);
    }
  }

  private recoverKeys(): string[] {
    const value = window.localStorage.getItem(this.keysKey());
    if (value) {
      this.keys = JSON.parse(value);
    }

    return this.keys;
  }

  private localeMessageKey(locale: string) {
    return `${this.namespace}_${locale}`;
  }

  private keysKey() {
    return `${this.namespace}_keys`;
  }
}
