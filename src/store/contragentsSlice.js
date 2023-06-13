import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = "http://localhost:3000/contragents";

export const fetchContragents = createAsyncThunk(
  "contragents/fetchContragents",
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


export const addContragent = createAsyncThunk(
  "contragents/addContragent",
  async function (
    { cardNumber, name, address, telephone, details, balance },
    { rejectWithValue, dispatch }
  ) {
    const contragent = {
      cardNumber,
      name,
      address,
      telephone,
      details,
      balance,
    };
    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contragent),
      });

      if (!response.ok) {
        throw new Error("can't create card. server error");
      }

      const data = await response.json();
      dispatch(addNewContragent(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editContragent = createAsyncThunk(
  "contragents/editContragent",
  async function (
    { id, cardNumber, name, address, telephone, details, balance },
    { rejectWithValue, dispatch }
  ) {
    const contragent = {
      id,
      cardNumber,
      name,
      address,
      telephone,
      details,
      balance,
    };
    try {
      const response = await fetch(baseUrl + "/" + id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contragent),
      });

      if (!response.ok) {
        throw new Error("can't create card. server error");
      }

      const data = await response.json();
      dispatch(editThisContragent({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContragent = createAsyncThunk(
  "contragents/deleteContragent",
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const response = await fetch(baseUrl + "/" + id, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("can't create card. server error");
      }

      const data = await response.json();
      dispatch(deleteThisContragent({ id }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const contragentSlice = createSlice({
  name: "contragents",
  initialState: {
    contragents: [],
    status: null,
    error: null,
  },
  reducers: {
    addNewContragent(state, action) {
      state.contragents.push(action.payload);
    },
    editThisContragent(state, action) {
      const contragent = state.find(
        (contragent) => contragent.id === action.payload.id
      );
      contragent = action.payload;
    },
    deleteThisContragent(state, action) {
      state = state.filter((contragent) => contragent.id !== action.payload.id);
    },
  },
  extraReducers: {
    [fetchContragents.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchContragents.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.contragents = action.payload;
    },
    [fetchContragents.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
      console.error(action.payload);
    },
  },
});

export const { addNewContragent, editThisContragent, deleteThisContragent } =
  contragentSlice.actions;
export default contragentSlice.reducer;
