import type { Metadata } from "next";
import { WorkshopClient } from "./workshop-client";
import { getSiteUrl_ } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Workshop: Product Management AI Native | Lima",
  description: "Workshop intensivo en Lima para Product Managers. Aprende el stack de ejecución AI-native que usan las startups de San Francisco para construir y lanzar productos más rápido.",
  keywords: [
    "AI product management",
    "workshop",
    "lima",
    "product management",
    "AI-native",
    "startup",
    "product development",
    "workshop lima",
    "taller product management"
  ],

  openGraph: {
    title: "Workshop: Product Management AI Native | Lima",
    description: "Workshop intensivo en Lima para Product Managers. Aprende el stack de ejecución AI-native que usan las startups de San Francisco.",
    url: getSiteUrl_("/"),
    images: [
      {
        url: "/prisma-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Workshop: Product Management AI Native en Lima",
      }
    ],
    locale: "es_PE",
  },

  twitter: {
    title: "Workshop: Product Management AI Native | Lima",
    description: "Workshop intensivo en Lima para Product Managers. Aprende el stack de ejecución AI-native.",
    images: ["/prisma-og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  }
};

export default function WorkshopPage() {
  return <WorkshopClient />;
}
