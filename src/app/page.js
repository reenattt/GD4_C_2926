'use client'

import React, { useState, useEffect } from 'react';

import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';

import { GiCardJoker } from 'react-icons/gi';
import { FaAppleAlt, FaLemon, FaHeart, FaStar, FaGem, FaBolt, FaLeaf, FaSun } from 'react-icons/fa';

const ICONS = [
  { icon: FaAppleAlt, color: "#ef4444" },
  { icon: FaLemon, color: "#eab308" },
  { icon: FaHeart, color: "#ec4899" },
  { icon: FaStar, color: "#f97316" },
  { icon: FaGem, color: "#a855f7" },
  { icon: FaBolt, color: "#facc15" },
  { icon: FaLeaf, color: "#22c55e" },
  { icon: FaSun, color: "#fb923c" },
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const createCards = (pairs) => {
  const selectedIcons = ICONS.slice(0, pairs);

  const paired = selectedIcons.flatMap((item, index) => [
    { id: index * 2, icon: item.icon, color: item.color, pairId: index },
    { id: index * 2 + 1, icon: item.icon, color: item.color, pairId: index },
  ]);

  return shuffleArray(paired);
};

export default function Home() {

  const [difficulty, setDifficulty] = useState("easy");
  const [pairs, setPairs] = useState(4);

  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);

  const [moves, setMoves] = useState(0);

  const [time, setTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    resetGame();
  }, [pairs]);

  useEffect(() => {

    let timer;

    if (isPlaying) {
      timer = setInterval(() => {
        setTime(prev => prev + 1);
      }, 1000);
    }

    return () => clearInterval(timer);

  }, [isPlaying]);

  useEffect(() => {

    if (flippedCards.length === 2) {

      const [firstId, secondId] = flippedCards;

      const firstCard = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      setMoves(prev => prev + 1);

      if (firstCard.pairId === secondCard.pairId) {

        setMatchedCards(prev => [...prev, firstId, secondId]);
        setFlippedCards([]);

      } else {

        const timer = setTimeout(() => {
          setFlippedCards([]);
        }, 800);

        return () => clearTimeout(timer);

      }

    }

  }, [flippedCards, cards]);

  useEffect(() => {
    if (matchedCards.length === pairs * 2) {
      setIsPlaying(false);
    }
  }, [matchedCards]);

  const handleCardFlip = (id) => {

    if (!isPlaying) setIsPlaying(true);

    if (flippedCards.length < 2 && !flippedCards.includes(id)) {
      setFlippedCards(prev => [...prev, id]);
    }

  };

  const resetGame = () => {
    setCards(createCards(pairs));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
    setIsPlaying(false);
  };

  const changeDifficulty = (mode) => {

    setDifficulty(mode);

    if (mode === "easy") setPairs(4);
    if (mode === "medium") setPairs(6);
    if (mode === "hard") setPairs(8);

  };

  const formatTime = (seconds) => {

    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2,'0')}`;

  };

  return (

    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-800 to-cyan-600 p-6">

      <h1 className="text-4xl font-bold mb-4 text-white flex items-center gap-3">
        <GiCardJoker className="text-yellow-400" />
        Memory Card
      </h1>
 
      {/* Difficulty */}
      <div className="flex gap-3 mb-6">

        <button
          onClick={() => changeDifficulty("easy")}
          className={`px-4 py-1 rounded-full ${difficulty==="easy" ? "bg-yellow-400 text-black" : "bg-white/20 text-white"}`}>
          Easy
        </button>

        <button
          onClick={() => changeDifficulty("medium")}
          className={`px-4 py-1 rounded-full ${difficulty==="medium" ? "bg-yellow-400 text-black" : "bg-white/20 text-white"}`}>
          Medium
        </button>

        <button
          onClick={() => changeDifficulty("hard")}
          className={`px-4 py-1 rounded-full ${difficulty==="hard" ? "bg-yellow-400 text-black" : "bg-white/20 text-white"}`}>
          Hard
        </button>

      </div>

      <ScoreBoard
        moves={moves}
        matchedCount={matchedCards.length / 2}
        totalPairs={pairs}
        time={formatTime(time)}
        onReset={resetGame}
      />

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-2xl">

        <GameBoard
          cards={cards}
          flippedCards={flippedCards}
          matchedCards={matchedCards}
          onFlip={handleCardFlip}
        />

      </div>

    </div>

  );

}