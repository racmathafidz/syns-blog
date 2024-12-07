import axios from "@/lib/axios";
import { Author } from "@/types";
import constants from "@/constants";
import { getAllPosts } from "./posts";
import Mustache from "@/lib/mustache";

export const getUser = async (id?: number) => {
  if (!id) {
    return null;
  }

  try {
    const { data } = await axios.get<Author>(
      Mustache(constants.endpoints.GET_USERS, { id })
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
      constants.endpoints.CREATE_USERS,
      formData
    );

    getAllPosts();

    return response.data;
  } catch (error) {
    throw new Error((error as any).response.data.message || "Invalid token");
  }
};
