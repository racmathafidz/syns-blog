import type { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import Head from "next/head";
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
        <Head>
          <title>Syns Blog</title>
          <meta
            name="title"
            content="Syns Blog - Explore the World of Knowledge"
          />
          <meta name="author" content="Racmat Hafidz Fadli" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
        </Head>
        <AppLayout>
          <WelcomeDialog />
          <Component {...pageProps} />
        </AppLayout>
      </ConfigProvider>
    </QueryClientProvider>
  );
}
