import type { Metadata } from "next";
import { Geist, Geist_Mono, Oswald } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { SitePreferencesProvider } from "./context/SitePreferencesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Accueil | Mon Projet",
    template: "%s | Mon Projet",
  },
  description: "Site portfolio Oussema Belhaouene",
  icons: {
    icon: "/images/logo-oussema.png",
    shortcut: "/images/logo-oussema.png",
    apple: "/images/logo-oussema.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SitePreferencesProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SitePreferencesProvider>
      </body>
    </html>
  );
}
