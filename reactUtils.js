/**
 * React-related utilities
 */

import React from 'react';

/**
 * Like React.Children.forEach(), but traverses through all descendant children.
 *
 * @param children Children of a React element, i.e. `elem.props.children`
 * @param callback {function} A function to be run for each child; parameters passed: (child, indexOfChildInImmediateParent)
 */
export function reactChildrenForEachDeep(children, callback) {
  React.Children.forEach(children, (child, i) => {
    callback(child, i);
    if (child.props.children) {
      reactChildrenForEachDeep(child.props.children, callback);
    }
  });
}
