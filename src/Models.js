export class Card {
  constructor(type) {
    this.id = guid();
    this.type = type;
    this.selected = false;
  }
}

export class Player {
  constructor(hand, tokens) {
    this.id = guid();
    this.hand = hand;
    this.tokens = tokens;
  }

  get score() {
    return this.tokens.reduce((a, b) => a+b, 0)
  }
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}