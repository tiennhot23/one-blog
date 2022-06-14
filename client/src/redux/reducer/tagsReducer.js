import { FETCH_TAGS_SUCCESS, FETCH_TAGS_FAIL, SET_SELECTED_TAGS } from '../action/tagsAction'

const initialState = []

export default function tagsReducer(state = initialState, action) {
   switch (action.type) {
      case FETCH_TAGS_SUCCESS: {
         let newState = []
         action.tags.forEach(tag => {
            newState.push({ tag: tag, isSelected: false })
         })
         return newState
      }
      case FETCH_TAGS_FAIL: {
         return []
      }
      case SET_SELECTED_TAGS: {
         return state.map(e =>
            e.tag === action.tag ? { ...e, isSelected: !e.isSelected } : e)
      }
      default: {
         return state
      }
   }
}