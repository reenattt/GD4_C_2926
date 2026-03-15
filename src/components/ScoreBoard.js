import React from 'react';
import { FaClock, FaMousePointer, FaCheck, FaRedo } from 'react-icons/fa';

function ScoreBoard({ moves, matchedCount, totalPairs, time, onReset }) {

  const isGameComplete = matchedCount === totalPairs;

  return (

    <div className="text-center mb-6">

      <div className="flex justify-center gap-6 mb-4">

        <div className="bg-white/20 px-4 py-2 rounded-lg">
          <p className="text-sm text-indigo-200 flex items-center gap-1 justify-center">
            <FaClock /> Waktu
          </p>
          <p className="text-xl font-bold text-white">{time}</p>
        </div>

        <div className="bg-white/20 px-4 py-2 rounded-lg">
          <p className="text-sm text-indigo-200 flex items-center gap-1 justify-center">
            <FaMousePointer /> Percobaan
          </p>
          <p className="text-xl font-bold text-white">{moves}</p>
        </div>

        <div className="bg-white/20 px-4 py-2 rounded-lg">
          <p className="text-sm text-indigo-200 flex items-center gap-1 justify-center">
            <FaCheck /> Ditemukan
          </p>
          <p className="text-xl font-bold text-white">
            {matchedCount}/{totalPairs}
          </p>
        </div>

      </div>

      {isGameComplete && (
        <p className="text-yellow-300 font-bold mb-3">
          🎉 Selesai dalam waktu {time} dengan {moves} percobaan!
        </p>
      )}

      <button
        onClick={onReset}
        className="px-6 py-2 bg-yellow-400 text-indigo-900 font-bold rounded-full hover:bg-yellow-300 transition"
      >
        <FaRedo className="inline mr-2"/>
        Main Lagi
      </button>

    </div>

  );

}

export default ScoreBoard;