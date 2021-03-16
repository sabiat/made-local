import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Root from "./components/Root";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import ShopProfile from "./components/ShopProfile";
import ShopRegister from "./components/ShopRegister";
import Nav from "./components/Nav";
import Button from "@material-ui/core/Button";
import Chat from "./components/Chat";

import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./styles/theme";
import Store from "./components/Store";

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Nav />
          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/" exact>
              <Root />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/users/:user_id">
              <UserProfile />
            </Route>
            <Route path="/shops/new">
              <ShopRegister />
            </Route>
            <Route path="/shops/:shop_id">
              <ShopProfile />
            </Route>
            <Route path="/chat">
              <Store>
                <Chat />
              </Store>
            </Route>
          </Switch>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
