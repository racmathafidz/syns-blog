import { useRef } from "react";
import {
  EditOutlined,
  FilterOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Input, Button } from "antd";
import Link from "next/link";
import useSearchStore from "@/stores/searchStore";

const { Header } = Layout;
const { Search } = Input;

export default function AppHeader() {
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const onSearch = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setSearchQuery(e.target.value);
    }, 500);
  };

  return (
    <Header className="justify-between">
      <Link href="/">
        <Button shape="circle">
          <HomeOutlined />
        </Button>
      </Link>
      <div className="flex items-center gap-2">
        <Search
          placeholder="Search"
          allowClear
          onChange={onSearch}
          className="min-w-[400px]"
        />
        <Button>
          <FilterOutlined />
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Link href="/create">
          <Button>
            <EditOutlined />
            Write
          </Button>
        </Link>
        <Link href="/user/username">
          <Button shape="circle">
            <UserOutlined />
          </Button>
        </Link>
      </div>
    </Header>
  );
}
