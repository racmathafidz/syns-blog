import { useQuery } from "@tanstack/react-query";
import { Col, Space, Typography } from "antd";
import { useRouter } from "next/router";
import { getDetailPost } from "@/api/posts";
import Skeleton from "@/components/skeleton";
import Error from "@/components/error";
import AuthorInformation from "@/components/header/authorInformation";
import { GetServerSidePropsContext } from "next";
import { Author, Post } from "@/types";
import { getUser } from "@/api/users";

const { Title, Text } = Typography;

interface BlogsProps {
  postData: Post;
  userData: Author;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { slug } = context.params || {};
  const postData = await getDetailPost(slug);
  const userData = await getUser(postData?.user_id);
  return {
    props: { postData, userData },
  };
}

export default function Blogs(props: BlogsProps) {
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
    initialData: props.postData,
  });

  if (isPostDataLoading) return <Skeleton />;
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
        <Space direction="vertical">
          <Text>{postData?.body}</Text>
        </Space>
      </Col>
    </div>
  );
}
