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

export function selectedCards(cards) {
  return cards.filter(c => c.selected);
}

export function copyGame(G) {
  let newG = {...G};
  newG.players = G.players.slice();
  for (let i = 0; i < 2; i++) {
    newG.players[i] = {...G.players[i]};
    newG.players[i].hand = G.players[i].hand.slice();
    newG.players[i].tokens = G.players[i].tokens.slice();
  }
  newG.market = G.market.slice();
  newG.resourceTokens = {
    'red': G.resourceTokens['red'].slice(),
    'green':G.resourceTokens['green'].slice(),
    'pink':G.resourceTokens['pink'].slice(),
    'gold':G.resourceTokens['gold'].slice(),
    'silver':G.resourceTokens['silver'].slice(),
    'brown':G.resourceTokens['brown'].slice()
  };
  newG.bonusTokens = {
    'threes': G.bonusTokens['threes'].slice(),
    'fours':G.bonusTokens['fours'].slice(),
    'fives':G.bonusTokens['fives'].slice()
  }
  return newG;
}

export function getScore(player) {
    console.log(player.tokens);
    return player.tokens.reduce((a, b) => a+b, 0);
}

