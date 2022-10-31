import { HYDRATE, createWrapper } from 'next-redux-wrapper'
import user from './userSlice'


const masterReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            user: {
                user: action.payload.user.user
            }
        }
        return nextState;
    } else {
    return combinedReducer(state, action)
  }
}