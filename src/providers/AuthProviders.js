import * as CryptoJS from "crypto-js";
import WebStorage from "secure-web-storage";

import { siteKey, secretKey } from "../.env";

class AuthProviders {
  constructor() {
    this.siteKey = siteKey;
    this.secretKey = secretKey;

    this.store = new WebStorage(localStorage, {
      hash: function hash(key) {
        key = CryptoJS.SHA256(key, secretKey);

        return key.toString();
      },

      encrypt: function encrypt(data) {
        data = CryptoJS.AES.encrypt(data, secretKey);

        data = data.toString();

        return data;
      },

      decrypt: function decrypt(data) {
        data = CryptoJS.AES.decrypt(data, secretKey);

        data = data.toString(CryptoJS.enc.Utf8);

        return data;
      },
    });
  }

  /**
   * get the current apps
   */
  get info() {
    let info = this.store.getItem("info");

    return info ? info : {};
  }

  /**
   * set the current info to store
   */
  set info(response) {
    if (!response) {
      return;
    }

    this.store.setItem("info", response);
  }

  /**
   * get the current user
   */
  get user() {
    let user = this.store.getItem("user");
    return user ? user : {};
  }

  /**
   * set the current user to store
   */
  set user(response) {
    if (!response) {
      return;
    }

    this.store.setItem("user", response);
  }

  /**
   * get the modules for the current user
   */
  get modules() {
    return this.store.getItem("modules");
  }

  /**
   * set the modules to the store for the current user
   */
  set modules(modules) {
    if (!modules) return;

    this.store.setItem("modules", modules);
  }

  /**
   * get the domain URL for backend data
   */
  get domainURL() {
    return this.store.getItem("domain_url");
  }

  /**
   * set the domain URL for backend data
   */
  set domainURL(domainURL) {
    if (!domainURL) return;

    this.store.setItem("domain_url", domainURL);
  }

  /**
   * get the active module URL for backend data
   */
  get moduleURL() {
    return this.store.getItem("module_url");
  }

  /**
   * set the active module URL for backend data
   */
  set moduleURL(moduleURL) {
    if (!moduleURL) return;

    this.store.setItem("module_url", moduleURL);
  }

  /**
   * get the menus for active module
   */
  get menus() {
    let menus = this.store.getItem("menus");

    return menus ? menus : {};
  }

  /**
   * set the menus for active module
   */
  set menus(menus) {
    if (!menus) return;

    this.store.setItem("menus", menus);
  }

  /**
   * get route registed status
   */
  get registed() {
    return this.store.getItem("registed");
  }

  /**
   * set route registed status
   */
  set registed(registed) {
    if (!registed) return;

    this.store.setItem("registed", registed);
  }

  /**
   * get the domain URL for backend data
   */
  get theme() {
    return this.store.getItem("theme");
  }

  /**
   * set the domain URL for backend data
   */
  set theme(theme) {
    if (!theme) return;

    this.store.setItem("theme", theme);
  }

  /**
   * get the active user token
   */
  get token() {
    if (
      !this.store.getItem("token") ||
      this.store.getItem("token").type === null
    ) {
      return null;
    }

    return (
      this.store.getItem("token").type + " " + this.store.getItem("token").token
    );
  }

  /**
   * set the active user token
   */
  set token(response) {
    if (!response) return;

    this.store.setItem("token", response);
    this.store.setItem("token_create_at", Date.now());
  }

  /**
   * get the page csrf
   */
  get csrf() {
    return document.head.querySelector('meta[name="csrf-token"]').content;
  }

  /**
   * get expired status from current token
   */
  get expired() {
    let minute = parseInt(
      (Date.now() - parseInt(this.store.getItem("token_create_at"))) / 1000
    );
    let expire = parseInt(this.store.getItem("token").expires_in);

    return minute >= expire;
  }

  /**
   * get check status of current token
   */
  get check() {
    try {
      if (!this.store.getItem("token")) {
        return false;
      }

      return !!this.store.getItem("token").token; //&& !this.expired;
    } catch (error) {
      this.store.clear();

      return false;
    }
  }

  /**
   * get logged status of the current token
   */
  get logged() {
    return this.store.getItem("token") !== null;
  }

  get stores() {
    return this.store;
  }

  /**
   * clear all store data
   */
  clear() {
    this.store.clear();
  }
}

export default new AuthProviders();
