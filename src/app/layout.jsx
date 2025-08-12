'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import Header from "./components/Header/header";
import Footer from "./components/footer/footer";
import OffersBar from "./components/Header/offers";
import { Divider } from '@mui/material';
import InformationBar from "./components/Header/information";
import Navbar from "./components/Header/navbar";
import { Providers } from './providers';
import FloatingCartButton from './components/FloatingCartButton/FloatingCartButton';
import { CartProvider } from '../context/CartContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});
 
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning>
        <Providers>
          <CartProvider>
            <div className="app-container">
              <OffersBar />
              <Divider />
              <InformationBar />
              <Divider />
              <Header />
              <Navbar />
              <Divider />
              <main className="main-content">
                {children}
              </main>
              <FloatingCartButton />
              <Footer />
            </div>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
