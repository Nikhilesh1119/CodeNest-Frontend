import {createSlice} from '@reduxjs/toolkit'

const authSlice=createSlice({
    name:'auth',
    initialState:{isLoggedin:false,user:null},
    reducers:{
        login(state,action){
            state.isLoggedin=true;
            state.user=action.payload;
        },
        logout(state){
            state.isLoggedin=false;
        }
    }
})

export const authAction=authSlice.actions;
export default authSlice;