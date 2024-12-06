import BlogItemCard from "@/components/posts/postsListItemCard";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Pagination, Row, Space, Typography } from "antd";
const { Title } = Typography;

export default function User() {
  return (
    <div className="py-8 px-12">
      <Space direction="horizontal">
        <Avatar size={64} icon={<UserOutlined />} />
        <Title className="ml-4 !mb-0">John Doe</Title>
      </Space>
      <Row gutter={[16, 24]} className="mt-6">
        {/* {Array(8)
          .fill(null)
          .map((items, i) => (
            <BlogItemCard key={i} />
          ))} */}
      </Row>
      <Row className="flex items-center justify-center mt-6">
        <Pagination defaultCurrent={1} total={50} />
      </Row>
    </div>
  );
}
