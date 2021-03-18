import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import { MenuItem } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";

export default function Nav(props) {
  return (
    <AppBar>
      <ToolBar>
        <MenuItem>
          <Link to="/home" style={{ textDecoration: "none" }}>
            made | local
          </Link>
        </MenuItem>
        {props.user ? (
          <>
            <MenuItem>
              <Link
                to={`/users/${props.user.id}`}
                style={{ textDecoration: "none" }}
              >
                {props.user["user_name"]}
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/"
                onClick={props.handleLogout}
                style={{ textDecoration: "none" }}
              >
                Logout
              </Link>
            </MenuItem>
          </>
        ) : (
          <MenuItem>
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </MenuItem>
        )}
        <MenuItem>
          <Link to="/register" style={{ textDecoration: "none" }}>
            Register
          </Link>
        </MenuItem>
        <MailOutlineIcon></MailOutlineIcon>
      </ToolBar>
    </AppBar>
  );
}
