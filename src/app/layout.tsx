import type { Metadata } from "next";
import { AuthProvider } from "../../context/AuthContext";
import { WheelProvider } from "../../context/WheelContext";
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
        <AuthProvider>
          <WheelProvider>{children}</WheelProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
