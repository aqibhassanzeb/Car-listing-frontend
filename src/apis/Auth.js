import { apiURL } from '../config'



export const userRegister=async(reqParam) => {
        const response  = await apiURL.post("signup", reqParam);
        return response;
      }

export const userLogin=async(reqParam) => {
        const response  = await apiURL.post("login", reqParam);
        return response;
      }
