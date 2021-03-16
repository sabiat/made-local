import React, { useContext } from "react";
export const CTX = React.createContext();

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
  switch (action.type) {
    case "RECEIVE_MESSAGE":
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

export default function Store(props) {
  const reducerHook = React.useReducer(reducer, initState);

  return <CTX.Provider value={reducerHook}>{props.children}</CTX.Provider>;
}
