import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import APP_THEME from "@/constants/theme";
import AppLayout from "@/layout";
import WelcomeDialog from "@/components/welcomeDialog";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={APP_THEME}>
        <AppLayout>
          <WelcomeDialog />
          <Component {...pageProps} />
        </AppLayout>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
