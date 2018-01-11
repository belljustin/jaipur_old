import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { buildDeck, buildTokens, deal, pickUpSpecial, Jaipur} from './App';

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

it('builds starting tokens', () => {
  const tokenComposition = new Map([
    ['a', [1, 2]],
    ['b', [3, 4, 5]]
  ]);
  const tokens = buildTokens(tokenComposition);
  expect(tokens.length).toBe(2);
})

it('deal returns none if empty deck', () => {
  // TODO: Need to write our own deepcopy method.
  let G = Jaipur.setup();
  let ctx = {'currentPlayer':"0"}
  let newG = pickUpSpecial(G, ctx);
  console.log(G.players[0].hand);
  console.log(newG.players[0].hand);
});
