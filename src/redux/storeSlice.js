import { createSlice } from '@reduxjs/toolkit'
import { ROLES } from '../utils'

const initialState = {
  role: ROLES.client,
  userId: undefined,
}

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setRole: (state, actions) => {
      const roles = actions.payload || []

      const condition = {
        DEFAULT: 1,
        SINHVIEN: 2,
        LOPTRUONG: 3,
        GIAOVIEN: 4,
        TRUONGKHOA: 5,
        ADMIN: 6,
      }

      state.role = roles.reduce((mainIdRole, role) => {
        const temptIdRole = condition[role] || 0
        return Math.max(mainIdRole, temptIdRole)
      }, condition.DEFAULT)
    },
    setUserId: (state, actions) => {
      const userId = actions.payload || undefined
      state.userId = userId
    },
  },
})

// Action creators are generated for each case reducer function
export const { setRole, setUserId } = storeSlice.actions

export default storeSlice.reducer
