import { createSlice, current } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";

const initialState = {}

export const questionSlice = createSlice({
    name: 'Questions',
    initialState,
    reducers:{
        add: (state,{payload})=>{
            const {id, option} =  payload
            const obj = {[id]:option}
            return {...state, ...obj}
        }
    }
})
export const {add} = questionSlice.actions
export default questionSlice.reducer