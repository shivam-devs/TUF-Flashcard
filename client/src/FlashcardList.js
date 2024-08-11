import React from 'react'
import Flashcard from './Flashcard';

export default function FlashcardList({ flashcards,idx }) {
  return (
    <div className="card-grid">
      <Flashcard flashcard={flashcards[idx]} key={flashcards[idx].id} />
    </div>
  )
}
