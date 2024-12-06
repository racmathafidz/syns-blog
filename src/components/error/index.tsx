import { Empty } from "antd";
import React from "react";

interface ErrorProps {
  message?: string;
}

export default function Error({ message }: ErrorProps) {
  return (
    <div className="flex justify-center items-center h-screen">
      <Empty description={message ? `Error: ${message}` : "No Data"} />
    </div>
  );
}
