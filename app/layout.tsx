import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from "./context/CartContext";
import { FavoritesProvider } from "./context/FavoritesContext";
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VoxHaul",
  description: "Marketplace Barang Gen Z",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <head>
        <title>VoxHaul</title>
        <meta name="description" content="Marketplace Creativox" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="flex flex-col min-h-screen">
        <FavoritesProvider>
          <CartProvider>
            <Navbar />
            <div className="flex-grow flex flex-col">
              {children}
            </div>
          </CartProvider>
        </FavoritesProvider>
        <Footer />
      </body>
    </html>
  )
}
