import { Action } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { put, takeLatest } from 'redux-saga/effects'
import { UserModel } from '../models/UserModel'

export interface ActionWithPayload<T> extends Action {
  payload?: T
}

export const actionTypes = {
  Login: '[Login] Action',
  Logout: '[Logout] Action',
  Register: '[Register] Action',
  UserRequested: '[Request User] Action',
  UserLoaded: '[Load User] Auth API',
  SetUser: '[Set User] Action',
}

const initialAuthState: IAuthState = {
  user: undefined,
  accessToken: undefined,
}

export interface IAuthState {
  user?: any
  accessToken?: string
}

export const reducer = persistReducer(
  { storage, key: 'dgtt-auth', whitelist: ['accessToken', 'user'] },
  (state: IAuthState = initialAuthState, action: ActionWithPayload<IAuthState>) => {
    switch (action.type) {
      case actionTypes.Login: {
        const _user = action?.payload?.user ?? {}
        const _token = _user?.token ?? ''
        return { user: _user, accessToken: _token }
      }

      case actionTypes.Register: {
        const accessToken = action.payload?.accessToken
        return { accessToken, user: undefined }
      }

      case actionTypes.Logout: {
        return initialAuthState
      }

      case actionTypes.UserRequested: {
        return { ...state, user: undefined }
      }

      case actionTypes.UserLoaded: {
        const user = action.payload?.user
        return { ...state, user }
      }

      case actionTypes.SetUser: {
        const user = action.payload?.user
        return { ...state, user }
      }

      default:
        return state
    }
  }
)

export const actions = {
  login: (user: UserModel) => ({ type: actionTypes.Login, payload: { user } }),
  register: (accessToken: string) => ({
    type: actionTypes.Register,
    payload: { accessToken },
  }),
  logout: () => ({ type: actionTypes.Logout }),
  requestUser: () => ({
    type: actionTypes.UserRequested,
  }),
}

export function* saga() {

}
