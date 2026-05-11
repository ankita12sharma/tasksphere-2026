import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../redux/userSlice";
import { taskSlice } from "../redux/taskSlice";

const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [taskSlice.reducerPath]: taskSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userSlice.middleware)
      .concat(taskSlice.middleware),
});

export default store;
