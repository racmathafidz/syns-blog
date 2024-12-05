import axios from "@/lib/axios";
import ENDPOINTS from "@/constants/endpoints";
import { Post } from "@/types";

interface Params {
  page: number;
  per_page: number;
  title?: string;
}

export const getAllPosts = async (
  currentPage?: number,
  searchQuery?: string
) => {
  const DEFAULT_PAGE_NUMBER = 1;
  const DEFAULT_ROWS_PER_PAGE = 8;

  let params: Params = {
    page: currentPage || DEFAULT_PAGE_NUMBER,
    per_page: DEFAULT_ROWS_PER_PAGE,
  };

  if (searchQuery) params["title"] = searchQuery;

  const response = await axios.get<Post[]>(ENDPOINTS.POSTS.GET_ALL_POSTS, {
    params,
  });

  return response;
};
