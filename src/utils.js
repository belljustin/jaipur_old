export function shuffle(list) {
    let rawList = list.slice(0);
    let shuffledList = [];
    for (let i=0; i<list.length; i++) {
        let ix = Math.floor(Math.random()*rawList.length);
        let item = rawList.splice(ix, 1)[0];
        shuffledList.push(item);
    }
    return shuffledList;
}
