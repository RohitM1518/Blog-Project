import {createSlice} from "@reduxjs/toolkit";

// This store is used for to make sure wether the user is looged in or loged out

const initialState = {
    status: false,
    userData: null // No need to spread the value redux will handle it
}

const authSlice = createSlice({
   name: "auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.userData = action.payload.userData; // No need to spread the value redux will handle it
        },
        logout:(state) =>{
            state.status=false;
            state.userData=null;
        }
    }
})
export const{login,logout}=authSlice.actions;
export default authSlice.reducer;