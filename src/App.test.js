import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { buildDeck, buildTokens } from './App';

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