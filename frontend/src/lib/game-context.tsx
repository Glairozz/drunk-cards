"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { CARDS, shuffleArray } from "@/lib/game-data"

type Screen = "landing" | "rules" | "game"

interface GameState {
  screen: Screen
  deck: string[]
  currentIndex: number
  history: string[]
  currentCard: string | null
  isAnimating: boolean
  soundEnabled: boolean
}

interface GameContextType extends GameState {
  goToScreen: (screen: Screen) => void
  startGame: () => void
  nextCard: () => void
  undoCard: () => void
  toggleSound: () => void
  setAnimating: (v: boolean) => void
}

const GameContext = createContext<GameContextType | null>(null)

export function GameProvider({ children }: { children: ReactNode }) {
  const [screen, setScreen] = useState<Screen>("landing")
  const [deck, setDeck] = useState<string[]>(() => shuffleArray(CARDS))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [history, setHistory] = useState<string[]>([])
  const [currentCard, setCurrentCard] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)

  const goToScreen = useCallback((s: Screen) => {
    setScreen(s)
  }, [])

  const startGame = useCallback(() => {
    const newDeck = shuffleArray(CARDS)
    setDeck(newDeck)
    setCurrentIndex(0)
    setHistory([newDeck[0]])
    setCurrentCard(newDeck[0])
    setScreen("game")
  }, [])

  const nextCard = useCallback(() => {
    const nextIndex = currentIndex + 1
    if (nextIndex >= deck.length) {
      setCurrentCard(null)
      setCurrentIndex(nextIndex)
      return
    }
    setCurrentIndex(nextIndex)
    setCurrentCard(deck[nextIndex])
    setHistory((prev) => [...prev, deck[nextIndex]])
  }, [currentIndex, deck])

  const undoCard = useCallback(() => {
    if (history.length <= 1) return
    const newHistory = [...history]
    newHistory.pop()
    const prevIndex = currentIndex - 1
    setHistory(newHistory)
    setCurrentIndex(prevIndex)
    setCurrentCard(deck[prevIndex])
  }, [history, currentIndex, deck])

  const toggleSound = useCallback(() => {
    setSoundEnabled((prev) => !prev)
  }, [])

  const setAnimating = useCallback((v: boolean) => {
    setIsAnimating(v)
  }, [])

  return (
    <GameContext.Provider
      value={{
        screen,
        deck,
        currentIndex,
        history,
        currentCard,
        isAnimating,
        soundEnabled,
        goToScreen,
        startGame,
        nextCard,
        undoCard,
        toggleSound,
        setAnimating,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const ctx = useContext(GameContext)
  if (!ctx) throw new Error("useGame must be used within GameProvider")
  return ctx
}
