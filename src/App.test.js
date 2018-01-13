import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { buildDeck, buildTokens, deal, pickUpSpecial, pickUpSingle, pickUpMultiple, buyTokens,
  Jaipur, endGameIf } from './App';
import { Card } from './Models';

var G;

beforeEach(() => {
  G = Jaipur.setup();
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('builds a starting deck', () => {
  const deckComposition = new Map([
    ['a', 3],
    ['b', 1]
  ])
  const deck = buildDeck(deckComposition);
  expect(deck.length).toBe(4);
})

it('deal returns none if empty deck', () => {
  // TODO: Need to write our own deepcopy method.
  let ctx = {'currentPlayer':"0"}
  let newG = pickUpSpecial(G, ctx);
  //console.log(G.players[0].hand);
  //console.log(newG.players[0].hand);
});

it('check the pickUpSingle move', () => {
  let ctx = {'currentPlayer':"0"};
  G.players[0].hand = [ new Card('red'), new Card('green'), new Card('yellow') ];
  G.market = [ new Card('green'), new Card('pink'), new Card('pink'), new Card('brown')];
  G.selectedMarket = [1];
  let newG = pickUpSingle(G, ctx);
  if (false) {
    console.log(G.players[0].hand);
    console.log(newG.players[0].hand);
    console.log(G.market);
    console.log(newG.market);
  }
});

it('check the pickUpMultiple move', () => {
  let ctx = {'currentPlayer':"0"};
  G.players[0].hand = [ new Card('red'), new Card('green'), new Card('yellow') ];
  G.market = [ new Card('green'), new Card('pink'), new Card('pink'), new Card('brown')];
  G.selectedHand = [0, 1, 2];
  G.selectedMarket = [1, 2, 3];
  let newG = pickUpMultiple(G, ctx);
  if (false) {
    console.log(G.market);
    console.log(newG.market);
    console.log(G.players[0].hand);
    console.log(newG.players[0].hand);
  }
  expect(newG.market[0].type).toBe('green');
  expect(newG.market[1].type).toBe('red');
  expect(newG.market[2].type).toBe('green');
  expect(newG.market[3].type).toBe('yellow');

  expect(newG.players[0].hand[0].type).toBe('pink');
  expect(newG.players[0].hand[1].type).toBe('pink');
  expect(newG.players[0].hand[2].type).toBe('brown');
});

it('check buyTokens move', () => {
  let ctx = {'currentPlayer':"0"};
  G.players[0].hand = [ new Card('red'), new Card('green'), new Card('red'), new Card('red')];
  G.selectedHand = [0, 2, 3];
  let newG = buyTokens(G, ctx);
  if (false) {
    console.log(G.resourceTokens);
    console.log(newG.resourceTokens);
    console.log(G.players[0].tokens);
    console.log(newG.players[0].tokens);
    console.log(G.bonusTokens);
    console.log(newG.bonusTokens);
  }
});

// Victory conditions
it('ends game if market is not filled', () => {
  let c = new Card("special");
  G.market = [c, c, c, null, null];
  expect(endGameIf(G, {})).toBeTruthy();
})

it('ends game if three resource token sets are empty', () => {
  G.resourceTokens = {
    'red': [],
    'gold': [],
    'silver': [],
    'pink': [1],
    'green': [1],
    'brown': [1]
  }
  expect(endGameIf(G, {})).toBeTruthy();
})