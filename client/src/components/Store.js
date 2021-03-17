import React, { createContext, useEffect, useState } from "react";
import io from "socket.io-client";
export const CTX = createContext();

const initState = {
  general: [
    { from: "aaron", msg: "hello" },
    { from: "aaron", msg: "hello" },
    { from: "aaron", msg: "hello" },
  ],
  topic2: [
    { from: "bob", msg: "hello" },
    { from: "bob", msg: "hello" },
    { from: "aaron", msg: "hello" },
  ],
};

const reducer = (state, action) => {
  const { from, msg, topic } = action.payload;
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      console.log(from, msg, topic);
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
  const [allChats, dispatch] = React.useReducer(reducer, initState);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io());
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("chat message", function (msg) {
        dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
      });
    }
  }, [socket]);

  const user = "Bob" + Math.random(100).toFixed(2);

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user, socket }}>
      {props.children}
    </CTX.Provider>
  );
}
