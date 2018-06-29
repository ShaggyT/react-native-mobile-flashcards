export function cardsCount (cardsCount) {
  return cardsCount === 1 ? '1 Card' : `${cardsCount} Cards`;
}

export function quizResult (score, cardNumber) {
  return `${((score*100)/cardNumber).toFixed(0)} %`
}
