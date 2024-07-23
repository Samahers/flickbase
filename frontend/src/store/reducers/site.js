import {createSlice } from '@reduxjs/toolkit'



export const siteSlice = createSlice({

    name:'site',
    initialState:{

        layout:''
    },
    reducers:{
        setLayout:(state,action)=>{
            state.layout = action.payload
        }
    }
});


/// actions here
export const { setLayout } = siteSlice.actions

export default siteSlice.reducer