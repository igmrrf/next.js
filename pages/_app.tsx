import type { AppProps } from "next/app";
import "../styles/globals.css";
import ErrorBoundary from "./500";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}

export default MyApp;
