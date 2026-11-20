import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-mono",
  weight: "100 900",
});

export const viewport: Viewport = {
  themeColor: "#05070d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Prince Prajapati | Aspiring Web Developer & Cybersecurity Enthusiast",
  description:
    "Portfolio of Prince Prajapati — Final-year B.Tech IT Student (Cybersecurity Honors) based in Mumbai. Building Digital Experiences. Exploring Cybersecurity. Solving Real-World Problems.",
  keywords: [
    "Prince Prajapati",
    "Cybersecurity",
    "Web Developer",
    "Information Technology",
    "Network Security",
    "FastAPI",
    "React.js",
    "Intrusion Detection",
    "pfSense",
    "Wireshark",
    "Mumbai Developer",
  ],
  authors: [{ name: "Prince Prajapati" }],
  creator: "Prince Prajapati",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://princeprajapati.dev",
    title: "Prince Prajapati | Aspiring Web Developer & Cybersecurity Enthusiast",
    description:
      "Building Digital Experiences. Exploring Cybersecurity. Solving Real-World Problems. B.Tech IT (Cybersecurity Honors) student portfolio.",
    siteName: "Prince Prajapati Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prince Prajapati | Web Developer & Cybersecurity Enthusiast",
    description:
      "Building Digital Experiences. Exploring Cybersecurity. Solving Real-World Problems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-[#05070d] text-slate-100 antialiased selection:bg-blue-600/30 selection:text-blue-300 min-h-screen relative`}
      >
        {children}
      </body>
    </html>
  );
}
