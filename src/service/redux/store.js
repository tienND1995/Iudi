import { configureStore } from '@reduxjs/toolkit'
import { messagesReducer } from './messages/messagesSlice'
import { postsReducer } from './posts/postsSlice'
import { usersReducer } from './users/usersSlice'

export const store = configureStore({
 reducer: {
  messages: messagesReducer,
  posts: postsReducer,
  users: usersReducer,
 },
})
