import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: localStorage.getItem('token')?true:false,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        login: (state, action) => {
            state.isAuthenticated = true
            state.user = action.payload
            localStorage.setItem('token', action.payload);
        },
        logout: (state) =>{
            state.isAuthenticated = false
            state.user = null
            localStorage.removeItem('token');
        },
    }
});

export const { login, logout } = authSlice.actions
export default authSlice.reducer 