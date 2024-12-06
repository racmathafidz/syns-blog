import { Row } from "antd";
import PostsListItemCard from "./postsListItemCard";
import { Post } from "@/types";

interface PostsListProps {
  posts: Post[];
}

export default function PostsList({ posts }: PostsListProps) {
  return (
    <Row gutter={[16, 24]}>
      {posts.map((items, i) => (
        <PostsListItemCard post={items} key={i} />
      ))}
    </Row>
  );
}
