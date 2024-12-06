import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import APP_THEME from "@/constants/theme";
import AppLayout from "@/layout";
import createQueryClient from "@/lib/queryClient";
import WelcomeDialog from "@/components/welcomeDialog";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(createQueryClient);

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
