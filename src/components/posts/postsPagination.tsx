import { useParseQueryParams } from "@/hooks";
import { Pagination, Row } from "antd";
import { useRouter } from "next/router";

interface onChangePageType {
  (): void;
}

interface PostsPaginationProps {
  postsDataRefetch: onChangePageType;
  totalPosts?: number;
}

export default function PostsPagination({
  postsDataRefetch,
  totalPosts,
}: PostsPaginationProps) {
  const router = useRouter();
  const { search, page, user_id } = useParseQueryParams();

  const onChangePageHandler = (newPage: number) => {
    router.push({
      pathname: "/",
      query: {
        ...(search && { search }),
        ...(user_id && { user_id }),
        page: newPage,
      },
    });

    postsDataRefetch();
  };

  return (
    <Row className="flex items-center justify-center mt-6">
      <Pagination
        defaultCurrent={1}
        current={page}
        total={totalPosts}
        onChange={onChangePageHandler}
        showSizeChanger={false}
      />
    </Row>
  );
}
