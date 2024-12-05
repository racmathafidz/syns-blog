import { useMemo, useRef, useState } from "react";
import {
  EditOutlined,
  FilterOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Input,
  Button,
  Popover,
  Checkbox,
  PopoverProps,
  GetProps,
} from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import useSearchStore from "@/stores/searchStore";

const { Header } = Layout;
const { Search } = Input;

type SearchProps = GetProps<typeof Input.Search>;

export default function AppHeader() {
  const router = useRouter();
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [arrow, setArrow] = useState<"Show" | "Hide" | "Center">("Show");

  const onSearchSubmit: SearchProps["onSearch"] = (value) => {
    router.push("/");
    setSearchQuery(value);
  };

  const onSearchChange = (
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
          onSearch={onSearchSubmit}
          onChange={onSearchChange}
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
