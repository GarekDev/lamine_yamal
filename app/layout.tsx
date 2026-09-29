import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-instrument-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Lamine Yamal | Perfil editorial",
  description:
    "Perfil de Lamine Yamal, extremo del Barcelona. Debutó a los 15 años. Campeón de la Euro 2024 y Kopa 2024.",
  openGraph: {
    title: "Lamine Yamal | Perfil editorial",
    description:
      "Perfil de Lamine Yamal, extremo del Barcelona. Debutó a los 15 años. Campeón de la Euro 2024 y Kopa 2024.",
    images: ["/images/champion.jpg"],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lamine Yamal | Perfil editorial",
    description:
      "Perfil de Lamine Yamal, extremo del Barcelona. Debutó a los 15 años. Campeón de la Euro 2024 y Kopa 2024.",
    images: ["/images/champion.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${instrumentSans.variable} ${ibmPlexMono.variable} antialiased`}
    >
      <body className={`${instrumentSans.className} min-h-dvh bg-void`}>
        <Providers>
          <a className="skip-link" href="#contenido">
            Saltar al contenido
          </a>
          {children}
        </Providers>
      </body>
    </html>
  );
}
