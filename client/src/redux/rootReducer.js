import { combineReducers } from "redux"

import reducer from './reducer/reducer'
import queryReducer from './reducer/queryReducer'
import tagsReducer from './reducer/tagsReducer'

const rootReducer = combineReducers({
   query: queryReducer,
   tags: tagsReducer,
   posts: reducer,
})
export default rootReducer