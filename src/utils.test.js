import { shuffle } from './utils';

it('shuffle contains correct number of elements', () => {
    let l = [1,2,3,4];
    expect(l.length == shuffle(l).length);
});


