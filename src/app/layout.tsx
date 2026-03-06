import type { Metadata, Viewport } from "next";
import { siteConfig, buildCssVariables, buildGoogleFontsUrl } from "@/lib/site.config";
import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.metadata.title,
  description: siteConfig.metadata.description,
};

export const viewport: Viewport = {
  themeColor: siteConfig.colors.background,
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cssVars = buildCssVariables();
  const fontsUrl = buildGoogleFontsUrl();

  return (
    <html lang="en" style={cssVars as React.CSSProperties}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href={fontsUrl} />
      </head>
      <body className="font-body antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
