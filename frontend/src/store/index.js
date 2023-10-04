import {configureStore} from"@reduxjs/toolkit";
import{setupListeners} from "@reduxjs/toolkit/query";
import {userSliceApi} from "./reducer/userSlice";
import { authSliceApi } from "./reducer/authSlice.js";


export const store = configureStore({
reducer:{
[userSliceApi.reducerPath]:userSliceApi.reducer,
[authSliceApi.reducerPath]:authSliceApi.reducer,

},
middleware:(getDefaultMiddleware)=>
getDefaultMiddleware().concat( authSliceApi.middleware, userSliceApi.middleware),

});

setupListeners(store.dispatch);