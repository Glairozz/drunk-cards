"use client"

import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Undo2, Beer, Shuffle } from "lucide-react"
import { useGame } from "@/lib/game-context"

export function GameScreen() {
  const { deck, currentIndex, currentCard, isAnimating, nextCard, undoCard, setAnimating } = useGame()
  const [flipKey, setFlipKey] = useState(0)

  const handleDraw = useCallback(() => {
    if (isAnimating) return
    setAnimating(true)
    setFlipKey((k) => k + 1)
    setTimeout(() => {
      nextCard()
      setTimeout(() => setAnimating(false), 450)
    }, 250)
  }, [isAnimating, nextCard, setAnimating])

  const handleUndo = useCallback(() => {
    if (isAnimating) return
    setAnimating(true)
    setFlipKey((k) => k + 1)
    setTimeout(() => {
      undoCard()
      setTimeout(() => setAnimating(false), 450)
    }, 250)
  }, [isAnimating, undoCard, setAnimating])

  const isFinished = currentIndex >= deck.length
  const remaining = deck.length - currentIndex - 1
  const progress = ((currentIndex + 1) / deck.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -30, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="screen-panel flex flex-col"
    >
      <div className="w-full flex justify-between items-center mb-4 sm:mb-5">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative w-[40px] sm:w-[50px] h-[56px] sm:h-[70px]">
            <div className="absolute w-[36px] sm:w-[45px] h-[52px] sm:h-[65px] rounded-lg bg-gradient-to-br from-[#1a1a24] to-[#0c0c12] border border-white/10 shadow-lg top-0 left-0 -translate-x-[8px] sm:-translate-x-[10px] -translate-y-[4px] sm:-translate-y-[5px]" />
            <div className="absolute w-[36px] sm:w-[45px] h-[52px] sm:h-[65px] rounded-lg bg-gradient-to-br from-[#1a1a24] to-[#0c0c12] border border-white/10 shadow-lg top-[2px] left-[2px]" />
            <div className="absolute w-[36px] sm:w-[45px] h-[52px] sm:h-[65px] rounded-lg bg-gradient-to-br from-[#1a1a24] to-[#0c0c12] border border-white/10 shadow-lg top-[4px] left-[4px] translate-x-[8px] sm:translate-x-[10px] translate-y-[4px] sm:translate-y-[5px]" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="text-[0.6rem] sm:text-[0.65rem] text-white/40 uppercase tracking-wider">Deck</span>
            <span className="font-heading text-base sm:text-lg font-bold text-white">{Math.max(0, remaining)}</span>
          </div>
        </div>

        <div className="flex items-baseline gap-[3px] px-3 sm:px-4 py-1.5 sm:py-2 rounded-3xl bg-white/[0.025] border border-white/10 relative">
          <div className="absolute inset-[-3px] border border-[rgba(255,107,53,0.2)] rounded-[28px] animate-ring-pulse" />
          <span className="font-heading text-lg sm:text-xl font-bold text-[#ff6b35]">{currentIndex + 1}</span>
          <span className="text-white/40 text-xs sm:text-sm">/</span>
          <span className="text-white/40 text-xs sm:text-sm">{deck.length}</span>
        </div>
      </div>

      <div className="perspective-[1200px] w-full h-[220px] sm:h-[300px] mb-4 sm:mb-5 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={flipKey}
            className="w-full h-full relative preserve-3d"
            initial={{ rotateY: 0, scale: 1 }}
            animate={{ rotateY: 180, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="absolute inset-0 backface-hidden rounded-3xl bg-gradient-to-br from-[#fafafa] to-[#f0f0f5] flex flex-col items-center justify-center p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.5),inset_0_-2px_10px_rgba(255,255,255,0.3)] overflow-hidden"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{
                rotateY: 180,
                scale: isAnimating ? [0.85, 1.03, 1] : 1,
                opacity: 1,
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent bg-[length:200%_100%] animate-card-shine pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-br from-[rgba(255,107,53,0.1)] via-[rgba(168,85,247,0.1)] via-[rgba(0,212,170,0.1)] to-[rgba(255,107,53,0.1)] bg-[length:200%_200%] animate-holo-shift pointer-events-none" />

              <span className="absolute top-3 left-3 text-base opacity-30">🍺</span>
              <span className="absolute top-3 right-3 text-base opacity-30 rotate-90">🍺</span>
              <span className="absolute bottom-3 left-3 text-base opacity-30 -rotate-90">🍺</span>
              <span className="absolute bottom-3 right-3 text-base opacity-30 rotate-180">🍺</span>

              <div className="flex flex-col items-center gap-2 sm:gap-3 z-10 px-2 sm:px-0">
                <motion.span
                  className="text-3xl sm:text-4xl"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  🍺
                </motion.span>
                <span className="font-sans text-sm sm:text-lg font-semibold text-[#1a1a2e] text-center leading-relaxed max-w-[95%] sm:max-w-[90%]">
                  {isFinished ? "🎉 No more cards! \n\nThanks for playing! 🍻" : currentCard}
                </span>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-3.5 w-full justify-center items-center">
        <button
          onClick={handleUndo}
          disabled={isAnimating}
          className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 px-5 sm:px-6 py-3 sm:py-3.5 text-sm font-semibold text-white rounded-full bg-white/[0.025] border border-white/10 cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white/[0.08] hover:border-white/15 hover:-translate-y-0.5 active:translate-y-[-1px] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Undo2 className="w-4 h-4" />
          Undo
        </button>

        <button
          onClick={handleDraw}
          disabled={isAnimating}
          className="group relative w-full sm:flex-1 sm:max-w-[220px] inline-flex items-center justify-center px-10 sm:px-12 py-4 sm:py-[1.125rem] text-sm sm:text-base font-semibold leading-none tracking-wide text-white border-none rounded-full cursor-pointer bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] shadow-[0_8px_30px_rgba(255,107,53,0.35)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(255,107,53,0.45),0_0_30px_rgba(255,107,53,0.3)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:scale-100"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
          <span className="relative z-10 flex items-center gap-2">
            {isFinished ? "Reshuffle" : "Draw Card"}
            {isFinished ? <Shuffle className="w-4 h-4 sm:w-5 sm:h-5" /> : <Beer className="w-4 h-4 sm:w-5 sm:h-5" />}
          </span>
          <span className="absolute inset-[-2px] bg-gradient-to-r from-[#ff8c5a] to-[#a855f7] blur-[15px] opacity-0 group-hover:opacity-50 transition-opacity rounded-full -z-10" />
        </button>
      </div>

      <div className="absolute bottom-4 sm:bottom-6 left-5 sm:left-8 right-5 sm:right-8">
        <div className="h-[3px] bg-white/10 rounded-sm overflow-hidden">
          <motion.div
            className="h-full rounded-sm bg-gradient-to-r from-[#ff6b35] to-[#a855f7]"
            animate={{ width: `${Math.min(100, progress)}%` }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      </div>
    </motion.div>
  )
}
