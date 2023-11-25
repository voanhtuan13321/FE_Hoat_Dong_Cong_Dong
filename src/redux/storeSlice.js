import { createSlice } from '@reduxjs/toolkit'
import { ROLES } from '../utils'

const initialState = {
  role: ROLES.sinhVien,
}

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setRole: (state, actions) => {
      state.role = actions.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setRole } = storeSlice.actions

export default storeSlice.reducer
