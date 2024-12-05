import { useState } from "react";
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { getAllPosts } from "@/api/posts";
import PostsList from "@/components/posts/postsList";
import PostsPagination from "@/components/posts/postsPagination";
import Loading from "@/components/loading";
import Error from "@/components/error";

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
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => getAllPosts(currentPage),
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
      <PostsPagination
        currentPage={currentPage}
        onChangePage={onChangePage}
        totalPosts={totalPosts}
      />
    </div>
  );
}
