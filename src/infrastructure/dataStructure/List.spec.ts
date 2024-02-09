import { assert } from 'chai';
import 'mocha';

import { List } from './List.js';

describe('Generic List Tests', () => {
  it('Should initialize an empty List', () => {
    const emptyList = new List<number>();

    assert.isUndefined(emptyList.getCurrent());
  });

  it('Should append to an empty list', () => {
    const emptyList = new List<number>();
    emptyList.append(1);

    assert.equal(1, emptyList.getCurrent());
  });

  it('Should return undefined if there is no next element', () => {
    const emptyList = new List<number>();

    assert.isUndefined(emptyList.getNext());
  });

  it('Should initialize a list with one element', () => {
    const populatedList = new List<string>('abc');

    assert.equal(3, populatedList.getCurrent()?.length);
  });

  it('Should append to a populated list', () => {
    const populatedList = new List<string>('1');
    populatedList.append('2');

    assert.equal('2', populatedList.getCurrent());
  });

  it('Should return undefined when at the end of an appended list', () => {
    const populatedList = new List<string>('1');
    populatedList.append('2');
    populatedList.append('3');

    assert.equal('3', populatedList.getCurrent());
    assert.isUndefined(populatedList.getNext());
  });

  it('Should return first value after reset', () => {
    const myStringList = new List<string>('First');
    myStringList.append('Second');
    myStringList.append('Third');
    myStringList.reset();

    assert.equal('First', myStringList.getCurrent());
  });

  it('Should extract the head of a List', () => {
    const myNumberList = new List<number>(1);
    myNumberList.append(2);
    myNumberList.reset();
    const headValue = myNumberList.extract();

    assert.equal(1, headValue);
    assert.equal(2, myNumberList.getCurrent());
  });

  it('Should extract the tail of a List', () => {
    const myNumberList = new List<number>(1);
    myNumberList.append(2);
    const tailValue = myNumberList.extract();

    assert.equal(2, tailValue);
    assert.equal(1, myNumberList.getCurrent());
  });

  it('Should extract the middle of a List', () => {
    const myNumberList = new List<number>(1);
    myNumberList.append(2);
    myNumberList.append(3);
    myNumberList.append(4);

    myNumberList.reset(); // Current == 1
    myNumberList.getNext(); // Current == 2

    const midValue = myNumberList.extract(); // Extracted == 2. Next (3) takes place.

    assert.equal(2, midValue);
    assert.equal(3, myNumberList.getCurrent());
    assert.equal(4, myNumberList.getNext());
    assert.isUndefined(myNumberList.getNext());
  });

  it('Should generate a number of permutations equal to elements factorial', () => {
    const factorial = (n: number) => (n == 1 || n == 0 ? 1 : n * factorial(n - 1));

    const intList = new List<string>('a');
    intList.append('b');
    intList.append('c');
    intList.append('d');
    intList.append('e');
    intList.append('f');

    const permutations = intList.generatePermutations();
    assert.equal(permutations.length, factorial(6));
  });
});
