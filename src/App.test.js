import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { buildDeck, buildTokens, deal, pickUpSpecial, pickUpMultiple, buyTokens, Jaipur} from './App';
import { Card } from './Models';

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
  let G = Jaipur.setup();
  let ctx = {'currentPlayer':"0"}
  let newG = pickUpSpecial(G, ctx);
  //console.log(G.players[0].hand);
  //console.log(newG.players[0].hand);
});

it('check the pickUpMultiple move', () => {
  let G = Jaipur.setup();
  let ctx = {'currentPlayer':"0"};
  G.players[0].hand = [ new Card('red'), new Card('green'), new Card('yellow') ];
  G.market = [ new Card('green'), new Card('pink'), new Card('pink'), new Card('brown')];
  G.selectedHand = [0, 1, 2];
  G.selectedMarket = [1, 2, 3];
  console.log(G.market);
  console.log(G.players[0].hand);
  let newG = pickUpMultiple(G, ctx);
  console.log(newG.market);
  console.log(newG.players[0].hand);
  expect(newG.market[0].type).toBe('green');
  expect(newG.market[1].type).toBe('red');
  expect(newG.market[2].type).toBe('green');
  expect(newG.market[3].type).toBe('yellow');

  expect(newG.players[0].hand[0].type).toBe('pink');
  expect(newG.players[0].hand[1].type).toBe('pink');
  expect(newG.players[0].hand[2].type).toBe('brown');
});

it('check buyTokens move', () => {
  let G = Jaipur.setup();
  let ctx = {'currentPlayer':"0"};
  G.players[0].hand = [ new Card('red'), new Card('green'), new Card('red'), new Card('red')];
  G.selectedHand = [0, 2, 3];
  let newG = buyTokens(G, ctx);
  console.log(G.resourceTokens);
  console.log(newG.resourceTokens);
  console.log(G.players[0].tokens);
  console.log(newG.players[0].tokens);
  console.log(G.bonusTokens);
  console.log(newG.bonusTokens);
});
