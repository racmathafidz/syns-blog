import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { getAllPosts } from "@/api/posts";
import PostsList from "@/components/posts/postsList";
import PostsPagination from "@/components/posts/postsPagination";
import Loading from "@/components/loading";
import Error from "@/components/error";
import useSearchStore from "@/stores/searchStore";

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: () => getAllPosts(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default function Home() {
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const currentPage = useSearchStore((state) => state.currentPage);
  const setCurrentPage = useSearchStore((state) => state.setCurrentPage);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts", currentPage, searchQuery],
    queryFn: () => getAllPosts(currentPage, searchQuery),
  });

  const onChangePage = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  const postsData = data?.data;
  const emptyPostsData = !postsData || postsData.length === 0;
  const totalPosts = parseInt(data?.headers["x-pagination-total"], 10);

  if (isLoading) return <Loading />;
  if (isError || emptyPostsData) return <Error message={error?.message} />;

  return (
    <div className="py-4 px-12">
      <PostsList posts={postsData} />
      <PostsPagination onChangePage={onChangePage} totalPosts={totalPosts} />
    </div>
  );
}
