import type { Metadata } from "next";
import "./globals.css";
import MagneticController from "@/components/MagneticController";

export const metadata: Metadata = {
  title: "Sorce | Let AI Apply to Jobs For You",
  description: "Upload your resume, swipe right on jobs, and let our AI agent apply for you.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-homepage-redesign="">
      <head>
        <link rel="stylesheet" href="/sorce.css" />
      </head>
      <body className="antialiased">
        <MagneticController />
        {children}
      </body>
    </html>
  );
}
