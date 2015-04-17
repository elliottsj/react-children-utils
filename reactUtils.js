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
 * @param {forEachCallback} callback A function to be run for each child
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
 * Iterates over given children, returning an array of all children `predicate`
 * returns truthy for.
 *
 * @param {*} children Children of a React element, i.e. `elem.props.children`
 * @param {filterPredicate} predicate The function invoked per iteration
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

/**
 * Reduces children to a value which is the accumulated result of running each element in collection through iteratee,
 * where each successive invocation is supplied the return value of the previous.
 *
 * @param {*} children Children of a react element, i.e. `elem.props.children`
 * @param {reduceIteratee} iteratee The function invoked per iteration
 * @param {*} accumulator The initial value
 */
export function reactChildrenReduce(children, iteratee, accumulator) {
  React.Children.forEach(children, (child, i) => {
    accumulator = iteratee(accumulator, child, i, children);
  });
  return accumulator;
}

/**
 * The function invoked per iteration of reactChildrenReduce.
 *
 * @callback reduceIteratee
 * @param {*} accumulator The accumulated result of previous iterations
 * @param {*} child The current React child
 * @param {number} index The index of child in children
 * @param {*} children The children passed to reactChildrenReduce
 */
