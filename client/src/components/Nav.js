import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import { MenuItem } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import madelocallogo6 from "../styles/madelocallogo6.png"

export default function Nav(props) {
  return (
    <AppBar>
      <ToolBar>
        <MenuItem>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <img src={madelocallogo6} alt="logo" style={{height: "2.5em", paddingTop: "10px"}}/>
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
            <MailOutlineIcon></MailOutlineIcon>
          </>
        ) : (
          <>
            <MenuItem>
              <Link to="/login" style={{ textDecoration: "none" }}>
                Login
              </Link>
            </MenuItem>
            <MenuItem>
              <Link to="/register" style={{ textDecoration: "none" }}>
                Register
              </Link>
            </MenuItem>
          </>
        )}
      </ToolBar>
    </AppBar>
  );
}
