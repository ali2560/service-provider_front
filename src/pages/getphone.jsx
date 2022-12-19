import config from "../config/config";
import axios from "axios";
import { useEffect, useState } from "react";
export const Phone = () => {
  const [accessToken, setAccessToken] = useState(null)
  const [flag, setFlag] = useState(null)

  const sp = new URLSearchParams(window.location.search);
  console.log(sp);
  let code = sp.get("code");
  let subscriberId = localStorage.getItem("subscriberId");
  if (subscriberId !== null || subscriberId !== "") {
    console.log(subscriberId)
  }
  

  useEffect(() => {
    let configGetCodeNId = {
      method: "post",
      url: `${config.url}:${config.port}/getcodephone`,
      params: {
        login_hint: `ENCR_MSISDN:${subscriberId}`
      },
    };

    const getCodePhone = async (configGetCodeNId) => {
      var url = "";
      try {
        let response = await axios(configGetCodeNId);
        // console.log(response.data);
        url = response.data;
        // window.location.replace(response.data)
      } catch (err) {
        console.log(err);
      } finally {
        window.location.replace(url);
      }
    };

    const getTokenPhone = async (configGetTokenNId) => {
      try {
        let response = await axios(configGetTokenNId);
        // console.log(response.data.access_token);
        setAccessToken(response.data.access_token)
      } catch (err) {
        console.log(err);
      } finally {
        // window.location.replace(url);
        
      }
    };

    const getInfoPhone = async(configGetInfoNId) => {
      
      try {
        let response = await axios(configGetInfoNId);
        console.log(response.data);
        if (window.opener) {
          window.opener.postMessage({name: "getInfoPhone", data: response.data}, '*');
        }
        
      } catch (err) {
        console.log(err);
      } finally {
        // window.location.replace(url);
        setFlag(true)
      }
    }


    if (code === null) {
      getCodePhone(configGetCodeNId);
    }
    if (code !== null && accessToken === null) {
      let configGetTokenNId = {
        method: "post",
        url: `${config.url}:${config.port}/gettokenphone`,
        params: {
          code: `${code}`,
        },
        headers: {},
      };
      getTokenPhone(configGetTokenNId);
    }
    if(accessToken !== null && flag !== true){
      console.log("we are here")
      let configGetInfoNId = {
        method: "get",
        url: `${config.url}:${config.port}/getinfophone`,
        params: {
          accessToken: `${accessToken}`
        }
      }
      getInfoPhone(configGetInfoNId)
    }
    // eslint-disable-next-line
  }, [code, accessToken]);
  // window.addEventListener("message", function (event) {
  //   console.log(event.target.window.name)
  //   if (typeof event.data === "string") {
  //     console.log("popup: ", event);
  //     // window.opener.postMessage({success: "successMessage"}, "ali");
  //     window.opener.postMessage({name: event.target.window.name, data: {email: "ali@chmai.ir", address: "tehran"}}, "*");
  //   }
  // });

  

  return <div></div>;
};
