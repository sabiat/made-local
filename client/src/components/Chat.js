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
    <div style={{ height: "25px", width: "990px", margin: "95px" }}>
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
                <Grid item xs={12} style={{ padding: "10px" }}>
                  <div className={classes.flex}>
                    <Chip
                      variant="outlined"
                      variant="h2"
                      size="x-large"
                      label="My Chats"
                      color="secondary"
                      style={{
                        height: "50px",
                        width: "100px",
                        border: "0.15rem solid #6C9998",
                        fontSize: "90%",
                      }}
                    />
                  </div>
                </Grid>
              </Grid>
              <Divider className={classes.divider} />
              {shopData.map((convo) => (
                <ListItem
                  onClick={() => {
                    selectActiveConversation(convo[0]);
                  }}
                  key={convo[0]}
                  button
                >
                  <ListItemText primary={convo[1]} />
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
                            <div className={classes.flex} key={i}>
                              <Chip
                                label={chat.from}
                                className={classes.chip}
                                variant="outlined"
                                color="primary"
                                style={{ padding: "5px" }}
                              />
                              <Typography variant="body2">
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
              <Grid item xs={11}>
                <TextField
                  id="outlined-basic-email"
                  fullWidth
                  // id="standard-basic"
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

{
  /* <div>
{!shopData ? (
  <CircularProgress color="secondary" />
) : (
  <>
    <Paper className={classes.root}>
      <Typography variant="h4" component="h3">
        Chats
      </Typography>
      <Typography variant="h5" component="h3">
        {/* {activeTopic} */
}
//       </Typography>
//       <div className={classes.flex}>
//         <div className={classes.topicsWindow}>
//           <List>
//             {shopData.map((convo) => (
//               <ListItem
//                 onClick={() => {
//                   selectActiveConversation(convo[0]);
//                 }}
//                 // console.log("TARGET", e.target.innerText);
//                 key={convo[0]}
//                 button
//               >
//                 <ListItemText primary={convo[1]} />
//               </ListItem>
//             ))}
//           </List>
//         </div>
//         <div className={classes.chatWindow}>
//           {conversationList &&
//             conversationList[activeConversation] &&
//             conversationList[activeConversation].messages.map(
//               (chat, i) => (
//                 <div className={classes.flex} key={i}>
//                   <Chip
//                     label={chat.from}
//                     className={classes.chip}
//                     variant="outlined"
//                   />
//                   <Typography variant="body1">{chat.msg}</Typography>
//                 </div>
//               )
//             )}
//         </div>
//       </div>

//       <div className={classes.flex}>
//         <TextField
//           id="standard-basic"
//           label="Send chat"
//           className={classes.chatBox}
//           value={textValue}
//           onChange={(e) => changeTextValue(e.target.value)}
//         />
//         <Button
//           variant="outlined"
//           className={classes.button}
//           onClick={() => {
//             sendChatMessage(props.user, textValue);
//             changeTextValue("");
//           }}
//         >
//           Send
//         </Button>
//       </div>
//     </Paper>
//   </>
// )}
// </div>
// );

// const useStyles = makeStyles((theme) => ({
//   root: {
//     margin: "50px",
//     padding: theme.spacing(3, 2),
//   },
//   flex: {
//     display: "flex",
//     alignItems: "center",
//   },
//   topicsWindow: {
//     width: "30%",
//     height: "300px",
//     borderRight: "1px solid grey",
//   },
//   chatWindow: {
//     width: "70%",
//     height: "300px",
//     padding: "20 px",
//   },
//   chatBox: {
//     width: "85%",
//   },
//   button: {
//     width: "15%",
//   },
// })); */}
// const Chat = () => {
//   const classes = useStyles();

//   return (
//     <div>
//       <Grid container>
//         <Grid item xs={12}>
//           <Typography variant="h5" className="header-message">
//             Chat
//           </Typography>
//         </Grid>
//       </Grid>

//       <Grid container component={Paper} className={classes.chatSection}>
//         <Grid item xs={3} className={classes.borderRight500}>
//           <Divider />
//           <Divider />
//           <List>
//             <ListItem button key="RemySharp">
//               <ListItemIcon>
//                 <Avatar
//                   alt="Remy Sharp"
//                   src="https://material-ui.com/static/images/avatar/1.jpg"
//                 />
//               </ListItemIcon>
//               <ListItemText primary="Remy Sharp">Remy Sharp</ListItemText>
//               <ListItemText secondary="online" align="right"></ListItemText>
//             </ListItem>
//             <ListItem button key="Alice">
//               <ListItemIcon>
//                 <Avatar
//                   alt="Alice"
//                   src="https://material-ui.com/static/images/avatar/3.jpg"
//                 />
//               </ListItemIcon>
//               <ListItemText primary="Alice">Alice</ListItemText>
//             </ListItem>
//           </List>
//         </Grid>
//         <Grid item xs={9}>
//           <List className={classes.messageArea}>
//             <ListItem key="3">
//               <Grid container>
//                 <Grid item xs={12}>
//                   <ListItemText
//                     align="right"
//                     primary="Cool. i am good, let's catch up!"
//                   ></ListItemText>
//                 </Grid>
//                 <Grid item xs={12}>
//                   <ListItemText align="right" secondary="10:30"></ListItemText>
//                 </Grid>
//               </Grid>
//             </ListItem>
//           </List>
//           <Divider />
//           <Grid container style={{ padding: "20px" }}>
//             <Grid item xs={11}>
//               <TextField
//                 id="outlined-basic-email"
//                 label="Type Something"
//                 fullWidth
//               />
//             </Grid>
//             <Grid xs={1} align="right">
//               <Fab color="primary" aria-label="add">
//                 <SendIcon />
//               </Fab>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };
