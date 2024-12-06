import constants from "@/constants";
import { getFromLocalStorage } from "@/lib/helper";
import { FilterOutlined } from "@ant-design/icons";
import { Button, Checkbox, Popover, PopoverProps } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

export default function FilterPopover() {
  const router = useRouter();
  const { query } = router;
  const search = (query.search as string) || "";
  const page = parseInt((query.page as string) || "1", 10);
  const user_id = getFromLocalStorage(constants.localStorage.USER_ID);
  const [arrow, setArrow] = useState<"Show" | "Hide" | "Center">("Show");

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

  const onFilterChange = (e: CheckboxChangeEvent) => {
    const checked = e.target.checked;
    if (checked) {
      router.push({
        pathname: "/",
        query: {
          ...(user_id && { user_id: user_id }),
          page: 1,
        },
      });
    } else {
      router.push({
        pathname: "/",
        query: {
          ...(search && { search: search }),
          ...(page !== 1 && { page }),
        },
      });
    }
  };

  return (
    <Popover
      placement="bottomLeft"
      title="Filter"
      content={<Checkbox onChange={onFilterChange}>Only My Blogs</Checkbox>}
      arrow={mergedArrow}
    >
      <Button>
        <FilterOutlined />
      </Button>
    </Popover>
  );
}
