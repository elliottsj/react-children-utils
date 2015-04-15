'use strict';

/* global jest, describe, it, expect */

import React from 'react';

jest.dontMock('../reactUtils');

describe('reactUtils', () => {
  let {
    reactChildrenForEachDeep,
    reactChildrenFilter
  } = require('../reactUtils');

  describe('#reactChildrenForEachDeep', () => {
    it('iterates over immediate children and their content', () => {
      let shallowElement = (
        <div>
          <p>Foo</p>
          <p>Bar</p>
          <p>Baz</p>
        </div>
      );

      let callback = jest.genMockFunction();
      reactChildrenForEachDeep(shallowElement.props.children, callback);

      expect(callback).toBeCalled();
      expect(callback.mock.calls.length).toBe(6);

      expect(callback.mock.calls[0][0 /* child */].type).toBe('p');
      expect(callback.mock.calls[0][1 /* index */]).toBe(0);
      expect(callback.mock.calls[0][2 /* depth */]).toBe(1);

      expect(callback.mock.calls[1][0 /* child */]).toBe('Foo');
      expect(callback.mock.calls[1][1 /* index */]).toBe(0);
      expect(callback.mock.calls[1][2 /* depth */]).toBe(2);

      expect(callback.mock.calls[2][0 /* child */].type).toBe('p');
      expect(callback.mock.calls[2][1 /* index */]).toBe(1);
      expect(callback.mock.calls[2][2 /* depth */]).toBe(1);

      expect(callback.mock.calls[3][0 /* child */]).toBe('Bar');
      expect(callback.mock.calls[3][1 /* index */]).toBe(0);
      expect(callback.mock.calls[3][2 /* depth */]).toBe(2);

      expect(callback.mock.calls[4][0 /* child */].type).toBe('p');
      expect(callback.mock.calls[4][1 /* index */]).toBe(2);
      expect(callback.mock.calls[4][2 /* depth */]).toBe(1);

      expect(callback.mock.calls[5][0 /* child */]).toBe('Baz');
      expect(callback.mock.calls[5][1 /* index */]).toBe(0);
      expect(callback.mock.calls[5][2 /* depth */]).toBe(2);
    });
  });

  describe('#reactChildrenFilter', () => {
    it('filters immediate children satisfying the predicate', () => {
      let element = (
        <div>
          <h3>Foo</h3>
          <p>Bar</p>
          <p>
            <h3>Baz</h3>
          </p>
          <h3>Qux</h3>
        </div>
      );

      let h3Elements = reactChildrenFilter(element.props.children, child => child.type === 'h3');

      expect(h3Elements).toBeDefined();
      expect(h3Elements.length).toBe(2);
      expect(h3Elements[0].props.children).toBe('Foo');
      expect(h3Elements[1].props.children).toBe('Qux');
    });
  });

});
