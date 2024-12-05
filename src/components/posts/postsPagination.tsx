import { Pagination, Row } from "antd";

interface onChangePageType {
  (page: number): void;
}

interface PostsPaginationProps {
  currentPage: number;
  onChangePage: onChangePageType;
  totalPosts: number;
}

export default function PostsPagination({
  currentPage,
  onChangePage,
  totalPosts,
}: PostsPaginationProps) {
  const onChangePageHandler = (page: number) => onChangePage(page);

  return (
    <Row className="flex items-center justify-center mt-6">
      <Pagination
        defaultCurrent={1}
        current={currentPage}
        total={totalPosts}
        onChange={onChangePageHandler}
        showSizeChanger={false}
      />
    </Row>
  );
}
