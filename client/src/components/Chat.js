import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import useChat from "../hooks/useChat";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import whitelogo2 from "../styles/whitelogo2.png";

import Fab from "@material-ui/core/Fab";
import SendIcon from "@material-ui/icons/Send";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: "100%",
    height: "80vh",
  },
  headBG: {
    backgroundColor: "#e0e0e0",
  },
  borderRight500: {
    borderRight: "0.15rem solid #6C9998",
    backgroundColor: "#6C9998",
  },
  messageArea: {
    height: "70vh",
    overflowY: "auto",
  },
  flex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  divider: {
    background: theme.palette.primary.main,
  },
}));

export default function Chat(props) {
  const classes = useStyles();

  const {
    currentConversation,
    conversationList,
    sendChatMessage,
    receiveChatMessage,
    selectActiveConversation,
    activeConversation,
    setActiveConversation,
    transformShopData,
  } = useChat();

  const [textValue, changeTextValue] = useState("");

  const shopData = transformShopData(conversationList);
  console.log("conversation LISST", conversationList);

  return (
    <div
      style={{
        height: "25px",
        width: "990px",
        marginTop: "95px",
        marginLeft: "10px"
      }}
    >
      <Box
        border={1}
        borderColor="primary.main"
        style={{
          border: "0.15rem solid #6C9998",
          borderRadius: "4px",
        }}
      >
        <Grid container component={Paper} className={classes.chatSection}>
          <Grid item xs={3} className={classes.borderRight500}>
            <List>
              <Grid container xs={5}>
                <Grid item xs={12}>
                  <div className={classes.flex}>
                    <img
                      src={whitelogo2}
                      alt="logo"
                      style={{
                        height: "4.5em",
                        padding: "5px",
                        paddingLeft: "88px",
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
              <Divider className={classes.divider} />

              {shopData.map((convo) => (
                <ListItem>
                  <Chip
                    variant="outlined"
                    size="x-large"
                    label={convo[1]}
                    onClick={() => {
                      selectActiveConversation(convo[0]);
                    }}
                    key={convo[0]}
                    button
                    style={{
                      height: "50px",
                      width: "300px",
                      border: "0.15rem solid #FFFFFF",
                      fontSize: "90%",
                      color: "#FFFFFF",
                      fontWeight: "bold",
                    }}
                  />
                </ListItem>
              ))}
            </List>
          </Grid>
          {/* message box */}

          <Grid item xs={9}>
            <List className={classes.messageArea}>
              <ListItem>
                <Grid container>
                  <Grid item xs={12}>
                    <ListItemText align="right">
                      {conversationList &&
                        conversationList[activeConversation] &&
                        conversationList[activeConversation].messages.map(
                          (chat, i) => (
                            <div
                              className={classes.flex}
                              key={i}
                              style={{ padding: "5px" }}
                            >
                              <Chip
                                label={chat.from}
                                className={classes.chip}
                                variant="outlined"
                                color="primary"
                                color="secondary"
                                style={{
                                  border: "0.15rem solid #6C9998",
                                  padding: "5px",
                                }}
                              />
                              <Typography
                                variant="body1"
                                style={{ paddingLeft: "10px" }}
                              >
                                {chat.msg}
                              </Typography>
                            </div>
                          )
                        )}
                    </ListItemText>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
            <Divider className={classes.divider} />

            <Grid container>
              <Grid item xs={11} style={{ paddingLeft: "10px" }}>
                <TextField
                  id="outlined-basic-email"
                  fullWidth
                  label="Send chat"
                  value={textValue}
                  onChange={(e) => changeTextValue(e.target.value)}
                />
              </Grid>
              <div style={{ paddingLeft: "10px", paddingTop: "10px" }}>
                <Grid xs={1} align="right">
                  <Fab size="small" color="secondary" aria-label="add">
                    <SendIcon
                      style={{ color: "#FFFFFF" }}
                      onClick={() => {
                        sendChatMessage(props.user, textValue);
                        changeTextValue("");
                      }}
                    />
                  </Fab>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
