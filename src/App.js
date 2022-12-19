// import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Profile } from "./pages/profile";
import { Logout } from "./pages/logout";
import { Popup} from './pages/getInfoIdentity';
import { Phone} from './pages/getphone';
// import { useHistory } from "react-router-dom";

import "./App.css";

function App() {
  // let history = useHistory();

  // const [loginStatus, setLoginStatus] = useState('login')
  var loginStatus = "login";
  let jwt = localStorage.getItem("token");
  if (jwt !== null && jwt !== "") {
    // setLoginStatus('log out')
    loginStatus = "log out";
  }

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {loginStatus === "login" ? (
              <li>
                <Link to="/redirect">login</Link>
              </li>
            ) : (
              <li>
                <Link to="/logout">log out</Link>
              </li>
            )}
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/redirect">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/popup">
            <Popup />
          </Route>
          <Route path="/phonenumber">
            <Phone />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
