import { assert } from 'chai';
import 'mocha';

import { List } from './List.js';

describe('Generic List Tests', () => {
  it('Should initialize an empty List', () => {
    const emptyList = new List<number>();

    assert.isUndefined(emptyList.getCurrentValue());
  });

  it('Should append to an empty list', () => {
    const emptyList = new List<number>();
    emptyList.append(1);

    assert.equal(1, emptyList.getCurrentValue());
  });

  it('Should return undefined if there is no next element', () => {
    const emptyList = new List<number>();

    assert.isUndefined(emptyList.getNext());
  });

  it('Should initialize a list with one element', () => {
    const populatedList = new List<string>('abc');

    assert.equal(3, populatedList.getCurrentValue()?.length);
  });

  it('Should append to a populated list', () => {
    const populatedList = new List<string>('1');
    populatedList.append('2');

    assert.equal('2', populatedList.getCurrentValue());
  });

  it('Should return undefined when at the end of an appended list', () => {
    const populatedList = new List<string>('1');
    populatedList.append('2');
    populatedList.append('3');

    assert.equal('3', populatedList.getCurrentValue());
    assert.isUndefined(populatedList.getNext());
  });

  it('Should return first value after reset', () => {
    const myStringList = new List<string>('First');
    myStringList.append('Second');
    myStringList.append('Third');
    myStringList.reset();

    assert.equal('First', myStringList.getCurrentValue());
  });
});
