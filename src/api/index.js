import axios from "axios"; 
export const API_URL = "http://localhost:3000/api/"; 
 
//////// AUTH ROUTES //////// 
export const tryLogin     = async (data) => axios.post(`${API_URL}auth/login`, data); 
export const tryRegister  = async (data) => axios.post(`${API_URL}auth/register`, data); 
export const logoutUser   = async () => axios.post(`${API_URL}logout`, {}); 
 
export const getCategories  = async () => axios.get(`${API_URL}categories`); 
export const addCategory  = async (data) => axios.post(`${API_URL}categories`, data); 
export const updateCategory  = async (data) => axios.put(`${API_URL}categories/${data._id}`, data); 
export const deleteCategory  = async (data) => axios.delete(`${API_URL}categories/${data._id}`); 
 
 
export const getCar  = async () => axios.get(`${API_URL}cars`);  
export const addCar  = async (data) => axios.post(`${API_URL}cars`, data); 
export const updateCar  = async (data) => axios.put(`${API_URL}cars/${data._id}`, data); 
export const deleteCar  = async (data) => axios.delete(`${API_URL}cars/${data._id}`); 
    