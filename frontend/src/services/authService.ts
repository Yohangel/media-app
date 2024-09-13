import axios from "axios";
import { LoggedUser, User } from "@/models/User";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
const API_URL = `${API_BASE_URL}/api/users`;

export const login = async (username: string, password: string): Promise<LoggedUser> => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; 
  } catch (error) {
    console.error(error);
    throw new Error("Failed to login");
  }
};

export const register = async (userData: Partial<User>): Promise<User> => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to register");
  }
};
