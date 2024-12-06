import { FilterOutlined } from "@ant-design/icons";
import { Button, Checkbox, Popover, PopoverProps } from "antd";
import { useMemo, useState } from "react";

export default function FilterPopover() {
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

  return (
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
  );
}
