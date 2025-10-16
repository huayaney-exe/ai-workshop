import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workshop: Product Management AI Native | Lima",
  description: "Workshop intensivo en Lima para Product Managers. Aprende el stack de ejecución AI-native que usan las startups de San Francisco para construir y lanzar productos más rápido.",
  icons: {
    icon: [
      {
        url: "/prisma-favikon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/prisma-favikon.svg",
    apple: "/prisma-favikon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
