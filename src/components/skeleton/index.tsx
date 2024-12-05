import { Skeleton } from "antd";

export default function AppSkeleton() {
  return (
    <div className="flex justify-center py-12">
      <div className="w-full max-w-[800px]">
        <Skeleton />
      </div>
    </div>
  );
}
