import * as requestFromServer from './Crud'
import { globalSlice, callTypes } from './Slice'

const { actions } = globalSlice

export const setConnection = (data) => (dispatch) => {
  dispatch(actions.setConnection(data))
}

export const setHubProxy = (data) => (dispatch) => {
  dispatch(actions.setHubProxy(data))
}

export const setSearchFormData = (data) => (dispatch) => {
  dispatch(actions.setSearchFormData(data))
}

export const setLinhVucs = (data) => (dispatch) => {
  dispatch(actions.setLinhVucs(data))
}
