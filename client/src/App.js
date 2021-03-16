import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./components/Home";
import Root from "./components/Root";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";
import ShopProfile from "./components/ShopProfile";
import ShopRegister from "./components/ShopRegister"
import Nav from "./components/Nav";

import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#588b8b",
    },
    secondary: {
      main: "#f28482",
      contrastText: "#ffcc00",
    },
    background: {
      default: "F7EDE12"
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

function App() {
  return (
    <Router>
      <MuiThemeProvider theme={theme}>
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
          </Switch>
        </div>
      </MuiThemeProvider>
    </Router>
  );
}

export default App;
