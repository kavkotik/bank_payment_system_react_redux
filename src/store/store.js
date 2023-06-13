import { configureStore } from "@reduxjs/toolkit";

import cardReduser from "./cardsSlice";
import contragentReducer from "./contragentsSlice";
import historyReducer from "./historySlice";

export default configureStore({
  reducer: {
    cards: cardReduser,
    contragents: contragentReducer,
    history: historyReducer
  },
});
