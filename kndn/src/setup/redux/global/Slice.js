import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  listLoading: false,
  actionsLoading: false,
  error: null,
  connection: null,
  hubProxy: null,
  searchFormData: {
    type: 1,
    linhVuc: null,
    tinh: null,
    searchStr: null
  },
  linhVucs: null
}
export const callTypes = {
  list: 'list',
  action: 'action',
}

export const globalSlice = createSlice({
  name: 'global',
  initialState: initialState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false
      } else {
        state.actionsLoading = false
      }
    },
    startCall: (state, action) => {
      state.error = null
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true
      } else {
        state.actionsLoading = true
      }
    },

    setConnection: (state, action) => {
      const payload = action.payload
      state.connection = payload
    },

    setHubProxy: (state, action) => {
      const payload = action.payload
      state.hubProxy = payload
    },

    setSearchFormData: (state, action) => {
      state.searchFormData.type = action.payload.type || 1;
      state.searchFormData.linhVuc = action.payload.linhVuc || null;
      state.searchFormData.tinh = action.payload.tinh || null;
      state.searchFormData.searchStr = action.payload.searchStr || "";
    },

    setLinhVucs: (state, action) => {
      state.linhVucs = action.payload
    },

  },
})
