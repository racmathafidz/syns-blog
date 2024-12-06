import { Pagination, Row } from "antd";
import { useRouter } from "next/router";

interface onChangePageType {
  (page: number): void;
}

interface PostsPaginationProps {
  onChangePage: onChangePageType;
  totalPosts?: number;
}

export default function PostsPagination({
  onChangePage,
  totalPosts,
}: PostsPaginationProps) {
  const router = useRouter();
  const { query } = router;
  const page = parseInt((query.page as string) || "1", 10);

  const onChangePageHandler = (page: number) => onChangePage(page);

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
