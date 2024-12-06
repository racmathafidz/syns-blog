import { getUser } from "@/api/users";
import { Author, Post } from "@/types";
import { UserOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Skeleton, Space, Typography } from "antd";

const { Text } = Typography;

interface AuthorInformationProps {
  user_data: Author;
  user_id: Post["user_id"];
}

export default function AuthorInformation({
  user_data,
  user_id,
}: AuthorInformationProps) {
  const {
    data: userData,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
  } = useQuery({
    queryKey: ["user", user_id],
    queryFn: () => getUser(user_id),
    initialData: user_data,
    retry: 1,
  });

  if (isUserDataLoading)
    return <Skeleton.Input size="small" className="mb-4" />;

  if (isUserDataError || !userData)
    return (
      <Space direction="horizontal" size="middle" className="mb-4">
        <Avatar icon={<UserOutlined />} />
        <Space direction="vertical" size={0}>
          <Text>Unknown Author</Text>
        </Space>
      </Space>
    );

  return (
    <Space direction="horizontal" size="middle" className="mb-4">
      <Avatar icon={<UserOutlined />} />
      <Space direction="vertical" size={0}>
        <Text>{userData?.name}</Text>
        <Text type="secondary">{userData?.email}</Text>
      </Space>
    </Space>
  );
}
