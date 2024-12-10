import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    user: {},

    status: 'idle',
    error: null,
};


export const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        adduser:(state,action)=>{
            state.user = (action.payload);

        }

    }
})

export const {adduser} = UserSlice.actions;

export default UserSlice.reducer;
