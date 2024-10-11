import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';

export const store = configureStore({
    reducer:{
        auth: authReducer
    },
    // window._REDUX_DEVTOOLS_EXTENSION__ && window._REDUX_DEVTOOLS_EXTENSION__()
    devTools: process.env.NODE_ENV !== 'production'
}) 