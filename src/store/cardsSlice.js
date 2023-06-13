import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:3000/cards";

export const fetchCards = createAsyncThunk(
  "cards/fetchCards",
  async function (_, { rejectWithValue }) {
    try {
      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("server error");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCard = createAsyncThunk(
  "cards/addCard",
  async function (
    { number, name, exp, cvv2, balance, creditLimit, paymentSystem, cover },
    { rejectWithValue, dispatch }
  ) {
    const card = {
      number,
      name,
      exp,
      cvv2,
      balance,
      creditLimit,
      paymentSystem,
      cover,
    };
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(card),
      });

      if (!response.ok) {
        throw new Error("can't create card. server error");
      }

      const data = await response.json();
      dispatch(addNewCard(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editCard = createAsyncThunk(
  "cards/editCard",
  async function (
    { id, number, name, exp, cvv2, balance, creditLimit, paymentSystem, cover },
    { rejectWithValue, dispatch }
  ) {
    const card = {
      number,
      name,
      exp,
      cvv2,
      balance,
      creditLimit,
      paymentSystem,
      cover,
    };
    try {
      const response = await fetch(baseUrl + "/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(card),
      });

      if (!response.ok) {
        throw new Error("can't create card. server error");
      }

      const data = await response.json();
      dispatch(editThisCard({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteCard = createAsyncThunk(
  "cards/deleteCard",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(baseUrl + "/" + id, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("can't create card. server error");
      }

      const data = await response.json();
      dispatch(deleteThisCard({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const cardSlice = createSlice({
  name: "cards",
  initialState: {
    cards: [],
    status: null,
    error: null,
  },
  reducers: {
    addNewCard(state, action) {
      state.cards.push(action.payload);
    },
    editThisCard(state, action) {
      const card = state.find((card) => card.id === action.payload.id);
      card = action.payload;
    },
    deleteThisCard(state, action) {
      state = state.filter((card) => card.id != action.payload.id);
    },
  },
  extraReducers: {
    [fetchCards.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchCards.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.cards = action.payload;
    },
    [fetchCards.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      console.error(action.payload);
    },
  },
});

export const { addNewCard, editThisCard, deleteThisCard } = cardSlice.actions;
export default cardSlice.reducer;
