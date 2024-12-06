import { GetProps, Input } from "antd";
import { useRouter } from "next/router";
import { useRef } from "react";

const { Search } = Input;

type SearchProps = GetProps<typeof Input.Search>;

export default function SearchInput() {
  const router = useRouter();
  const { query } = router;
  const user_id = (query.user_id as string) || "";
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onRoutePush = (newSearchQuery: string) => {
    router.push({
      pathname: "/",
      query: {
        ...(newSearchQuery && { search: newSearchQuery }),
        ...(user_id && { user_id: user_id }),
        page: 1,
      },
    });
  };

  const onSearchSubmit: SearchProps["onSearch"] = (value) => {
    onRoutePush(value);
  };

  const onSearchChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      onRoutePush(e.target.value);
    }, 500);
  };

  return (
    <Search
      placeholder="Search"
      allowClear
      onSearch={onSearchSubmit}
      onChange={onSearchChange}
      className="min-w-[50px] lg:min-w-[400px]"
    />
  );
}
