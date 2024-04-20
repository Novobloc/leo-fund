import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import Header from "../components/Header";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ToastContainer />
      <Header connectWallet={console.log("connect wallert")} address={"asdf"} />
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}
