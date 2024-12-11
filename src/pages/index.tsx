import PostsList from "@/components/posts/postsList";
import PostsPagination from "@/components/posts/postsPagination";
import Loading from "@/components/loading";
import Error from "@/components/error";
import { usePostsQuery } from "@/hooks";

export default function Home() {
  const {
    data,
    isLoading,
    isError,
    error,
    refetch: postsDataRefetch,
  } = usePostsQuery();

  const postsData = data?.postsData || [];
  const totalPosts = data?.totalPosts || 0;
  const emptyPostsData = postsData.length === 0;

  if (isLoading) return <Loading />;
  if (isError || emptyPostsData)
    return <Error message={error?.message || "No posts available."} />;

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
