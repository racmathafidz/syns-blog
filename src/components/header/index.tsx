import { useMemo, useRef, useState } from "react";
import {
  EditOutlined,
  FilterOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Input, Button, Popover, Checkbox, PopoverProps } from "antd";
import Link from "next/link";
import useSearchStore from "@/stores/searchStore";

const { Header } = Layout;
const { Search } = Input;

export default function AppHeader() {
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [arrow, setArrow] = useState<"Show" | "Hide" | "Center">("Show");

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

  const mergedArrow = useMemo<PopoverProps["arrow"]>(() => {
    if (arrow === "Hide") {
      return false;
    }

    if (arrow === "Show") {
      return true;
    }

    return {
      pointAtCenter: true,
    };
  }, [arrow]);

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
        <Popover
          placement="bottomLeft"
          title="Filter"
          content={<Checkbox /*onChange={onChange}*/>Only My Blogs</Checkbox>}
          arrow={mergedArrow}
        >
          <Button>
            <FilterOutlined />
          </Button>
        </Popover>
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
