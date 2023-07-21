import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    password: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state, { payload }) => {
            state.username = payload.username;
            state.password = payload.password;
        },
    },
});

export const { setLogin, logOut } = userSlice.actions;

export default userSlice.reducer;