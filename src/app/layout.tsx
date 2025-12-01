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
  icons: {
    icon: "/images/listo-logo.svg",
    apple: "/images/listo-logo.svg",
  },
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
      <head>
        <script
          defer
          src="https://analytics.listo.family/script.js"
          data-website-id="1b61f65c-a9f0-473d-856b-a1ac47f61c0f"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
