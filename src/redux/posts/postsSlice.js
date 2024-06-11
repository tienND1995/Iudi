import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import axios from 'axios'
import config from '../../configs/Configs.json'

const { API__SERVER } = config

const initialState = {
 posts: [],
 loading: 'idle',
 changeTogglePosts: false,
 newPosts: [],
}

export const postsSlice = createSlice({
 name: 'posts',
 initialState,
 reducers: {},

 extraReducers: (builder) => {
  builder
   .addCase(fetchPosts.fulfilled, (state, action) => {
    state.posts = action.payload
    state.loading = 'successed'
   })
   .addCase(fetchPosts.pending, (state, action) => {
    state.loading = 'pending'
   })
   .addCase(addLikePost.fulfilled, (state, action) => {
    state.changeTogglePosts = !state.changeTogglePosts
   })
   .addCase(addPost.fulfilled, (state, action) => {
    state.changeTogglePosts = !state.changeTogglePosts
   })
   .addCase(patchPost.fulfilled, (state, action) => {
    state.changeTogglePosts = !state.changeTogglePosts
   })
   .addCase(postComment.fulfilled, (state, action) => {
    state.changeTogglePosts = !state.changeTogglePosts
   })
   .addCase(likeUnlikeComment.fulfilled, (state, action) => {
    state.changeTogglePosts = !state.changeTogglePosts
   })
   .addCase(removeComment.fulfilled, (state, action) => {
    state.changeTogglePosts = !state.changeTogglePosts
   })
   .addCase(deletePost.fulfilled, (state, action) => {
    state.changeTogglePosts = !state.changeTogglePosts
   })
 },
})

export const postsSelector = (state) => state.posts
export const postsReducer = postsSlice.reducer

// * POSTS

export const fetchPosts = createAsyncThunk(
 'posts/fetchPostStatus',
 async ({groupId, userID}) => {
  const { data } = await axios.get(
   `${API__SERVER}/forum/group/${groupId}/1/10/${userID}`
  )

  return data.list_posts
 }
)

export const addLikePost = createAsyncThunk(
 'posts/addLikePostStatus',
 async ({postId, userID}) => {
  const res = await axios.post(
   `${API__SERVER}/forum/favorite/${userID}/${postId}`
  )
 }
)

export const addPost = createAsyncThunk('posts/addPostStatus', async ({data, userID}) => {
 const response = await axios.post(
  `${API__SERVER}/forum/add_post/${userID}`,
  data
 )
})

export const patchPost = createAsyncThunk(
 'posts/patchPostStatus',
 async ({ data, postID }) => {
  const response = await axios.patch(
   `${API__SERVER}/forum/update_post/${postID}`,
   data
  )

  console.log('response:', response)
 }
)


export const deletePost = createAsyncThunk(
  'posts/deletePostStatus',
  async (postID) => {
   const response = await axios.delete(
    `${API__SERVER}/forum/delete_post/${postID}`
   )
  }
 )

// * COMMENTS

export const postComment = createAsyncThunk(
 'posts/postCommentStatus',
 async ({ PostID, data, userID }) => {
  const response = await axios.post(
   `${API__SERVER}/forum/add_comment/${userID}/${PostID}`,
   data
  )
 }
)

export const likeUnlikeComment = createAsyncThunk(
 'posts/likeUnlikeCommentStatus',
 async ({commentID, userID}) => {
  const response = await axios.post(
   `${API__SERVER}/forum/comment/favorite/${userID}/${commentID}`
  )
 }
)

export const removeComment = createAsyncThunk(
 'posts/removeCommentStatus',
 async (commentID) => {
  const response = await axios.delete(
   `${API__SERVER}/forum/comment/remove/${commentID}`
  )
 }
)

