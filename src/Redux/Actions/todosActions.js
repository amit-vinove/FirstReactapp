import axios from "axios";
import {
    GetTodos_Success,GetTodos_Fail, GetProfile_Fail, GetProfile_Success
} from "../Constants/constants"
const listTodos = (username) => {
    return async (dispatch) => {
        try {
            const res = await axios({
                method: 'get',
                url: `http://localhost:5032/api/Todo/GetTodoByUsername?username=${username}`,
            });
            const  data  = res.data;
            if (data) {
                await dispatch({
                    type: GetTodos_Success,
                    payload: data
                });
            }
        }
        catch (error) {
            console.log(error);
            if (error.reponse) {
                dispatch({
                    type: GetTodos_Fail,
                    payload: error.reponse.data.message,
                });
            }
        }
    }
}

const GetProfile = (loggedUsername) =>{
    return async (dispatch) =>{
        try {
            const res = await axios({
                method:'get',
                url:`http://localhost:5032/api/Employee/GetEmployeeByUsername?username=${loggedUsername}`
            })
            const data = res.data;
            if(data){
                await dispatch({
                    type:GetProfile_Success,
                    payload:data
                })
            }
        } catch (error) {
            console.log(error)
            if(error.response){
                dispatch({
                    type:GetProfile_Fail,
                    payload:error.response.data.message
                })
            }
        }
    }
}
export {listTodos,GetProfile};