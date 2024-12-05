import { getUser } from "@/api/users";
import { Post } from "@/types";
import { UserOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Skeleton, Space, Typography } from "antd";

const { Text } = Typography;

interface AuthorInformationProps {
  user_id: Post["user_id"];
}

export default function AuthorInformation({ user_id }: AuthorInformationProps) {
  const {
    data: userData,
    isLoading: isUserDataLoading,
    isError: isUserDataError,
  } = useQuery({
    queryKey: ["user", user_id],
    queryFn: () => getUser(user_id),
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
        <Text>{userData?.data.name}</Text>
        <Text type="secondary">{userData?.data.email}</Text>
      </Space>
    </Space>
  );
}
