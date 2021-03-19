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
import { useState } from "react";
import useChat from "../hooks/useChat"

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

export default function Chat(props) {
  const classes = useStyles();

  const { currentConversation, conversationList, sendChatMessage, receiveChatMessage, selectActiveConversation, activeConversation, setActiveConversation, transformShopData } = useChat();

  const [textValue, changeTextValue] = useState("");

  const convoData = transformShopData(conversationList);
  console.log("CONVODATA", convoData);
  
  return (
    <div>
      <Paper className={classes.root}>
        <Typography variant="h4" component="h3">
          Chats
        </Typography>
        <Typography variant="h5" component="h3">
          {/* {activeTopic} */}
        </Typography>
        <div className={classes.flex}>
          <div className={classes.topicsWindow}>
            <List>
              {convoData.map((convo) => (
                <ListItem
                onClick={() => {selectActiveConversation(convo[0])}}
                  // console.log("TARGET", e.target.innerText);
                  key={convo[0]}
                  button
                >
                  <ListItemText primary={convo[1]} />
                </ListItem>
              ))}
            </List>
          </div>
          <div className={classes.chatWindow}>
            {conversationList &&
            conversationList[activeConversation] &&
            conversationList[activeConversation].messages.map((chat, i) => (
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
          <Button
            variant="outlined"
            className={classes.button}
            onClick={() => {
              sendChatMessage(props.user, textValue);
              changeTextValue("");
            }}
          >
            Send
          </Button>
        </div>
      </Paper>
    </div>
  );
}
