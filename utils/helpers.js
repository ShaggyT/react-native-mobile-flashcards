export function cardsCount (cardsCount) {
  return cardsCount === 1 ? '1 Card' : `${cardsCount} Cards`;
}

export function quizResult (score, questionNumber) {
  return `${((score*100)/questionNumber).toFixed(0)} %`
}
