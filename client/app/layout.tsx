import type { Metadata } from "next";
import "./globals.css";
import { Outfit } from "next/font/google";
import { ThirdwebProvider } from "thirdweb/react";

export const metadata: Metadata = {
  title: "AgroXchange",
  description: "Putting agro-commidity on chain",
};

const outfit = Outfit({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={outfit.className}
      >
        <ThirdwebProvider>
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
