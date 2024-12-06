import { Card, Col, Typography } from "antd";
import Link from "next/link";
import { Post } from "@/types";

const { Text } = Typography;

interface PostsListItemCardProps {
  post: Post;
}

export default function PostsListItemCard({ post }: PostsListItemCardProps) {
  return (
    <Col xs={24} md={12}>
      <Link href={`/blogs/${post.id}`} className="h-max">
        <Card hoverable={true} className="min-w-[300px] h-full">
          <Card.Meta
            title={post.title}
            description={
              <Text type="secondary" className="line-clamp-2">
                {post.body}
              </Text>
            }
          />
        </Card>
      </Link>
    </Col>
  );
}
