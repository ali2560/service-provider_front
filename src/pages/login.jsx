import axios from "axios";
import { useEffect, useState } from "react";

// import { Buffer } from "buffer";
import Button from "@mui/material/Button";
import config from '../config/config'

import './login.css'

export const Login = () => {
 
  const [authURL, setauthURL] = useState(null);
  // console.log(authURL)

  const sp = new URLSearchParams(window.location.search);
  console.log(sp)
  let mcc_mnc = sp.get("mcc_mnc");
  let subscriberId = sp.get("subscriber_id");
  let code = sp.get("code");
  // let state = url.searchParams.get("state");
  // let nonce = url.searchParams.get("nonce");
  // let correlation_id = url.searchParams.get("correlation_id"); 
  console.log('code:', code)
  

  var url = "";
  useEffect(() => {
    if (mcc_mnc !== null) {
      let temp = mcc_mnc.split("_");
      let mcc = parseInt(temp[0]);
      let mnc = parseInt(temp[1]);

      const configGetInfo = {
        method: "post",
        url: `${config.url}:${config.port}/info`,
        params: {
          mcc: mcc,
          mnc: mnc
        },
        headers: {},
      };
      getInfoOperator(configGetInfo);
    }
    if (subscriberId !== null && authURL !== null) {
      localStorage.setItem("subscriberId", subscriberId);
      let configGetCodeAuth = {
        method: "post",
        url: `${config.url}:${config.port}/code`,
        params: {
          login_hint: `ENCR_MSISDN:${subscriberId}`,
          url: `${authURL}`,
        },
      };
      getCodeAuth(configGetCodeAuth);
    }

    if (code !== null) {
      let configGetCodeAuth = {
        method: "post",
        url: `${config.url}:${config.port}/token`,
        params: {
          code: `${code}`
        },
        headers: {},
      };
      getTokenAuth(configGetCodeAuth);
    }
    // eslint-disable-next-line
  }, [authURL]);

  // const token = Buffer.from(
  //   `72ed03b0-c57d-49ed-ace1-0649ccd9acc4:f1dc035a-5d0d-438a-adc6-db98ec4a6739`,
  //   "utf8"
  // ).toString("base64");
  const configGetNameOperator = {
    method: "get",
    url: `${config.url}:${config.port}/name`,
    headers: {},
  };

  const getOperatorName = async () => {
    try {
      let response = await axios(configGetNameOperator);
      console.log(response.data);
      url = response.data;
      console.log(url)
      window.location.replace(url);
    } catch (err) {
      console.log(err);
    } finally {
      window.location.replace(url);
    }
  };

  const getInfoOperator = async (configGetInfo) => {
    try {
      let response = await axios(configGetInfo);
      // console.log(response.data?.response?.apis?.operatorId);
      setauthURL(response.data?.response?.apis?.operatorId?.links[0]?.href);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const getCodeAuth = async (configGetCodeAuth) => {
    try {
      let response = await axios(configGetCodeAuth);
      // console.log("getCodeAuth:", response.data);
      window.location.replace(response.data);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const getTokenAuth = async (configGetCodeAuth) => {
    try {
      let response = await axios(configGetCodeAuth);
      console.log(typeof(response?.data?.id_token));
      if (response?.data?.id_token !== "" && typeof(response?.data?.id_token) !== 'undefined') {
        let token = response?.data?.id_token;
        localStorage.setItem("token", token);
        window.location.replace(`${config.localhost_url}/profile`);
      }
      //   window.location.replace(response.data);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  return (
    <div className="d-flex justify-content-center container">
      <Button
        variant="contained"
        disableRipple
        onClick={() => getOperatorName()}
      >
        login with mobile connect
      </Button>
    </div>
  );
};
