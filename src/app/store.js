import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";
import basketReducer from "../features/basket/basketSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wishlist: wishlistReducer,
    basket: basketReducer,
  },
});
