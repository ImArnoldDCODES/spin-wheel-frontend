import type { Metadata } from "next";
import { AuthProvider } from "../../context/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Spin The Wheel",
  description: "Spin The Wheel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
