import { Button, message, Modal, Typography } from "antd";
import { useRouter } from "next/router";
import { deletePost } from "@/api/posts";
import Skeleton from "@/components/skeleton";
import Error from "@/components/error";
import AuthorInformation from "@/components/users/authorInformation";
import { Author, Post } from "@/types";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import helpers from "@/lib/helper";
import constants from "@/constants";
import { useDetailPostsQuery } from "@/hooks";

const { Title, Text } = Typography;

interface BlogsProps {
  postData: Post;
  userData: Author;
}

export default function Blogs(props: BlogsProps) {
  const user_id =
    helpers.storage.getFromLocalStorage(constants.localStorage.USER_ID) || "0";
  const router = useRouter();
  const { slug } = router.query;

  const {
    data: postData,
    isLoading: isPostDataLoading,
    isPending: isPostDataPending,
    isError: isPostDataError,
    error: postDataError,
  } = useDetailPostsQuery(slug);

  const myOwnPost = parseInt(user_id as string, 10) === postData?.user_id;

  const handleEdit = () => {
    router.push({
      pathname: "/edit",
      query: {
        postData: JSON.stringify(postData),
      },
    });
  };

  const handleDelete = () => {
    Modal.confirm({
      title: "Are you sure you want to delete this post?",
      content: "This action cannot be undone.",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await deletePost(postData?.id);
          message.success("Post deleted successfully");
          router.push("/");
        } catch (error) {
          message.error("Failed to delete post");
        }
      },
    });
  };

  if (isPostDataLoading || isPostDataPending) return <Skeleton />;
  if (isPostDataError || !postData)
    return <Error message={postDataError?.message} />;

  return (
    <div className="flex justify-center py-8">
      <div className="w-9/12 sm:w-4/5 lg:w-3/5">
        <Title>{postData?.title}</Title>
        <AuthorInformation
          user_data={props.userData}
          user_id={postData?.user_id}
        />
        <div className="block">
          <Text>{postData?.body}</Text>
        </div>
        {myOwnPost && (
          <div className="flex space-x-4 mt-6">
            <Button icon={<EditOutlined />} onClick={handleEdit}>
              Edit
            </Button>
            <Button icon={<DeleteOutlined />} onClick={handleDelete}>
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
