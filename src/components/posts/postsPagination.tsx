import useSearchStore from "@/stores/searchStore";
import { Pagination, Row } from "antd";

interface onChangePageType {
  (page: number): void;
}

interface PostsPaginationProps {
  onChangePage: onChangePageType;
  totalPosts: number;
}

export default function PostsPagination({
  onChangePage,
  totalPosts,
}: PostsPaginationProps) {
  const currentPage = useSearchStore((state) => state.currentPage);
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
