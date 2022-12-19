import config from "../config/config";

export const Logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("subscriberId");
  
  window.location.replace(`${config.localhost_url}`);
  return <div>شما خارج شده اید</div>;
};
