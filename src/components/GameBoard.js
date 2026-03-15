import React from 'react';
import Card from './Card';

function GameBoard({ cards, flippedCards, matchedCards, onFlip }) {

  const gridCols = cards.length === 16 ? "grid-cols-4"
               : cards.length === 12 ? "grid-cols-4"
               : "grid-cols-4";

  return (

    <div className={`grid ${gridCols} gap-4 justify-items-center`}>

      {cards.map(card => (

        <Card
          key={card.id}
          card={card}
          isFlipped={flippedCards.includes(card.id)}
          isMatched={matchedCards.includes(card.id)}
          onFlip={onFlip}
        />

      ))}

    </div>

  );

}

export default GameBoard;