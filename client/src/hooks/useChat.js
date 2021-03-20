import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useLocation } from "react-router-dom";

const conversationListData = {
  1: {
    shopname: "The Original Cupcakes",
    shopId: 1, // userId of shop owner
    messages: [
      { from: "User", msg: "Hi, do you offer gluten free options?" },
      {
        from: "The Original Cupcakes",
        msg: "Yes, we do! All items can be made GF on request",
      },
      { from: "User", msg: "Awesome, I'll take 2 dozen chocolate cupcakes." },
    ],
  },
  2: {
    shopname: "Shop the Constant Closet",
    shopId: 2, // userId of shop owner
    messages: [
      { from: "User", msg: "Hi, do you offer gluten free sweaters?" },
      {
        from: "Shop the Constant Closet",
        msg: "Yes, we do! All items can be made GF on request",
      },
      { from: "User", msg: "Awesome, I'll take 2 dozen chocolate cupcakes." },
    ],
  },
};
const currentConversationData = {
  shopName: "The Original Cupcakes",
  shopId: 1, // userId of shop owner
  messages: [
    { from: "User", msg: "Hi, do you offer gluten free options?" },
    {
      from: "The Original Cupcakes",
      msg: "Yes, we do! All items can be made GF on request",
    },
    { from: "User", msg: "Awesome, I'll take 2 dozen chocolate cupcakes." },
  ],
};

export default function useChat() {
  const [activeConversation, setActiveConversation] = useState(5);
  const [socket, setSocket] = useState(null);
  const [conversationList, setConversationList] = useState();
  const [shopData, setShopData] = useState();
  const { state } = useLocation();

  function transformResData(resData) {
    let result = {};
    for (const element of resData) {
      if (!result[element.shop_id]) {
        result[element.shop_id] = {
          id: element.id,
          shopId: element.shop_id,
          shopname: element.shopname,
          messages: [
            {
              from: element.from,
              msg: element.message,
            },
          ],
        };
      } else {
        result[element.shop_id].messages.push({
          from: element.from,
          msg: element.message,
        });
      }
    }
    return result;
  }

  const transformShopData = function (data) {
    //console.log("DATA", data)
    const arr = [];
    for (let convoNum in data) {
      arr.push([data[convoNum].shopId, data[convoNum].shopname]);
    }
    return arr;
  };

  // db - used inside a useEffect
  const fetchAllConversations = () => {
    // use axios get to fetch from backend
    let shopIdForNewConvo = state[0];

    return axios.get("/api/users/chats").then((res) => {
      setConversationList(transformResData(res.data));
      const objectKeys = Object.keys(transformResData(res.data));

      if (!objectKeys.includes(state[0])) {
        let newConvo = {
          id: state[0],
          shopname: state[1],
          shopId: state[0],
          messages: [],
        };
        const newConversationList = {
          ...conversationList,
          [shopIdForNewConvo]: newConvo,
        };

        setConversationList((prev) => ({ ...prev, ...newConversationList }));
        setActiveConversation(state[0]);
        // setShopData(transformShopData(conversationList));
      } else {
        setConversationList(transformResData(res.data));
        // setShopData(transformShopData(conversationList));
      }

      // console.log("FRONT END", res.data);
    });
  };

  //console.log("convolist", conversationList);
  //console.log(transformShopData(conversationList));
  //  console.log("shopData", shopData);

  const selectActiveConversation = (shopId) => {
    setActiveConversation(shopId);
  };

  const sendChatMessage = (user, value) => {
    console.log("ACTIVECONVO", activeConversation);
    //sends message to back-end
    // const newMessages = [...activeConversation.messages];
    socket.emit("chat message", { user, value, shopId: activeConversation });
    // newMessages.push({from: user.user_name, msg: value});
    // setActiveConversation({...activeConversation, messages: newMessages});
  };

  const receiveChatMessage = (value) => {
    console.log("VALUE", value);
    const newMessage = {
      from: value.user.user_name,
      msg: value.value,
    };
    // append to array of messages of the current conversation
    //const updatedMessages = [...activeConversation.messages, newMessage]
    const shopIdOfCurrentConvo = {};

    shopIdOfCurrentConvo[value.shopId] = conversationList[value.shopId];
    shopIdOfCurrentConvo[value.shopId].messages.push(newMessage);
    const newConversationList = {
      ...conversationList,
      ...shopIdOfCurrentConvo,
    };
    setConversationList((prev) => ({ ...prev, ...newConversationList }));
    // setActiveConversation(prev => ({...prev, messages: [...prev.messages, newMessage]}));
    // console.log("ACTIVECONVO", activeConversation);
    // console.log("CONVOLIST", conversationList);
    console.log("shopidconvo", shopIdOfCurrentConvo);
    console.log("convolist", conversationList);
  };

  useEffect(() => {
    fetchAllConversations().then(() => {
      setSocket(io());
    });
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("chat message", function (msg) {
        receiveChatMessage(msg);
      });
    }
  }, [socket]);

  return {
    activeConversation,
    conversationList,
    sendChatMessage,
    receiveChatMessage,
    selectActiveConversation,
    setActiveConversation,
    transformShopData,
    shopData,
  };
}
