'use strict';

/**
 * React-related utilities
 */

import React from 'react';

function _reactChildrenForEachDeep(children, callback, depth) {
  React.Children.forEach(children, (child, i) => {
    callback(child, i, depth);
    if (child.props && child.props.children) {
      _reactChildrenForEachDeep(child.props.children, callback, depth + 1);
    }
  });
}

/**
 * Like React.Children.forEach(), but traverses through all descendant children.
 *
 * @param children Children of a React element, i.e. `elem.props.children`
 * @param callback {forEachCallback} A function to be run for each child
 */
export function reactChildrenForEachDeep(children, callback) {
  _reactChildrenForEachDeep(children, callback, 1);
}

/**
 * This callback is displayed as part of the Requester class.
 *
 * @callback forEachCallback
 * @param {*} child The React child
 * @param {number} index The index of the child in its immediate parent
 * @param {number} depth The number of parents traversed to react this child (top-level children have depth === 1)
 */

/**
 * Iterates over given chilren, returning an array of all children `predicate`
 * returns truthy for.
 *
 * @param {*} children Children of a React element, i.e. `elem.props.children`
 * @param {function} predicate The function invoked per iteration
 */
export function reactChildrenFilter(children, predicate) {
  let result = [];
  React.Children.forEach(children, (child, i) => {
    if (predicate(child, i)) {
      result.push(child);
    }
  });
  return result;
}

/**
 * This function is invoked for each child in `reactChildrenFilter`
 *
 * @callback filterPredicate
 * @param {*} child The React child
 * @param {number} index The index of the child in its parent
 */
