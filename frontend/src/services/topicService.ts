import axios from "axios";
import { Topic } from "@/models/Topic";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
const API_URL = `${API_BASE_URL}/api/topics`;

export const getTopicsWithContentTypes = async (): Promise<Topic[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch topics and content types", error);
    throw new Error("Failed to fetch topics");
  }
};
