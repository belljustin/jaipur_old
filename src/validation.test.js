import { Validation } from './validation'
import { Card } from './Models';

var s, r, r2;
var fullHand, almostFullHand, genericHand;
var market1, market2;

beforeEach(() => {
  s = new Card('special');
  r = new Card('resource');
  r2 = new Card('resource2');

  fullHand = Array(7).fill(r);
  almostFullHand = Array(6).fill(r);
  genericHand = [...almostFullHand, s, s];

  market1 = [s, s, s, r, r];
  market2 = [s, s, s, r2, r2];
})

it('Full hand fails to select new card', () => {
  expect(Validation.isValidSingle(fullHand, [0])).toBeFalsy();
})

it('Succeeds validating single selection', () => {
  expect(Validation.isValidSingle(almostFullHand, [0])).toBeTruthy();
  expect(Validation.isValidSingle(genericHand, [0])).toBeTruthy();
})

it('Different sized selections fail multiple selection', () => {
  expect(Validation.isValidMultiple(genericHand, market1, [0, 1, 3], [0, 1]))
    .toBeFalsy();
})

it('Trying to select more cards than max amount fails multiple selection', () => {
  expect(Validation.isValidMultiple(genericHand, market1, [6, 7], [3, 4])).toBeFalsy();
})

it('Picking up and laying down cards of same type fails multiple selection', () => {
  expect(Validation.isValidMultiple(genericHand, market1, [0, 1], [3, 4])).toBeFalsy();
})

it('fails to do multiple selection with only one card', () => {
  expect(Validation.isValidMultiple(genericHand, market1, [0], [3])).toBeFalsy();
})

it('succeeds in multiple selection', () => {
  expect(Validation.isValidMultiple(genericHand, market2, [0, 1], [3, 4])).toBeTruthy();
})
