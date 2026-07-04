"use client"

import { motion } from "motion/react"
import { Gamepad2 } from "lucide-react"
import { useGame } from "@/lib/game-context"

const rules = [
  { icon: "🎴", num: "01", text: "Draw cards and complete the challenge" },
  { icon: "😏", num: "02", text: "When someone skips, they drink 2x" },
  { icon: "🎉", num: "03", text: "Have fun and drink responsibly!" },
]

export function RulesScreen() {
  const { startGame } = useGame()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -30, scale: 0.95, filter: "blur(10px)" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="screen-panel flex flex-col items-center text-center"
    >
      <div className="mb-8">
        <div className="relative inline-block mb-4">
          <motion.span
            className="text-[3.5rem] relative z-10 inline-block"
            animate={{ y: [0, -8, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            📜
          </motion.span>
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[100px] border-2 border-white/10 rounded-full"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <h2 className="font-heading text-[1.75rem] font-bold text-white -tracking-wide">How to Play</h2>
      </div>

      <div className="w-full mb-8 flex flex-col gap-3.5">
        {rules.map((rule, i) => (
          <motion.div
            key={rule.num}
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group flex items-center gap-4 p-4 pl-5 text-left rounded-2xl border border-white/10 bg-gradient-to-r from-white/[0.025] to-[rgba(255,107,53,0.03)] relative overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white/[0.08] hover:border-[rgba(255,107,53,0.2)] hover:translate-x-1.5"
          >
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-[#ff6b35] to-[#a855f7] opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="text-2xl w-10 h-10 flex items-center justify-center bg-[rgba(255,107,53,0.1)] rounded-xl shrink-0">
              {rule.icon}
            </span>
            <div className="flex items-center gap-3 flex-1">
              <span className="font-heading text-sm font-extrabold text-[#ff6b35] bg-[rgba(255,107,53,0.1)] px-2 py-1 rounded-md">
                {rule.num}
              </span>
              <p className="text-sm text-white/80 leading-relaxed">{rule.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={startGame}
        className="group relative inline-flex items-center justify-center px-12 py-[1.125rem] text-base font-semibold leading-none tracking-wide text-white border-none rounded-full cursor-pointer bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] shadow-[0_8px_30px_rgba(255,107,53,0.35)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(255,107,53,0.45),0_0_30px_rgba(255,107,53,0.3)] active:scale-[0.98]"
      >
        <span className="absolute inset-0 bg-gradient-to-r from-white/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
        <span className="relative z-10 flex items-center gap-2">
          Play Now
          <Gamepad2 className="w-5 h-5" />
        </span>
        <span className="absolute inset-[-2px] bg-gradient-to-r from-[#ff8c5a] to-[#a855f7] blur-[15px] opacity-0 group-hover:opacity-50 transition-opacity rounded-full -z-10" />
      </button>
    </motion.div>
  )
}
