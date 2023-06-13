import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:3000/history";

export const fetchHistory = createAsyncThunk(
  "history/fetchHistory",
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

export const addHistory = createAsyncThunk(
  "history/addHistory",
  async function ({ from, to, date, amount }, { rejectWithValue, dispatch }) {
    const event = {
      from,
      to,
      date,
      amount,
    };
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error("can't create card. server error");
      }

      const data = await response.json();
      dispatch(addNewEvent(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const historySlice = createSlice({
  name: "history",
  initialState: {
    history: [],
    status: null,
    error: null,
  },
  redusers: {
    addNewEvent(state,action){
        state.push(action.payload)
    }
  },
  extraReducers: {
    [fetchHistory.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },

    [fetchHistory.fulfilled]: (state, action) => {
      state.status = "fullfilled";
      state.history = action.payload;
    },
    [fetchHistory.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      console.error(action.payload);
    },
  },
});

export const {addNewEvent} = historySlice.actions;

export default historySlice.reducer;
