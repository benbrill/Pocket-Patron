import type { Metadata } from "next";
import { DM_Mono, DM_Sans, Neuton, Instrument_Serif, Instrument_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Logo from "@/components/Logo";
import NavBar from "@/components/NavBar";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({ 
  variable: "--font-instrument-serif", weight: "400", subsets: ["latin"] 
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  weight: "400",
  subsets: ["latin"],
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  weight: "400",
  subsets: ["latin"],
  fallback: ["Arial"]
});

const neuton = Neuton({
  variable: "--font-neuton",
  weight: "400",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "PocketPatron",
  description: "Your live entertainment companion",
};

export default function RootLayout({
  children,
  modal
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${dmMono.variable} ${neuton.variable} ${instrumentSerif.variable} ${instrumentSans.variable} antialiased`}
        // style={{
        //   margin: `0 auto`,
        //   maxWidth: 1080,
        //   padding: `0 1.0875rem 1.45rem`,
        // }}
        >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
          enableSystem>
        <div className="m-3">
          <Logo />
        </div>
        {modal}
        {children}
        <NavBar />
        </ThemeProvider>
      </body>
    </html>
  );
}
