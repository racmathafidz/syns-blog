import axios from "@/lib/axios";
import { Author } from "@/types";
import constants from "@/constants";
import Mustache from "@/lib/mustache";

export const getUser = async (id?: number) => {
  if (!id) {
    return null;
  }

  return axios
    .get<Author>(Mustache(constants.endpoints.GET_USERS, { id }))
    .then(({ data }) => data)
    .catch((error) => null);
};

export const createUser = async (formData: Author): Promise<Author | null> => {
  if (!formData) {
    return null;
  }

  return axios
    .post<Author>(constants.endpoints.CREATE_USERS, formData)
    .then(({ data }) => data);
};
