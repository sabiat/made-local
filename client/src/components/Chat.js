import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import theme from "../styles/theme";
import { useState } from "react";
import { CTX } from "./Store";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "50px",
    padding: theme.spacing(3, 2),
  },
  flex: {
    display: "flex",
    alignItems: "center",
  },
  topicsWindow: {
    width: "30%",
    height: "300px",
    borderRight: "1px solid grey",
  },
  chatWindow: {
    width: "70%",
    height: "300px",
    padding: "20 px",
  },
  chatBox: {
    width: "85%",
  },
  button: {
    width: "15%",
  },
}));

export default function Chat() {
  const classes = useStyles();

  const [allChats] = React.useContext(CTX);

  console.log(allChats);

  const topics = Object.keys(allChats);

  const [activeTopic, changeActiveTopic] = useState(topics[0]);
  const [textValue, changeTextValue] = useState("");

  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h4" component="h3">
          Chat app
        </Typography>
        <Typography variant="h5" component="h3">
          {activeTopic}
        </Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {topics.map((topic) => (
                <ListItem
                  onClick={(e) => changeActiveTopic(e.target.innerText)}
                  key={topic}
                  button
                >
                  <ListItemText primary={topic} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.chatWindow}>
            {allChats[activeTopic].map((chat, i) => (
              <div className={classes.flex} key={i}>
                <Chip
                  label={chat.from}
                  className={classes.chip}
                  variant="outlined"
                />
                <Typography variant="body1">{chat.msg}</Typography>
              </div>
            ))}
          </div>
        </div>

        <div className={classes.flex}>
          <TextField
            id="standard-basic"
            label="Send chat"
            className={classes.chatBox}
            value={textValue}
            onChange={(e) => changeTextValue(e.target.value)}
          />
          <Button variant="outlined">Send</Button>
        </div>
      </Paper>
    </div>
  );
}
