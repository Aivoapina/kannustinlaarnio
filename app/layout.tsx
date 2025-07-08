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
          <h2 className="text-4xl mb-5">FINNRUNS Summer 2025 kannusteet</h2>
          <p className="mb-5">
            Täällä voit osallistua lähetyksemme kulkuun generoimalla koodin, jonka liität osaksi lahjoitustasi. Valittavat kannusteet löydät alta.

          </p>
          <p className="mb-5 ">
            Valitse kannuste ja tämän jälkeen saat mahdollisuuden generoida koodin. Lisää saamasi koodi lahjoituksesi viestikenttään. 
            <br />
            <span className="font-bold">Huom. Viestikenttä aukeaa lahjoituksen maksamisen jälkeen. </span>Lahjoittajan etunimi on se nimi, jonka luemme lähetyksessä. Tähän voit myös laittaa esim. nimimerkkisi.
          </p>
          <p className="mb-5 border-b pb-5">
            <a className="font-bold underline text-lg" href="https://finnruns.fi/lahjoita" target="_blank">Voit siirtyä lahjoittamaan tästä.</a>
          </p>
          {children}
        </div>
      </body>
    </html>
  );
}
