import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'
import io from 'socket.io-client'
import config from '../../../configs/Configs.json'

const { API__SERVER } = config
const socket = io('https://api.iudi.xyz')

const initialState = {
 messages: [],
 //  loading: 'idle',
 postToggle: false,
 historyMessages: [],
 isSeenMessage: false,
}

export const messagesSlice = createSlice({
 name: 'messages',
 initialState,

 extraReducers: (builder) => {
  builder
   .addCase(fetchMessages.fulfilled, (state, action) => {
    state.messages = action.payload
   })
   .addCase(fetchHistoryMessages.fulfilled, (state, action) => {
    state.historyMessages = action.payload
   })
   .addCase(postMessage.fulfilled, (state, action) => {
    state.postToggle = !state.postToggle
   })

   .addCase(deleteMessage.fulfilled, (state, action) => {
    state.postToggle = !state.postToggle
   })
   .addCase(postSeenMessage.fulfilled, (state, action) => {
    state.isSeenMessage = true
   })
   .addCase(getRelationshipUsers.fulfilled, (state, action) => {
    
   })
 },
})

export const messagesSelector = (state) => state.messages
export const messagesReducer = messagesSlice.reducer

export const fetchMessages = createAsyncThunk(
 'messages/fetchMessageStatus',
 async ({ otherUserId, userID }) => {
  const { data } = await axios.get(
   `${API__SERVER}/pairmessage/${userID}?other_userId=${otherUserId}`
  )

  return data.data.sort((a, b) => a.MessageID - b.MessageID)
 }
)

export const postMessage = createAsyncThunk(
 'messages/postMessageStatus',
 async (data) => {
  try {
   const res = await socket.emit('send_message', data)
  } catch (error) {
   console.log('error', error)
  }
 }
)

export const fetchHistoryMessages = createAsyncThunk(
 'messages/fetchHistory',
 async (userID) => {
  const { data } = await axios.get(`${API__SERVER}/chat/${userID}`)

  return data.data
 }
)

export const getRelationshipUsers = createAsyncThunk(
 'messages/getRelations',
 async (userID) => {
  try {
   const res = await axios.get(`${API__SERVER}/chatblock/${userID}`)
   return res.data.data
  } catch (error) {
   console.log('error', error)
  }
 }
)

export const deleteMessage = createAsyncThunk(
 'messages/deleteMessage',
 async ({ messageID, userID }) => {
  const res = await fetch(`${API__SERVER}/chat/${userID}`, {
   method: 'delete',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    messageId: messageID,
   }),
  })
 }
)

export const postSeenMessage = createAsyncThunk(
 'messages/postSeenMessage',
 async (messageID) => {
  try {
   const res = await socket.emit('seen', { MessageID: messageID })
  } catch (error) {
   console.log(error)
  }
 }
)
