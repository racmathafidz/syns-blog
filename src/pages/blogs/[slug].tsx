import { useQuery } from "@tanstack/react-query";
import { Col, Typography } from "antd";
import { useRouter } from "next/router";
import { getDetailPost } from "@/api/posts";
import Skeleton from "@/components/skeleton";
import Error from "@/components/error";
import AuthorInformation from "@/components/users/authorInformation";
import { Author, Post } from "@/types";

const { Title, Text } = Typography;

interface BlogsProps {
  postData: Post;
  userData: Author;
}

export default function Blogs(props: BlogsProps) {
  const router = useRouter();
  const { slug } = router.query;

  const {
    data: postData,
    isLoading: isPostDataLoading,
    isPending: isPostDataPending,
    isError: isPostDataError,
    error: postDataError,
  } = useQuery({
    queryKey: ["posts", slug],
    queryFn: () => getDetailPost(slug),
  });

  if (isPostDataLoading || isPostDataPending) return <Skeleton />;
  if (isPostDataError || !postData)
    return <Error message={postDataError?.message} />;

  return (
    <div className="flex justify-center py-8">
      <Col className="max-w-[800px]">
        <Title>{postData?.title}</Title>
        <AuthorInformation
          user_data={props.userData}
          user_id={postData?.user_id}
        />
        <div className="block">
          <Text>{postData?.body}</Text>
        </div>
      </Col>
    </div>
  );
}
