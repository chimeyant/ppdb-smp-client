import axios from "axios";

import auth from "./providers/AuthProviders";
import { domainURL } from "./.env";

export default () => {
  let headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  };

  if (auth && auth.token) {
    headers = Object.assign(
      {
        Authorization: auth.token,
      },
      headers
    );
  }

  return axios.create(
    {
      baseURL: domainURL.BASE,
      timeout: 1000,
    },
    headers
  );
};
