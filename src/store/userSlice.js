import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  userNm: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.userNm = action.payload.userNm;
    },
    clearUser: (state) => {
      state.userId = '';
      state.userNm = '';
    }
  }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;