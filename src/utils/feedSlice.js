import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    // addfeed replaces the whole feed with the new feed array, which is the payload of the action
    addFeed: (state, action) => { // action.payload is the feed array [data]
      return action.payload;
    },
    // removeUserFromFeed removes a user from the feed based on the user id, which is the payload of the action
    removeUserFromFeed: (state, action) => {
      const newFeed = state.filter((user) => user._id !== action.payload);
      return newFeed;
    },
  },
});

export const { addFeed, removeUserFromFeed } = feedSlice.actions; //Used in components wherever you need to dispatch an action
export default feedSlice.reducer; // Used only once in the Redux store to register this slice