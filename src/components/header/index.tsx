import { EditOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Button } from "antd";
import Link from "next/link";
import SearchInput from "./searchInput";
import FilterPopover from "./filterPopover";
import { getFromLocalStorage } from "@/lib/helper";
import constants from "@/constants";

const { Header } = Layout;

export default function AppHeader() {
  const userId = getFromLocalStorage(constants.localStorage.USER_ID);

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
      <div className="flex items-center gap-2">
        <Link href="/create">
          <Button>
            <EditOutlined />
            Write
          </Button>
        </Link>
        <Link href={`/user/${userId}`}>
          <Button shape="circle">
            <UserOutlined />
          </Button>
        </Link>
      </div>
    </Header>
  );
}
