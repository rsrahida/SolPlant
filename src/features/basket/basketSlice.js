import { createSlice } from "@reduxjs/toolkit";

const loadBasketFromLocalStorage = () => {
  try {
    const data = localStorage.getItem("basketItems");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Basket load error:", e);
    return [];
  }
};

const saveBasketToLocalStorage = (items) => {
  try {
    localStorage.setItem("basketItems", JSON.stringify(items));
  } catch (e) {
    console.error("Basket save error:", e);
  }
};

const basketSlice = createSlice({
  name: "basket",
  initialState: {
    items: loadBasketFromLocalStorage(),
  },
  reducers: {
    addToBasket: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity || 1;
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      saveBasketToLocalStorage(state.items);
    },
    removeFromBasket: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveBasketToLocalStorage(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && quantity > 0) {
        item.quantity = quantity;
        saveBasketToLocalStorage(state.items);
      }
    },
  },
});

export const { addToBasket, removeFromBasket, updateQuantity } =
  basketSlice.actions;
export default basketSlice.reducer;
