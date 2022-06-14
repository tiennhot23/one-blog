export const SET_SELECTED_TAGS = 'SET_SELECTED_TAGS'
export const FETCH_TAGS_SUCCESS = 'FETCH_TAGS_SUCCESS'
export const FETCH_TAGS_FAIL = 'FETCH_TAGS_FAIL'

export const actionFetchTags = () => async (dispatch, getState) => {
   try {
      const reponse = await fetch('/posts/tags').then(response => response.json())
      dispatch({
         type: FETCH_TAGS_SUCCESS,
         tags: reponse.data
      })
   } catch (err) {
      dispatch({ type: FETCH_TAGS_FAIL })
   }
}

export const actionSetSelectedTags = (tag) => {
   return {
      type: SET_SELECTED_TAGS,
      tag: tag,
   }
}