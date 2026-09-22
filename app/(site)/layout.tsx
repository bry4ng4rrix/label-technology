import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "next-themes";

const ADSENSE_CLIENT = "ca-pub-1753315622175135";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      enableSystem={false}
      defaultTheme="light"
      storageKey="label-theme"
    >
      {/* Google AdSense — site public uniquement (pas sur /setting).
          Balise <script async> native : React 19 la hisse dans le <head> du HTML
          initial, ce qui permet la validation « Extrait de code AdSense ». */}
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        crossOrigin="anonymous"
      />
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
