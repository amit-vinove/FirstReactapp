import { GetTodos_Fail,GetTodos_Success } from "../Constants/constants";
const initialState={
    todos:{},
}
const todosReducer =( state=initialState,action)=>{
    switch(action.type)
    {
        case GetTodos_Success:
            return{...state,todos:action.payload}
        case GetTodos_Fail:
            return state;
        default:
            return state;
    }
}
export default todosReducer;