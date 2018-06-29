export function cardsCount (cardsCount) {
  return cardsCount === 1 ? '1 Card' : `${cardsCount} Cards`;
}

export function quizResult (score) {
  return `${((score*100)/deck.questions.length).toFixed(0)} %`
}
