import { useQuery } from "@tanstack/react-query";
import { Col, Space, Typography } from "antd";
import { useRouter } from "next/router";
import { getDetailPost } from "@/api/posts";
import Skeleton from "@/components/skeleton";
import Error from "@/components/error";
import AuthorInformation from "@/components/header/authorInformation";

const { Title, Text } = Typography;

export default function Blogs() {
  const router = useRouter();
  const { slug } = router.query;

  const {
    data: postData,
    isLoading: isPostDataLoading,
    isError: isPostDataError,
    error: postDataError,
  } = useQuery({
    queryKey: ["posts", slug],
    queryFn: () => getDetailPost(slug),
  });

  if (isPostDataLoading) return <Skeleton />;
  if (isPostDataError || !postData)
    return <Error message={postDataError?.message} />;

  return (
    <div className="flex justify-center py-8">
      <Col className="max-w-[800px]">
        <Title>{postData?.data.title}</Title>
        <AuthorInformation user_id={postData?.data.user_id} />
        <Space direction="vertical">
          <Text>{postData?.data.body}</Text>
        </Space>
      </Col>
    </div>
  );
}
