import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Memory Card Game",
  description: "Latihan React Dasar - Memory Card Game",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        {/* Tag <body> dengan className font yang sudah diinisialisasi */}
        {/* antialiased: membuat teks terlihat lebih halus di layar */}
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* children = konten halaman (page.js) akan dirender di sini */}
        {children}
      </body>
    </html>
  );
}