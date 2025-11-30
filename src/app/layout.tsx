import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Listo - Familiens smarte hverdagsassistent",
  description:
    "Listo er AI-drevet app for måltidsplanlegging, handlelister og oppskrifter. Gjør hverdagen enklere for hele familien.",
  keywords: [
    "måltidsplanlegging",
    "handleliste",
    "oppskrifter",
    "familie",
    "AI",
    "middag",
    "ukeplan",
  ],
  authors: [{ name: "Listo" }],
  openGraph: {
    title: "Listo - Familiens smarte hverdagsassistent",
    description:
      "Aldri lur på hva dere skal ha til middag igjen. Listo planlegger, handler og inspirerer.",
    url: "https://listo.family",
    siteName: "Listo",
    locale: "nb_NO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Listo - Familiens smarte hverdagsassistent",
    description:
      "Aldri lur på hva dere skal ha til middag igjen. Listo planlegger, handler og inspirerer.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb" className={inter.variable}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
