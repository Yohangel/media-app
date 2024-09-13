import axios from "axios";
import { Content } from "@/models/Content";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
const API_URL = `${API_BASE_URL}/api/content`;

export const getContent = async (
  query: string = "",
  searchBy: string = ""
): Promise<Content[]> => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: {
        [searchBy]: query, // Dynamically set the searchBy parameter (either type or topic)
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch content");
  }
};

export const getContentById = async (id: string, token: string): Promise<Content> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch content");
  }
};

export const createContent = async (contentData: FormData | Omit<Content, "id">, token: string): Promise<Content> => {
  try {
    const response = await axios.post(`${API_URL}`, contentData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create content");
  }
};