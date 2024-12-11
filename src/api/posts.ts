import axios from "@/lib/axios";
import { Post } from "@/types";
import constants from "@/constants";
import Mustache from "@/lib/mustache";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_ROWS_PER_PAGE = 8;

interface Params {
  page: number;
  per_page: number;
  title?: string;
  user_id?: string;
}

interface CretePostFormData {
  user: number;
  title: string;
  body: string;
}

export const getAllPosts = async (
  currentPage?: number,
  searchQuery?: string | string[],
  userId?: string
) => {
  const params: Params = {
    page: currentPage || DEFAULT_PAGE_NUMBER,
    per_page: DEFAULT_ROWS_PER_PAGE,
  };

  if (searchQuery)
    params.title = Array.isArray(searchQuery) ? searchQuery[0] : searchQuery;

  if (userId) params.user_id = userId;

  return axios
    .get(constants.endpoints.GET_POSTS, { params })
    .then(({ data, headers }) => {
      const totalPosts = parseInt(headers["x-pagination-total"], 10) || 0;
      return { postsData: data, totalPosts };
    })
    .catch((error) => {
      return { postsData: [], totalPosts: 0 };
    });
};

export const getDetailPost = async (
  id?: string | string[]
): Promise<Post | null> => {
  if (!id) {
    return null;
  }

  return axios
    .get<Post>(Mustache(constants.endpoints.GET_DETAIL_POSTS, { id }))
    .then(({ data }) => data)
    .catch(() => {
      return null;
    });
};

export const createPost = async (formData: CretePostFormData) => {
  if (!formData) {
    return null;
  }

  const id = formData.user;

  return axios
    .post<Post>(Mustache(constants.endpoints.CREATE_POSTS, { id }), formData)
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error as any);
    });
};

export const editPost = async (formData: Post) => {
  if (!formData) {
    return null;
  }

  const id = formData.id;

  return axios
    .put<Post>(Mustache(constants.endpoints.EDIT_POSTS, { id }), formData)
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error as any);
    });
};

export const deletePost = async (id?: number) => {
  if (!id) {
    return null;
  }

  return axios
    .delete(Mustache(constants.endpoints.DELETE_POSTS, { id }))
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error as any);
    });
};
