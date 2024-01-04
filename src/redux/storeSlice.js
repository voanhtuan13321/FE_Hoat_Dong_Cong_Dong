import { createSlice } from '@reduxjs/toolkit'
import { ROLES } from '../utils'

const initialState = {
  role: ROLES.admin,
}

export const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setRole: (state, actions) => {
      const roles = actions.payload || []

      const condition = {
        NGUOIDUNGANDANH: 1,
        SINHVIEN: 2,
        LOPTRUONG: 3,
        GIAOVIEN: 4,
        TRUONGKHOA: 5,
        ADMIN: 6,
      }

      let mainIdRole = condition.NGUOIDUNGANDANH

      roles.forEach(role => {
        const temptIdRole = condition[role]
        mainIdRole < temptIdRole && (mainIdRole = temptIdRole)
      })

      state.role = mainIdRole
    },
  },
})

// Action creators are generated for each case reducer function
export const { setRole } = storeSlice.actions

export default storeSlice.reducer
