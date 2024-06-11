import { createSlice } from '@reduxjs/toolkit'

export const authsSlice = createSlice({
 name: 'auth',
 initialState: {
  user: {},
  loading: 'idle',
  isAuthenticated: false,
 },

 reducers: {},
})

export const authsReducer = authsSlice.reducer
export const authsSelector = (state) => state.auths
export const authsActions = authsSlice.actions
