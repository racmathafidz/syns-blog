import { getAllPosts, getDetailPost } from "@/api/posts";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export const useParseQueryParams = () => {
  const router = useRouter();
  const { query }: Record<string, any> = router;
  const search = query.search || "";
  const page = parseInt(query.page || "1", 10);
  const user_id = query.user_id || "";
  return { search, page, user_id };
};

export const usePostsQuery = () => {
  const { search, page, user_id } = useParseQueryParams();

  return useQuery({
    queryKey: ["posts", page, search, user_id],
    queryFn: () => getAllPosts(page, search, user_id),
  });
};

export const useDetailPostsQuery = (slug?: string | string[]) => {
  const post_id = Array.isArray(slug) ? slug[0] : slug;

  return useQuery({
    queryKey: ["posts", post_id],
    queryFn: () => getDetailPost(post_id),
  });
};
