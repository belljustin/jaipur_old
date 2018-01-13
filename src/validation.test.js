import { Validation } from './validation'
import { Card } from './Models';

const r = new Card('resource');
const p = new Card('pink');
const s = new Card('special');
const sR = new Card('resource');
const sG = new Card('gold');
const sP = new Card('pink');
const sS = new Card('special');

beforeEach(() => {
  sR.selected = true;
  sG.selected = true;
  sP.selected = true;
  sS.selected = true;
})

// Single Selection
it('Full hand fails to select new card', () => {
  let fullHand = Array(6).fill(r);
  fullHand.push(sR);

  expect(Validation.isValidSingle(fullHand)).toBeFalsy();
})

it('Succeeds validating single selection', () => {
  let almostFullHand = Array(5).fill(r);
  almostFullHand.push(sR);

  expect(Validation.isValidSingle(almostFullHand)).toBeTruthy();
})

// Multiple Selection
it('Different sized selections fail multiple selection', () => {
  let hand = [sR, sR, r];
  let market = [sR, r, r];

  expect(Validation.isValidMultiple(hand, market))
    .toBeFalsy();
})

it('Trying to select more cards than max amount fails multiple selection', () => {
  let hand = [r, r, r, r, r, r, sR, sS];
  let market = [r, r, r, sP, sP];

  expect(Validation.isValidMultiple(hand, market)).toBeFalsy();
})

it('Picking up and laying down cards of same type fails multiple selection', () => {
  let hand = [r, sR, sP];
  let market = [r, sR, sR];
  expect(Validation.isValidMultiple(hand, market)).toBeFalsy();
})

it('fails to do multiple selection with only one card', () => {
  let hand = [r, sR];
  let market = [r, sP];
  expect(Validation.isValidMultiple(hand, market)).toBeFalsy();
})

it('succeeds in multiple selection', () => {
  let hand = [r, sR, sR, sS];
  let market = [r, sP, sP, sP];
  expect(Validation.isValidMultiple(hand, market)).toBeTruthy();
})

// Purchases
it('fails to purchase without any selected cards', () => {
  let hand = [r, r, s, s];
  expect(Validation.isValidPurchase(hand)).toBeFalsy();
})

it('fails to purchase with multiple types', () => {
  let hand = [sR, sP, s, s];
  expect(Validation.isValidPurchase(hand)).toBeFalsy();
})

it('fails to purchase luxury tokens without more than one', () => {
  let hand = [sG, p, s, s];
  expect(Validation.isValidPurchase(hand)).toBeFalsy();
})

it('Succeeds in purchasing', () => {
  let hand = [sG, sG, p, s, s];
  expect(Validation.isValidPurchase(hand)).toBeTruthy();

  hand = [sR, sR, p, s, s];
  expect(Validation.isValidPurchase(hand)).toBeTruthy();
})
