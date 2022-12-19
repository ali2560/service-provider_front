import { useHistory } from "react-router-dom";
export const Home = () => {
  let history = useHistory();
  let jwt = localStorage.getItem("token");
  // console.log(jwt);
  if (jwt !== null && jwt !== "") {
    history.push("/profile");
  } else {
    history.push("/redirect");
  }
  // const url = new URL(window.location.href);
  // var code = url.searchParams.get("code");
  // console.log(code);
  // if (code !== null) {
  // }
  // const getTokenAuth = async (configGetCodeAuth) => {
  //   try {
  //     let response = await axios(configGetCodeAuth);
  //     console.log(typeof(response?.data?.access_token));
  //     if (response?.data?.access_token !== "" && typeof(response?.data?.access_token) !== 'undefined') {
  //       let token = response?.data?.access_token;
  //       localStorage.setItem("token", token);
  //       history.push("/profile");
  //     }
  //     //   window.location.replace(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //   }
  // };

  // useEffect(() => {
  //   if (code !== null) {
  //     let configGetCodeAuth = {
  //       method: "post",
  //       url: `${config.url}:${config.port}/token`,
  //       params: {
  //         code: `${code}`
  //       },
  //       headers: {},
  //     };
  //     getTokenAuth(configGetCodeAuth);
  //   }
  //   // eslint-disable-next-line
  // }, []);
  return <div>Home</div>;
};
