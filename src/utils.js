module.exports = {
    shuffle: function (cards) {
        rawCards = cards.slice(0);
        var shuffledCards = [];
        for (i=0; i<cards.length; i++) {
            var ix = Math.floor(Math.random()*rawCards.length);
            var card = rawCards.splice(ix, 1)[0];
            shuffledCards.push(card);
        }
        return shuffledCards;
    }
}
