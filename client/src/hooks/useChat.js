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
  
  console.log("top", currentConversation)
  // each of the functions gets passed user obj as parameter

  // db - used inside a useEffect
  const fetchAllConversations = (user) => {
    // use axios get to fetch from backend
  };

  // click on conversation from conversationList and give it to chatLog
  const setActiveConversation = (shopId) => {
    // setCurrentConversation(currentConversationData)
    // fetch from conversationList array
    // loop through data.messages, find the object where conversationId = shopId
    // set state of currentConversation
  };

  const sendChatMessage = (user, value) => {
    //sends message to back-end
    socket.emit("chat message", {user, value}); // convId
  };

  const receiveChatMessage = (value) => {
    const newMessage = {
      from: value.user.user_name,
      msg: value.value
    }
    // append to array of messages of the current conversation
    // push to currentConversation.messages
    // "stale as hell" -vasily
    const updatedMessages = [...currentConversation.messages, newMessage]
    setCurrentConversation(prev => ({...prev, messages: [...prev.messages, newMessage]}));

    // const updatedConversation = currentConversation.messages.push(newMessage)
    // setCurrentConversation(updatedConversation);
    // console.log("UPDATED CONVERSATION", updatedConversation)

    // setCurrentConversation(currentConversation["messages"] => [...currentConversation.messages, newMessage])

  };

  useEffect(() => {
    setSocket(io());
    console.log("initializing")
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("chat message", function (msg) {
        receiveChatMessage(msg);
      });
    }
  }, [socket]);

  return { currentConversation, conversationList, sendChatMessage, receiveChatMessage, setActiveConversation };

};