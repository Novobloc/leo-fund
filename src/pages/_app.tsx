import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import Header from "./_header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>

      <ToastContainer />
      <Header/>
      <Component {...pageProps} />
    </div>
  );
}
