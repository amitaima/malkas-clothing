import { compose, applyMiddleware } from "redux";
import { legacy_createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// root-reducer

const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) return next(action);

  console.log("type", action.type);
  console.log("payload", action.payload);
  console.log("currentState", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};

const middleWares = [logger];

const composedEnhancers = compose(applyMiddleware(...middleWares));

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: [logger],
// });
export const store = legacy_createStore(
  rootReducer,
  undefined,
  composedEnhancers
);
