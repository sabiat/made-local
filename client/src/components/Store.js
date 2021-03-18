// Chat

import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
export const CTX = createContext();

const initState = {
  "The Original Cupcakes": [
    { from: "@jdoe88", msg: "Hi, do you offer gluten free options?" },
    { from: "@cupcakeQueen", msg: "Yes, we do! All items can be made GF on request" },
    { from: "@jdoe88", msg: "Awesome, I'll take 2 dozen chocolate cupcakes." },
  ],
  "Shop the Constant Closet": [
    { from: "bob", msg: "hello" },
    { from: "bob", msg: "hello" },
    { from: "aaron", msg: "hello" },
  ],
};

// reducers are good for a bunch of actions being managed by a dispatcher
const reducer = (state, action) => {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      // console.log(from, msg, topic);
      return {
        ...state,
        [topic]: [...state[topic], { from, msg }],
      };
    default:
      return state;
  }
};

function sendChatAction(value, socket) {
  socket.emit("chat message", value);
}

export default function Store(props) {
 
  console.log("chat props", props.user);
  
  const user = "Bob" + Math.random(100).toFixed(2);

  return (null)
}
