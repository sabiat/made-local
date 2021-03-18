import { useState, useEffect } from "react";
import io from "socket.io-client";

const conversationListData = [
  {
  shopName: "The Original Cupcakes",
  shopId: 1, // userId of shop owner
  messages: [
    { from: "User", msg: "Hi, do you offer gluten free options?" },
    { from: "The Original Cupcakes", msg: "Yes, we do! All items can be made GF on request" },
    { from: "User", msg: "Awesome, I'll take 2 dozen chocolate cupcakes." },
  ],
},
{
  shopName: "Shop the Constant Closet",
  shopId: 2, // userId of shop owner
  messages: [
    { from: "User", msg: "Hi, do you offer gluten free sweaters?" },
    { from: "Shop the Constant Closet", msg: "Yes, we do! All items can be made GF on request" },
    { from: "User", msg: "Awesome, I'll take 2 dozen chocolate cupcakes." },
  ],
}
]

const currentConversationData = {
  shopName: "The Original Cupcakes",
  shopId: 1, // userId of shop owner
  messages: [
    { from: "User", msg: "Hi, do you offer gluten free options?" },
    { from: "The Original Cupcakes", msg: "Yes, we do! All items can be made GF on request" },
    { from: "User", msg: "Awesome, I'll take 2 dozen chocolate cupcakes." },
  ],
};

export default function useChat() {

  const [currentConversation, setCurrentConversation] = useState(currentConversationData);
  const [socket, setSocket] = useState(null);
  const [conversationList, setConversationList] = useState(conversationListData);

  // each of the functions gets passed user obj as parameter

  // db - used inside a useEffect
  const fetchAllConversations = (user) => {
    // use axios get to fetch from backend
  };

  // click on conversation from conversationList and give it to chatLog
  const setActiveConversation = (shopId) => {
    // fetch from conversationList array
    // find which object has the conversationId of the shopId
    // set state of currentConversation
  };

  const sendChatMessage = (user, value) => {
    console.log("user, value", user, value);
    socket.emit("chat message", {user, value}); // convId
  };

  const receiveChatMessage = (value) => {
    // append to array of messages of the current conversation
    // push to currentConversation.messages
  };

  useEffect(() => {
    setSocket(io());
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("chat message", function (msg) {
        receiveChatMessage({ from: "User", msg: "Hi, do you offer gluten free options?" });
      });
    }
  }, [socket]);

  return { currentConversation, conversationList, sendChatMessage, receiveChatMessage, setActiveConversation };

};

// SHAPE: show names of shoplist on the side, and hard-coded messages
// 