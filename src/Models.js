export class Card {
  constructor(type) {
    this.type = type;
    this.selected = false;
  }
}

export class Player {
  constructor(hand, tokens) {
    this.hand = hand;
    this.tokens = tokens;
  }
}
