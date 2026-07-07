import type { Metadata } from "next"
import { Outfit, Syne } from "next/font/google"
import "./globals.css"
import { GameProvider } from "@/lib/game-context"
import { BackgroundOrbs } from "@/components/bg-effects"
import { SoundToggle } from "@/components/sound-toggle"
import { Particles } from "@/components/bg-effects"
import type { ReactNode } from "react"

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
})

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Drunk Cards - Party Game",
  description: "A fun party drinking game with 104+ challenges. Draw cards and complete the challenge or drink!",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${outfit.variable} ${syne.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
        <meta name="theme-color" content="#050508" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="font-sans bg-[#050508] text-white min-h-screen min-h-dvh overflow-hidden flex justify-center items-center touch-manipulation">
        <GameProvider>
          <BackgroundOrbs />
          <Particles />
          <SoundToggle />
          {children}
        </GameProvider>
      </body>
    </html>
  )
}
