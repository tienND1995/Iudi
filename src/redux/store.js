import { configureStore } from '@reduxjs/toolkit'
import { messagesReducer } from './messages/messagesSlice'
import { postsReducer } from './posts/postsSlice'
import { authsReducer } from './auths/authsSlice'

export const store = configureStore({
 reducer: {
  messages: messagesReducer,
  posts: postsReducer,
  auths: authsReducer,
 },
})
