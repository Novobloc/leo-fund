import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { WalletProvider } from "@/context/WalletContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <WalletProvider>
        <ToastContainer />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </WalletProvider>
    </div>
  );
}
