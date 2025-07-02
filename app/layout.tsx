import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kannustimet",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="max-w-3xl m-auto mt-20 px-4">
          <h2 className="text-4xl mb-5">FINNRUNS Summer 2025 kannustimet</h2>
          <p className="mb-5">
            Voit generoida täällä koodin jonka liität osaksi lahjoitusta. Löydät alhaalta kaikki kannustimet.
            Valitse kannustin ja valitse sille haluamasi arvot. Tämän jälkeen saat mahdollisuuden generoida koodin.
            Kun saat koodin niin siirry lahjoitus sivulle ja lisää tämä koodi lahjoituksen viestikenttään.
            Viestikenttä ja lahjoittajan nimi ilmestyy vasta lahjoituksen maksun jälkeen.
          </p>
          {children}
        </div>
      </body>
    </html>
  );
}
