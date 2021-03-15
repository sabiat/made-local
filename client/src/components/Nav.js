import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import { MenuItem } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

export default function Nav() {
  return (
    <AppBar>
      <ToolBar>
        <MenuItem>
          <Link to="/home">madelocal</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/users/:user_id">username</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/login">Login</Link>
        </MenuItem>
        <MenuItem>
          <Link to="/register">Register</Link>
        </MenuItem>
        <MailOutlineIcon></MailOutlineIcon>
      </ToolBar>
    </AppBar>
  );
}
