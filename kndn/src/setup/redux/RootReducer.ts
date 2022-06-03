import {all} from 'redux-saga/effects'
import {combineReducers} from 'redux'
import { globalSlice } from './global/Slice'
import * as auth from '../../app/modules/auth'

export const rootReducer = combineReducers({
  global: globalSlice.reducer,
  auth: auth.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export function* rootSaga() {
  //yield all([])
  yield all([auth.saga()])
}
