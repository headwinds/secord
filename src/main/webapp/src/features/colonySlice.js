import { createSlice } from '@reduxjs/toolkit'

const colonySlice = createSlice({
  name: 'colony',
  initialState: [],
  reducers: {
    addColonist(state, action) {
      const { id, name } = action.payload
      state.push({ id, name})
    }
  }
})

export const { addColonist } = colonySlice.actions

export default colonySlice.reducer