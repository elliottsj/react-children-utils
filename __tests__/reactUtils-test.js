'use strict';

/* global jest, beforeEach, describe, it, expect */

import React from 'react';

jest.dontMock('../reactUtils');

describe('reactUtils', () => {
  let reactChildrenForEachDeep = require('../reactUtils').reactChildrenForEachDeep;

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
      expect(callback.mock.calls[0][0].type === 'p');
      expect(callback.mock.calls[1][0] === 'Foo');
      expect(callback.mock.calls[2][0].type === 'p');
      expect(callback.mock.calls[3][0] === 'Bar');
      expect(callback.mock.calls[4][0].type === 'p');
      expect(callback.mock.calls[5][0] === 'Baz');
      console.log(callback.mock.calls);
    });
  });

});
