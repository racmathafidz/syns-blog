import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getAllPosts } from "@/api/posts";
import PostsList from "@/components/posts/postsList";
import PostsPagination from "@/components/posts/postsPagination";
import Loading from "@/components/loading";
import Error from "@/components/error";

export default function Home() {
  const router = useRouter();
  const { query } = router;
  const search = (query.search as string) || "";
  const page = parseInt((query.page as string) || "1", 10);
  const user_id = (query.user_id as string) || "";

  const {
    data,
    isLoading: isPostsDataLoading,
    isError: isPostsDataError,
    error: postsDataError,
    refetch: postsDataRefetch,
  } = useQuery({
    queryKey: ["posts", page, search, user_id],
    queryFn: () => getAllPosts(page, search, user_id),
  });

  const postsData = data?.postsData || [];
  const totalPosts = data?.totalPosts || 0;
  const emptyPostsData = postsData.length === 0;

  if (isPostsDataLoading) return <Loading />;
  if (isPostsDataError || emptyPostsData)
    return <Error message={postsDataError?.message || "No posts available."} />;

  return (
    <div className="py-4 px-12">
      <PostsList posts={postsData} />
      <PostsPagination
        postsDataRefetch={postsDataRefetch}
        totalPosts={totalPosts}
      />
    </div>
  );
}
