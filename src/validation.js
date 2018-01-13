import { countResourceCards, selectedCards } from './utils';

const MAX_HAND = 7;
const MARKET_SIZE = 5;

export class Validation {
  // TODO: let consumer know WHY invalid
  static isValidSingle(hand, selectedMarket) {
    return (selectedMarket.length === 1  && countResourceCards(hand) < MAX_HAND);
  }

  static isValidSpecial(market) {
    return (countResourceCards(market) < MARKET_SIZE);
  }

  static isValidMarketToggle(card) {
    return card.type !== 'special';
  }

  static isValidMultiple(hand, market, selectedHandIndices, selectedMarketIndices) {
    let sHand = selectedCards(hand, selectedHandIndices);
    let sMarket = selectedCards(market, selectedMarketIndices);

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
}

