import "@/app/globals.css";

import { Inter } from "next/font/google";
import AuthProvider from "@/components/Provider";
import { Provider } from 'react-redux';
import { store } from '../store';
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NextJs 14 App Router and NextAuth",
  description: "NextJs 14 App Router and NextAuth",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
