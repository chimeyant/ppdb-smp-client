import * as CryptoJS from "crypto-js";
import WebStorage from "secure-web-storage";

import { siteKey, secretKey } from "../.env";

class TimeLeft {
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
}

export default new TimeLeft();