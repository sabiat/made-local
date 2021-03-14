import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './components/Home'
import Root from './components/Root'
import Login from './components/Login'
import Register from './components/Register'
import UserProfile from './components/UserProfile'
import ShopProfile from './components/ShopProfile'
import Nav from './components/Nav'

function App() {
  return (
    <Router>
    <div>
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
        <Route path="/shops/:shop_id">
          <ShopProfile />
        </Route>
      </Switch>
    </div>
  </Router>
  );
}

export default App;
