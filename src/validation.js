import { countResourceCards, selectedCards } from './utils';

const MAX_HAND = 7;
const MARKET_SIZE = 5;

export class Validation {
  // TODO: let consumer know WHY invalid
  static isValidSingle(hand, market) {
    return (selectedCards(market).length === 1  && countResourceCards(hand) < MAX_HAND);
  }

  static isValidSpecial(market) {
    return (countResourceCards(market) < MARKET_SIZE);
  }

  static isValidMarketToggle(card) {
    return card.type !== 'special';
  }

  static isValidMultiple(hand, market) {
    let sHand = selectedCards(hand);
    let sMarket = selectedCards(market);

    // Verify there's an even trade and we're trading at least two cards
    if (sHand.length !== sMarket.length || sHand.length < 2) {
      return false;
    }

    // Verify added cards don't put us over the the max hand limit
    let numSpecialSelected = sHand.length - countResourceCards(sHand);
    if (countResourceCards(hand) + numSpecialSelected > MAX_HAND) {
      return false;
    }

    // Verify type set of sHand and sMarket don't intersect
    let handTypes = new Set();
    for (let c of sHand) {
      handTypes.add(c.type);
    }
    for (let c of sMarket) {
      if (handTypes.has(c.type)) {
       return false;
      }
    }

    return true;
  }

  static isValidPurchase(hand) {
    let sHand = selectedCards(hand);

    // Check that we're tying to sell SOMETHING
    if (sHand < 1) {
      return false;
    }

    // Check that all the sale cards are of the same type
    let type = sHand[0].type;
    for (let c of sHand) {
      if (c.type !== type) {
        return false;
      }
    }

    // Luxury cards require at least two cards be sold
    let luxuryTypes = "^(red|gold|silver)$";
    console.log(type);
    if (type.match(luxuryTypes) && sHand.length < 2) {
      return false;
    }

    return true;
  }
}

