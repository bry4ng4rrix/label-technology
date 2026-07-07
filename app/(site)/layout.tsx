import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "next-themes";

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
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
}
