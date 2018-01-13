export class Card {
  constructor(type) {
    this.type = type;
  }
}

export class Token {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }
}

export class Player {
  constructor(hand, tokens) {
    this.hand = hand;
    this.tokens = tokens;
  }
}
