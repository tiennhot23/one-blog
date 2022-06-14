import { takeLatest, put, call } from 'redux-saga/effects'
import { FETCH_POSTS, FETCH_MORE_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAIL } from './action/action'

const fetchPosts = (payload) =>
   fetch(`/posts?query=${payload.query}`)
      .then(response => response.json())
      .catch(err => { throw err })


function* sagaWatcher() {
   yield takeLatest(FETCH_POSTS, sagaWorker)
}

function* sagaWorker({ payload }) {
   try {
      const response = yield call(fetchPosts, payload)
      if (response.code === 200) {
         yield put({
            type: FETCH_POSTS_SUCCESS,
            data: response.data
         })
      } else {
         yield put({
            type: FETCH_POSTS_FAIL
         })
      }
   } catch (err) {
      yield put({
         type: FETCH_POSTS_FAIL
      })
   }
}

export default sagaWatcher