export function shuffle(cards) {
    let rawCards = cards.slice(0);
    let shuffledCards = [];
    for (let i=0; i<cards.length; i++) {
        let ix = Math.floor(Math.random()*rawCards.length);
        let card = rawCards.splice(ix, 1)[0];
        shuffledCards.push(card);
    }
    return shuffledCards;
}
