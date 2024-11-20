import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { ProductApi } from "../service/product.service";
import cartReducer from "../slice/carts.slice";
import userReducer from "../slice/user.slice";

export const store = configureStore({
  reducer: {
    carts: cartReducer,
    user: userReducer,
    [ProductApi.reducerPath]: ProductApi.reducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(ProductApi.middleware);
  },
});
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
