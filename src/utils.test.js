import { shuffle, countResourceCards } from './utils';
import { Card } from './Models';

it('shuffle contains correct number of elements', () => {
    let l = [1,2,3,4];
    expect(shuffle(l).length).toBe(l.length);
});

it('counts the number of resource cards', () => {
  let s = new Card("special");
  let r = new Card("resource");
  let cards = [s, s, r, r, s];

  expect(countResourceCards(cards)).toBe(2);
})
