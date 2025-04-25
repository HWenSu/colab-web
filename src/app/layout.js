import { Quantico } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// 設定 Quantico 字體
const quantico = Quantico({
  variable: "--font-quantico", // 設定 CSS 變數
  subsets: ["latin"], // 指定支援的字元集
  weight: ["400", "700"], // 可選字重（這裡包含 Regular 和 Bold）
});

export const metadata = {
  title: "Colab Design",
  description: "Far Eastern New Century innovation team",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${quantico.variable} antialiased`}>
        <Navbar />
        <main className="min-h-[100vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
