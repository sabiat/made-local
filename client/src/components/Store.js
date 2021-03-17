import React, { createContext } from "react";
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

function reducer(state, action) {
  const { from, msg, topic } = action.payload;
  console.log(action.type, msg);
  switch (action.type) {
    case "RECEIVE_MESSAGE":
      // debugger;
      console.log({
        ...state,
        [topic]: [
          ...state[topic],
          {
            from,
            msg,
          },
        ],
      });
      return {
        ...state,
        [topic]: [
          ...state[topic],
          {
            from,
            msg,
          },
        ],
      };
    default:
      return state;
  }
}

let socket;

function sendChatAction(value) {
  socket.emit("chat message", value);
}

export default function Store(props) {
  const [allChats, dispatch] = React.useReducer(reducer, initState);
  // debugger;
  console.log(allChats);
  if (!socket) {
    socket = io();
    socket.on("chat message", function (msg) {
      dispatch({ type: "RECEIVE_MESSAGE", payload: msg });
    });
  }

  const user = "Bob" + Math.random(100).toFixed(2);

  return (
    <CTX.Provider value={{ allChats, sendChatAction, user }}>
      {props.children}
    </CTX.Provider>
  );
}
