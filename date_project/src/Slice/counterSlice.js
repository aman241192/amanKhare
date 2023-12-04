import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weekDays: [],
  time: [],
  timeData: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    weekDaysAction: (state, action) => {
      state.weekDays = action.payload;
    },
    timeZoneAction: (state, action) => {
      state.time = action.payload;
    },
    addDataAction: (state, action) => {
      state.timeData.push(action.payload);
    },
    deleteDataAction: (state, action) => {
      let updateData= state.timeData.filter((item) => item.id !== action.payload);
      state.timeData=updateData   
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  weekDaysAction,
  timeZoneAction,
  addDataAction,
  deleteDataAction,
} = counterSlice.actions;

export default counterSlice.reducer;
