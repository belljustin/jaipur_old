import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { buildDeck, buildTokens, deal, pickUpSpecial, pickUpSingle, pickUpMultiple, buyTokens,
  Jaipur, endGameIf } from './App';
import { Card } from './Models';

var G, ctx;

beforeEach(() => {
  G = Jaipur.setup();
  ctx = {'currentPlayer':'0'};
  G.players[0].hand = [ new Card('red'), new Card('green'), new Card('red'), new Card('red'), new Card('red'), new Card('red')];
  G.market = [ new Card('special'), new Card('special'), new Card('special'), new Card('brown'), new Card('green')];
});

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
  G.deck = [new Card('green'), new Card('brown')];
  let cards = deal(G.deck, 3);
  expect(G.deck.length).toBe(0);
  expect(cards[0].type).toBe('brown');
  expect(cards[1].type).toBe('green');
  expect(cards[2]).toBeNull();
});

it('check the pickUpSingle move', () => {
  G.market[3].selected = true;
  G.deck = [new Card('red'), new Card('silver')];
  let expectedHand = [];
  let expectedMarket = [];
  for (let i = 0; i < G.market.length; i++) {
    expectedMarket.push(G.market[i].type);
  }  
  for (let i = 0; i < G.players[0].hand.length; i++) {
    expectedHand.push(G.players[0].hand[i].type);
  }
  expectedHand.push('brown');
  expectedMarket[3] = 'silver';

  let newG = pickUpSingle(G, ctx);
  for (let i = 0; i < newG.players[0].hand.length; i++) { 
    expect(newG.players[0].hand[i].type).toBe(expectedHand[i]);
  }
  for (let i = 0; i < newG.market.length; i++) {
    expect(newG.market[i].type).toBe(expectedMarket[i]);
  }
  expect(newG.players[0].hand.length).toBe(G.players[0].hand.length+1);
  expect(newG.deck.length).toBe(1);
  expect(newG.deck[0].type).toBe('red');
});

it('check the pickUpMultiple move', () => {
  G.players[0].hand = [ new Card('red'), new Card('green'), new Card('yellow') ];
  G.market = [ new Card('green'), new Card('pink'), new Card('pink'), new Card('brown')];
  G.players[0].hand[0].selected = true; G.players[0].hand[1].selected = true; 
  G.players[0].hand[2].selected = true;
  G.market[1].selected = true; G.market[2].selected = true; G.market[3].selected = true; 
  
  let expectedHand = ['pink', 'pink', 'brown'];
  let expectedMarket = ['green', 'red', 'green', 'yellow'];

  let newG = pickUpMultiple(G, ctx);
  expect(G.players[0].hand.length).toBe(newG.players[0].hand.length);
  expect(G.market.length).toBe(newG.market.length);
  for (let i = 0; i < newG.market.length; i++) {
    expect(newG.market[i].type).toBe(expectedMarket[i]);
  }
  for (let i = 0; i < newG.players[0].hand.length; i++) {
    expect(newG.players[0].hand[i].type).toBe(expectedHand[i]);
  }
});

it('check buyTokens move', () => {
  G.players[0].hand = [ new Card('red'), new Card('green'), new Card('red'), new Card('red'), new Card('red')];
  G.players[0].hand[0].selected = true; G.players[0].hand[2].selected = true;
  G.players[0].hand[3].selected = true; G.players[0].hand[4].selected = true;
  G.bonusTokens['fours'] = [10, 9, 8];
  let newG = buyTokens(G, ctx);
  
  let expectedPlayerTokens = [7, 7, 5, 5, 8];
  let expectedPileTokens = [5, 5];
  let expectedBonusTokens = [10, 9];
  // Check hand has traded in cards removed.
  expect(newG.players[0].hand.length).toBe(1);
  expect(newG.players[0].hand[0].type).toBe('green');
  // Check correct tokens have been assigned to the player.
  expect(newG.players[0].tokens.length).toBe(5);
  for (let i = 0; i < newG.players[0].tokens.length; i++) {
    expect(newG.players[0].tokens[i]).toBe(expectedPlayerTokens[i]);
  }
  for (let i = 0; i < newG.resourceTokens['red'].length; i++) {
    expect(newG.resourceTokens['red'][i]).toBe(expectedPileTokens[i]);
  }
  for (let i = 0; i < newG.bonusTokens['fours'].length; i++) {
    expect(newG.bonusTokens['fours'][i]).toBe(expectedBonusTokens[i]);
  }

});

it('check pickUpSpecial move', () => {
  G.deck = [new Card('silver'), new Card('gold'), new Card('red')];
  let newG = pickUpSpecial(G, ctx);
  let expectedMarket = ['red', 'gold', 'silver', 'brown', 'green'];
  let expectedHand = ['red', 'green', 'red', 'red', 'red', 'red', 'special', 'special', 'special'];

  // Check lengths.
  expect(newG.market.length).toBe(5);
  expect(newG.players[0].hand.length).toBe(9);
  // Check contents.
  for (let i = 0; i < newG.market.length; i++) {
    expect(newG.market[i].type).toBe(expectedMarket[i]);
  }
  for (let i = 0; i < newG.players[0].hand.length; i++) {
    expect(newG.players[0].hand[i].type).toBe(expectedHand[i]);
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
