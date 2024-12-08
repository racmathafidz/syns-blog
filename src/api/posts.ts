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
  try {
    const params: Params = {
      page: currentPage || DEFAULT_PAGE_NUMBER,
      per_page: DEFAULT_ROWS_PER_PAGE,
    };

    if (searchQuery)
      params.title = Array.isArray(searchQuery) ? searchQuery[0] : searchQuery;

    if (userId) params.user_id = userId;

    const { data, headers } = await axios.get<Post[]>(
      constants.endpoints.GET_POSTS,
      {
        params,
      }
    );

    const totalPosts = parseInt(headers["x-pagination-total"], 10) || 0;

    return { postsData: data, totalPosts };
  } catch (error) {
    return { postsData: [], totalPosts: 0 };
  }
};

export const getDetailPost = async (
  slug?: string | string[]
): Promise<Post | null> => {
  if (!slug) {
    return null;
  }

  try {
    const id = Array.isArray(slug) ? slug[0] : slug;
    const { data } = await axios.get<Post>(
      Mustache(constants.endpoints.GET_DETAIL_POSTS, { id })
    );

    return data;
  } catch (error) {
    return null;
  }
};

export const createPost = async (formData: CretePostFormData) => {
  if (!formData) {
    return null;
  }

  try {
    const id = formData.user;
    const response = await axios.post<Post>(
      Mustache(constants.endpoints.CREATE_POSTS, { id }),
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const editPost = async (formData: Post) => {
  if (!formData) {
    return null;
  }

  try {
    const id = formData.id;
    const response = await axios.put<Post>(
      Mustache(constants.endpoints.EDIT_POSTS, { id }),
      formData
    );
    return response.data;
  } catch (error) {
    throw new Error(error as any);
  }
};

export const deletePost = async (id?: number) => {
  if (!id) {
    return null;
  }

  try {
    const response = await axios.delete(
      Mustache(constants.endpoints.DELETE_POSTS, { id })
    );
    return response.data;
  } catch (error) {
    throw new Error(error as any);
  }
};
