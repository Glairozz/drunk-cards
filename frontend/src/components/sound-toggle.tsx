"use client"

import { Volume2, VolumeX } from "lucide-react"
import { useGame } from "@/lib/game-context"

export function SoundToggle() {
  const { soundEnabled, toggleSound } = useGame()

  return (
    <button
      onClick={toggleSound}
      className="fixed top-4 sm:top-6 right-4 sm:right-6 w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center rounded-xl bg-white/[0.025] border border-white/10 cursor-pointer transition-all duration-300 z-50 hover:bg-white/[0.08] hover:border-white/15"
      aria-label={soundEnabled ? "Mute sound" : "Enable sound"}
    >
      {soundEnabled ? (
        <Volume2 className="w-4 sm:w-[18px] h-4 sm:h-[18px] text-[#00d4aa]" />
      ) : (
        <VolumeX className="w-4 sm:w-[18px] h-4 sm:h-[18px] text-white/50" />
      )}
    </button>
  )
}
