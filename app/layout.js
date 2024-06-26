import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }) => {
  return (
    <>
      <Header />
      <div className={inter.className}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default RootLayout;
