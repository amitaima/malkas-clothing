import { compose, applyMiddleware } from "redux";
import { legacy_createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { rootReducer } from "./root-reducer";

// root-reducer

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
