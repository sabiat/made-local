import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Root from "./components/Root";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import ShopProfile from "./components/ShopProfile";
import ShopRegister from "./components/ShopRegister";
import Nav from "./components/Nav";
import { useState, useEffect } from "react";

import theme from "./styles/theme";
import Chat from "./components/Chat";

import { ThemeProvider } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import useApplicationData from "./hooks/useApplicationData";
import AddPhoto from "./components/Shop Components/AddPhoto";

function App() {
  const {
    loading,
    setLoading,
    shop,
    setShop,
    shops,
    setShops,
    userLocation,
    setUserLocation,
  } = useApplicationData();
  const [user, setUser] = useState(null);

  const handleLogin = (userInfo) => {
    axios.post("/api/users/login", { ...userInfo }).then((res) => {
      if (res.data.err) {
        alert("error");
      }
      const loggedInUser = {
        id: res.data.id,
        user_name: res.data.user_name,
        email: res.data.email,
      };
      setUser(loggedInUser);
    });
  };

  const handleLogout = (userInfo) => {
    axios.post("/api/users/logout").then((res) => {
      setUser(null);
    });
  };

  useEffect(() => {
    axios.post("/api/users/authenticate").then((res) => {
      if (res.data) {
        const loggedInUser = {
          id: res.data.id,
          user_name: res.data.user_name,
          email: res.data.email,
        };
        setUser(loggedInUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <ThemeProvider theme={theme}>
          <Nav user={user} handleLogout={handleLogout} />
          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/" exact>
              {user ? <Redirect to="/home" /> : <Root />}
            </Route>
            <Route path="/home">
              {user ? (
                <Home
                  user={user}
                  loading={loading}
                  setLoading={setLoading}
                  shop={shop}
                  setShop={setShop}
                  shops={shops}
                  setShops={setShops}
                  userLocation={userLocation}
                  setUserLocation={setUserLocation}
                />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/login">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route path="/register">
              <Register setAppUser={setUser} />
            </Route>
            <Route path="/users/:user_id">
              {user ? (
                <UserProfile shops={shops} setShops={setShops} user={user} />
              ) : (
                <Redirect to="/" />
              )}
            </Route>
            <Route path="/shops/new">
              {user ? <ShopRegister /> : <Redirect to="/" />}
            </Route>
            <Route path="/shops/:shop_id/addphoto">
              {user ? <AddPhoto user={user} /> : <CircularProgress />}
            </Route>
            <Route path="/shops/:shop_id">
              {user ? (
                <ShopProfile shops={shops} user={user} />
              ) : (
                <CircularProgress />
              )}
            </Route>
            <Route path="/chat" exact>
              {user ? <Chat shops={shops} user={user} /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </ThemeProvider>
      </div>
    </Router>
  );
}

export default App;
