import { GetProfile_Success,GetProfile_Fail } from "../Constants/constants";
const initialState={
    profileInfo:{},
}
const profileReducer =( state=initialState,action)=>{
    switch(action.type)
    {
        case GetProfile_Success:
            return{...state,profileInfo:action.payload}
        case GetProfile_Fail:
            return state;
        default:
            return state;
    }
}
export default profileReducer;