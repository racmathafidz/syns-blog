import { EditOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Button } from "antd";
import Link from "next/link";
import SearchInput from "./searchInput";
import FilterPopover from "./filterPopover";

const { Header } = Layout;

export default function AppHeader() {
  return (
    <Header className="justify-between">
      <Link href="/">
        <Button shape="circle">
          <HomeOutlined />
        </Button>
      </Link>
      <div className="flex items-center gap-2">
        <SearchInput />
        <FilterPopover />
      </div>
      <Link href="/create">
        <Button>
          <EditOutlined />
          Write
        </Button>
      </Link>
    </Header>
  );
}
