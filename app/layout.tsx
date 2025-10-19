import type { Metadata } from "next";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://micro-interactions-library.vercel.app"),
  title: "Micro-Interactions Library | 15 Copy-Paste Components",
  description:
    "A curated collection of 15 beautiful, accessible micro-interactions for modern web applications. Built with Next.js, TypeScript, and pure CSS animations. Copy, paste, and customize.",
  keywords: [
    "micro-interactions",
    "react components",
    "nextjs",
    "typescript",
    "css animations",
    "ui components",
    "web animations",
    "copy paste components",
    "accessible components",
    "dark mode",
  ],
  authors: [{ name: "Brandon Church" }],
  creator: "Brandon Church",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://micro-interactions-library.vercel.app",
    siteName: "Micro-Interactions Library",
    title: "Micro-Interactions Library | 15 Copy-Paste Components",
    description:
      "A curated collection of 15 beautiful, accessible micro-interactions for modern web applications. Built with Next.js, TypeScript, and pure CSS animations.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Micro-Interactions Library Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Micro-Interactions Library | 15 Copy-Paste Components",
    description:
      "A curated collection of 15 beautiful, accessible micro-interactions for modern web applications.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
  manifest: "/site.webmanifest",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function getTheme() {
                  const stored = localStorage.getItem('theme');
                  if (stored) return stored;
                  // Default to dark mode instead of checking system preference
                  return 'dark';
                }
                const theme = getTheme();
                document.documentElement.setAttribute('data-theme', theme);
                // Store dark as default if nothing is stored
                if (!localStorage.getItem('theme')) {
                  localStorage.setItem('theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <Header />
        <main style={{ flex: 1, paddingBottom: "var(--space-24)" }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
