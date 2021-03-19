import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from 'axios';

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
  const [conversationList, setConversationList] = useState();
  // const [conversationListCopy, setConversationListCopy] = useState();
  
  function transformMe(someArray) {
    let result = {}
    for (const thing of someArray) {
      //console.log(thing)
      if (!result[thing.id]) {
        result[thing.id] = {
          id: thing.id,
          shopId: thing.shopId,
          shopname: thing.shopname,
          messages: [
            {
              from: thing.from,
              msg: thing.message
            }
          ]
        }
      } else {
        result[thing.id].messages.push(
          {
            from: thing.from,
            msg: thing.message
          }
        )
      }
    }
    return result;
};
  // each of the functions gets passed user obj as parameter

  // db - used inside a useEffect
  const fetchAllConversations = () => {
    // use axios get to fetch from backend
    axios.get("/api/users/chats")
    .then(res => {
      // console.log(res.data);
      setConversationList(transformMe(res.data));
    });
  };
  
  console.log("convolist", conversationList);

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
    // "stale as hell" -vasily
    const updatedMessages = [...currentConversation.messages, newMessage]
    setCurrentConversation(prev => ({...prev, messages: [...prev.messages, newMessage]}));
  };

  useEffect(() => {
    setSocket(io());
    fetchAllConversations();
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