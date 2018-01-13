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
});

it('show shuffle distribution', () => {
  let l = [1,2,3,4];
  let counts = {};
  
  for (let n = 0; n < 1000; n++) {
    let tmp = l.slice();
    tmp = shuffle(tmp);
    let str = "";
    for (let i = 0; i < tmp.length; i++) {
      str = str + tmp[i].toString();
    }
    if (str in counts) {
      counts[str] += 1;
    } else {
      counts[str] = 0;
    }
  }
  //console.log(counts);
});
