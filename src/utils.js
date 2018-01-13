export function shuffle(list) {
    let rawList = list.slice(0);
    let shuffledList = [];
    for (let i=0; i<list.length; i++) {
        let ix = Math.floor(Math.random()*rawList.length);
        let item = rawList.splice(ix, 1)[0];
        shuffledList.push(item);
    }
    return shuffledList;
}

export function countResourceCards(cards) {
  const counter = (num, c) => c.type !== "special" ? num + 1 : num;
  return cards.reduce(counter, 0);
}

export function selectedCards(cards, indices) {
  const selected = [];
  for (let i of indices) {
    selected.push(cards[i]);
  }
  return selected;
}