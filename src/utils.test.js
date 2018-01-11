import { shuffle } from './utils';

it('shuffle contains correct number of elements', () => {
    let l = [1,2,3,4];
    expect(shuffle(l).length).toBe(l.length);
});


