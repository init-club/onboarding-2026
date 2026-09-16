/**
 * Merge Sort Implementation in JavaScript (Node.js / ES6)
 * Complexity:
 *   - Time: O(n log n)
 *   - Space: O(n) auxiliary
 */

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

// Assertions
const checkSorted = (arr) => arr.every((v, i, a) => !i || a[i - 1] <= v);
console.assert(checkSorted(sorted), 'Array is not sorted');
console.assert(JSON.stringify(mergeSort([])) === JSON.stringify([]), 'Failed empty array');
console.assert(JSON.stringify(mergeSort([42])) === JSON.stringify([42]), 'Failed single element');
console.assert(JSON.stringify(mergeSort([5, 4, 3, 2, 1])) === JSON.stringify([1, 2, 3, 4, 5]), 'Failed reverse sorted');
console.log('\nAll JavaScript Merge Sort assertions passed successfully!');

module.exports = { mergeSort };
