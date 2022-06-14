export const FETCH_POSTS = 'FETCH_POSTS'
export const FETCH_MORE_POSTS = 'FETCH_MORE_POSTS'
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS'
export const FETCH_POSTS_FAIL = 'FETCH_POSTS_FAIL'
export const FETCH_POSTS_LOADING = 'FETCH_POSTS_LOADING'

export const actionFetchPosts = ({ query, tags }) => {
   return {
      type: FETCH_POSTS,
      payload: {
         query,
         tags
      }
   }
}

export const actionFetchMorePosts = ({ query, tags }) => {
   return {
      type: FETCH_MORE_POSTS,
      payload: {
         query,
         tags
      }
   }
}