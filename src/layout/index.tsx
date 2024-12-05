import Header from "@/components/header";
import { Layout } from "antd";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Layout>
      <Header />
      <Layout.Content>{children}</Layout.Content>
    </Layout>
  );
}
