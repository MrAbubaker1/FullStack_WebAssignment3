import { Inter } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className={`flex-grow ${inter.className}`}>
        <div className="overflow-y-auto max-h-[calc(100vh-96px)]"> 
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
