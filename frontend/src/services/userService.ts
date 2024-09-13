import axios from "axios";
import { User } from "@/models/User";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/api/users`;

export const getUsers = async (token: string): Promise<User[]> => {
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.users;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch users");
  }
};

export const getUserById = async (userId: string, token: string): Promise<User> => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch user");
  }
};