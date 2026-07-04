"use client"

import { AnimatePresence } from "motion/react"
import { useGame } from "@/lib/game-context"
import { LandingScreen } from "@/components/landing-screen"
import { RulesScreen } from "@/components/rules-screen"
import { GameScreen } from "@/components/game-screen"

export default function Home() {
  const { screen } = useGame()

  return (
    <div id="app" className="w-full max-w-[480px] px-3 flex justify-center items-center min-h-screen relative z-10">
      <main className="w-full relative">
        <AnimatePresence mode="wait">
          {screen === "landing" && <LandingScreen key="landing" />}
          {screen === "rules" && <RulesScreen key="rules" />}
          {screen === "game" && <GameScreen key="game" />}
        </AnimatePresence>
      </main>
    </div>
  )
}
