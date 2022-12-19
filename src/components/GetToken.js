import axios from "axios";

import config from '../config/config'

export const getToken = async (configGetCodeAuth, keyName) => {
    console.log(configGetCodeAuth)
    console.log(keyName)
  try {
    let response = await axios(configGetCodeAuth);
    console.log(typeof response?.data?.id_token);
    if (
      response?.data?.access_token !== "" &&
      typeof response?.data?.access_token !== "undefined"
    ) {
      let token = response?.data?.access_token;
      localStorage.setItem(keyName, token);
      window.location.replace(`${config.localhost_url}/profile`);
    }
    //   window.location.replace(response.data);
  } catch (err) {
    console.log(err);
  } finally {
  }
};
