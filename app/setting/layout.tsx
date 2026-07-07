import { ThemeProvider } from "next-themes";

export default function SettingLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="admin-theme"
    >
      {children}
    </ThemeProvider>
  );
}
