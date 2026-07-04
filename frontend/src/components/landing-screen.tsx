"use client"

import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { useGame } from "@/lib/game-context"

export function LandingScreen() {
  const { goToScreen } = useGame()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -30, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="screen-panel flex flex-col items-center justify-center text-center"
    >
      <div className="relative mb-7">
        <div className="logo-glow" />
        <motion.div
          animate={{ y: [0, -12, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="logo-icon"
        >
          <span className="text-5xl">🍻</span>
        </motion.div>
      </div>

      <h1 className="flex flex-col gap-0.5 mb-3">
        <span className="font-heading text-[2.8rem] font-extrabold leading-tight -tracking-wide text-white">
          Drunk
        </span>
        <span className="font-heading text-[2.8rem] font-extrabold leading-tight -tracking-wide bg-gradient-to-r from-[#ff6b35] via-[#ff8c5a] to-[#a855f7] bg-clip-text text-transparent animate-title-shimmer bg-[length:200%_100%]">
          Cards
        </span>
      </h1>

      <div className="flex items-center gap-3 text-xs text-white/50 tracking-widest uppercase mb-10">
        <span className="w-1 h-1 rounded-full bg-[#ff6b35] animate-pulse" />
        Party Game Edition
        <span className="w-1 h-1 rounded-full bg-[#ff6b35] animate-pulse" />
      </div>

      <button
        onClick={() => goToScreen("rules")}
        className="group relative inline-flex items-center justify-center px-12 py-[1.125rem] text-base font-semibold leading-none tracking-wide text-white border-none rounded-full cursor-pointer bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] shadow-[0_8px_30px_rgba(255,107,53,0.35)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(255,107,53,0.45),0_0_30px_rgba(255,107,53,0.3)] active:scale-[0.98]"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
        <span className="relative z-10 flex items-center gap-2">
          Start Party
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </span>
      </button>

      <span className="absolute bottom-5 text-[0.7rem] tracking-widest text-white/30">v2.0</span>
    </motion.div>
  )
}
