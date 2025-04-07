import { configureStore } from "@reduxjs/toolkit";
import detailsReducer from "./detailsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      details: detailsReducer,
    },
  });
};

// Infer the type of `store`
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
