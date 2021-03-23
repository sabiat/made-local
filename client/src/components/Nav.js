import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/ToolBar";
import { MenuItem } from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { Grid, Avatar } from "@material-ui/core";
import madelocallogo6 from "../styles/madelocallogo6.png";

export default function Nav(props) {
  return (
    <AppBar>
      <ToolBar>
        <MenuItem>
          <Link to="/home">
            <img
              src={madelocallogo6}
              alt="logo"
              style={{ height: "50px", paddingTop: "10px" }}
            />
          </Link>
        </MenuItem>
        {props.user && (
          <>
            <Grid container xs={12} justify="flex-end" alignItems="center">
              <Grid item>
                <MenuItem>
                  <Grid
                    container
                    alignItems="center"
                    justify="center"
                    spacing={1}
                  >
                    <Grid item>
                      <Avatar
                        style={{ width: "2vw", height: "2vw" }}
                        alt={props.user.user_name}
                        src={props.user.photo}
                      />
                    </Grid>
                    <Grid item>
                      <Link
                        to={`/users/${props.user.id}`}
                        style={{
                          textDecoration: "none",
                          color: "white",
                          fontSize: "18px",
                        }}
                      >
                        {props.user["user_name"]}
                      </Link>
                    </Grid>
                  </Grid>
                </MenuItem>
              </Grid>
              <Grid item>
                <MenuItem>
                  <Link
                    to="/"
                    onClick={props.handleLogout}
                    style={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: "18px",
                    }}
                  >
                    logout
                  </Link>
                </MenuItem>
              </Grid>
              <Grid item>
                <MenuItem>
                  <Link
                    to={{
                      pathname: "/chat",
                      state: [1, "My chats"],
                    }}
                  >
                    <MailOutlineIcon
                      style={{
                        textDecoration: "none",
                        color: "white",
                      }}
                    ></MailOutlineIcon>
                  </Link>
                </MenuItem>
              </Grid>
            </Grid>
          </>
        )}
      </ToolBar>
    </AppBar>
  );
}
