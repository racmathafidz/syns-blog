import axios from "@/lib/axios";
import { Author } from "@/types";
import constants from "@/constants";
import { getAllPosts } from "./posts";

export const getUser = async (user_id?: number) => {
  if (!user_id) {
    return null;
  }

  try {
    const { data } = await axios.get<Author>(
      `${constants.endpoints.USERS}/${user_id}`
    );

    return data;
  } catch (error) {
    return null;
  }
};

export const createUser = async (formData: Author): Promise<Author | null> => {
  if (!formData) {
    return null;
  }

  try {
    const response = await axios.post<Author>(
      constants.endpoints.USERS,
      formData
    );

    getAllPosts();

    return response.data;
  } catch (error) {
    throw new Error((error as any).response.data.message || "Invalid token");
  }
};
