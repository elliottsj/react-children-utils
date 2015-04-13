/**
 * React-related utilities
 */

import React from 'react';

/**
 * Like React.Children.forEach(), but traverses through all descendant children.
 *
 * @param children Children of a React element, i.e. `elem.props.children`
 * @param callback {forEachCallback} A function to be run for each child
 */
export function reactChildrenForEachDeep(children, callback) {
  _reactChildrenForEachDeep(children, callback, 1);
}

function _reactChildrenForEachDeep(children, callback, depth) {
  React.Children.forEach(children, (child, i) => {
    callback(child, i, depth);
    if (child.props && child.props.children) {
      _reactChildrenForEachDeep(child.props.children, callback, depth + 1);
    }
  });
}

/**
 * This callback is displayed as part of the Requester class.
 *
 * @callback forEachCallback
 * @param {*} child The React child
 * @param {number} index The index of the child in its immediate parent
 * @param {number} depth The number of parents traversed to react this child (top-level children have depth === 1)
 */
