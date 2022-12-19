import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
// import axios from "axios";
// import { getToken } from "../components/GetToken";
// import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
// import FormControl from "@mui/material/FormControl";
// import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

import { ShowInfo } from "../components/showinfo";
import { ShowInfoPhone} from "../components/showInfoPhone"
import "./profile.css";

export const Profile = () => {
  const [info, setInfo] = useState({});
  const [infoPhone, setInfoPhone] = useState({});
  // const [authURL, setauthURL] = useState(null);
  // console.log(authURL)

  // const sp = new URLSearchParams(window.location.search);
  // console.log(info);
  // let code = sp.get("code");
  // let state = url.searchParams.get("state");
  // let nonce = url.searchParams.get("nonce");
  // let correlation_id = url.searchParams.get("correlation_id");
  // console.log("code:", code);

  let history = useHistory();
  let jwt = localStorage.getItem("token");
  // console.log(jwt);
  if (jwt === null || jwt === "") {
    history.push("/redirect");
  }

  // const [Authorization, setAuthorization] = useState("");

  // // console.log(Authorization);
  // const handleChange = (event) => {
  //   setAuthorization(event.target.value);
  // };

  // const sendMessage = () => {
  //   console.log("function start");
  //   if (!popup) {
  //     alert("You haven't opened the popup yet!");
  //     return;
  //   }

  //   popup.postMessage("parent Message", "*");
  // };

  var popup;
  var phone_info_page;
  function openPopup() {
    popup = window.open(
      "http://localhost:3001/popup",
      "popUpWindow",
      "height=700,width=600,left=300,top=100"
    );
  }

  function openPopupPhone() {
    phone_info_page = window.open(
      "http://localhost:3001/phonenumber",
      "phoneNumberWindow",
      "height=700,width=600,left=300,top=100"
    );
  }

  const receiveMessage = (event) => {
    console.log(event.data)
    const { data } = event.data;
    if ( typeof popup !== "undefined" && Object.keys(data).length !== 0 && event?.data?.name === "getInfoId") {
      
      setInfo((info) => ({ ...data }));
      popup.close();
    }
    if(typeof phone_info_page !== "undefined" && Object.keys(data).length !== 0 && event?.data?.name === "getInfoPhone") {
      setInfoPhone((infoPhone) => ({...data}))
      phone_info_page.close();
    }
  };

  window.addEventListener("message", receiveMessage, false);

  useEffect(() => {}, [info, infoPhone]);
  console.log(infoPhone);
  return (
    <div>
      <div>شما وارد شده اید</div>

      <Button variant="contained" disableRipple onClick={() => openPopup()}>
        get Info from nationalId
      </Button>
      <Button
        variant="contained"
        disableRipple
        onClick={() => openPopupPhone()}
      >
        get Info from phoneNumber
      </Button>
      {/* <Button variant="contained" disableRipple onClick={() => sendMessage()}>
        send Message
      </Button> */}
      {Object.keys(info).length !== 0 ? <ShowInfo info={info}></ShowInfo> : ""}
      {Object.keys(infoPhone).length !== 0 ? <ShowInfoPhone info={infoPhone} ></ShowInfoPhone>: ""}
    </div>
  );
};

export default function SelectSmall() {}
