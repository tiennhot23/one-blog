import { FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAIL, FETCH_POSTS_LOADING } from "../action/action"

const initialState = {
   state: 'loading',
   page: 0,
   data: []
}

export default function reducer(state = initialState, action) {
   switch (action.type) {
      case FETCH_POSTS_LOADING: {
         return {
            ...state,
            state: 'loading'
         }
      }
      case FETCH_POSTS_SUCCESS: {
         return {
            ...state,
            state: 'success',
            data: action.data
         }
      }
      case FETCH_POSTS_FAIL: {
         return {
            ...state,
            state: 'fail',
            data: []
         }
      }
      default: {
         return state
      }
   }
}