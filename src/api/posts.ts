import axios from "@/lib/axios";
import { Post } from "@/types";
import constants from "@/constants";

const DEFAULT_PAGE_NUMBER = 1;
const DEFAULT_ROWS_PER_PAGE = 8;

interface Params {
  page: number;
  per_page: number;
  title?: string;
}

export const getAllPosts = async (
  currentPage?: number,
  searchQuery?: string | string[]
) => {
  try {
    const params: Params = {
      page: currentPage || DEFAULT_PAGE_NUMBER,
      per_page: DEFAULT_ROWS_PER_PAGE,
    };

    if (searchQuery)
      params.title = Array.isArray(searchQuery) ? searchQuery[0] : searchQuery;

    const { data, headers } = await axios.get<Post[]>(
      constants.endpoints.POSTS,
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
    const { data } = await axios.get<Post>(
      `${constants.endpoints.POSTS}/${Array.isArray(slug) ? slug[0] : slug}`
    );

    return data;
  } catch (error) {
    return null;
  }
};
