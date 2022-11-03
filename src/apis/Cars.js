import { apiURL } from "../config";

let usertoken = localStorage.getItem("token")
const config = {
  headers: {

    Authorization: `Bearer ${usertoken}`
  }
}

export const showCar = async (reqParam) => {
  const response = await apiURL.get(`cars?type=${reqParam}`, config);
  return response;
}

export const showCategories = async (reqParam) => {
  const response = await apiURL.get("category", config);
  return response;
}

export const addCategory = async (reqParam) => {
  const response = await apiURL.post("addcategory", reqParam, config);
  return response;
}

export const addCar = async (reqParam) => {
  const response = await apiURL.post("addcar", reqParam, config);
  return response;
}

export const deleteCar = async (reqParam) => {
  const response = await apiURL.delete(`car/${reqParam}`, config);
  return response;
}

export const deleteCateg = async (reqParam) => {
  const response = await apiURL.delete(`category/${reqParam}`, config);
  return response;
}

export const fetchbyIdCateg = async (reqParam) => {
  const response = await apiURL.get(`fetchbyidcategory/${reqParam}`, config);
  return response;
}

export const updateCateg = async (reqParam) => {
  const { name, updateId } = reqParam
  const payload = { name }
  const response = await apiURL.put(`updatecategory/${updateId}`, payload, config);
  return response;
}

export const fetchbyIdCar = async (reqParam) => {
  const response = await apiURL.get(`fetchbyidcar/${reqParam}`, config);
  return response;
}

export const updateCar = async (reqParam) => {
  const { name, colour, model, registerationNo, type, updateId } = reqParam
  const payload = { name, colour, model, registerationNo, type }
  const response = await apiURL.put(`updatecar/${updateId}`, payload, config);
  return response;
}
