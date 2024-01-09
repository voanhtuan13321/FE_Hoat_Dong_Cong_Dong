import { createSlice } from '@reduxjs/toolkit'
import { ROLES, getHighestRole } from '../utils'

const initialState = {
  role: ROLES.admin,
}

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setRole: (state, actions) => {
      const roles = actions.payload || []
      state.role = getHighestRole(roles)
    },
    setLoading: (state, actions) => {
      const isLoading = actions.payload || false
      state.isLoading = isLoading
    },
  },
})

// Action creators are generated for each case reducer function
export const { setRole, setLoading } = storeSlice.actions

export default storeSlice.reducer
