/**
 * Merge Sort Implementation in JavaScript (Node.js / ES6)
 * Complexity:
 *   - Time: O(n log n)
 *   - Space: O(n) auxiliary
 */

const assert = require('node:assert/strict');

function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr.slice();
  }

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  while (i < left.length) {
    result.push(left[i]);
    i++;
  }
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}

// Verification Driver
const sample = [34, 12, 89, 5, 2, 99, 45, 8, 27, 19, 67];
console.log(`Original Array: [${sample.join(', ')}]`);
const sorted = mergeSort(sample);
console.log(`Sorted Array:   [${sorted.join(', ')}]`);

// Comprehensive Strict Assertions (Fails process with non-zero exit code if invalid)
assert.deepStrictEqual(mergeSort([]), [], 'Empty array test failed');
assert.deepStrictEqual(mergeSort([42]), [42], 'Single element test failed');
assert.deepStrictEqual(mergeSort([1, 2, 3, 4, 5]), [1, 2, 3, 4, 5], 'Already sorted array failed');
assert.deepStrictEqual(mergeSort([5, 4, 3, 2, 1]), [1, 2, 3, 4, 5], 'Reversed array failed');
assert.deepStrictEqual(mergeSort([4, 2, 4, 1, 2, 3, 1]), [1, 1, 2, 2, 3, 4, 4], 'Array with duplicates failed');
assert.deepStrictEqual(mergeSort([-3, 10, -5, 0, 7]), [-5, -3, 0, 7, 10], 'Array with negative numbers failed');

console.log('\nAll JavaScript Merge Sort assertions passed successfully!');

module.exports = { mergeSort };
