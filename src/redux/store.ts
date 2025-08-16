import { configureStore } from "@reduxjs/toolkit";
import { bookAip } from "./Api/BookApi";


export const store = configureStore({
   reducer: {
      [bookAip.reducerPath]: bookAip.reducer,
   },
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(bookAip.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// export type AppStore = typeof store;
