/**
 * Binary Search Implementation in JavaScript (Node.js / ES6)
 * Complexity:
 *   - Time: O(log n)
 *   - Space: O(1) iterative
 */

const assert = require('node:assert/strict');

function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    // Arithmetic midpoint calculation avoiding 32-bit bitwise shift truncation
    const mid = low + Math.floor((high - low) / 2);

    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}

// Verification Driver
const testArr = [3, 8, 15, 23, 37, 42, 59, 71, 88, 95];
console.log(`Sorted Array: [${testArr.join(', ')}]`);

const targets = [42, 3, 95, 100, 1];
targets.forEach((t) => {
  const idx = binarySearch(testArr, t);
  console.log(`Searching for ${t.toString().padStart(3)} -> Index: ${idx.toString().padStart(2)}`);
});

// Comprehensive Strict Assertions (Fails process with non-zero exit code if invalid)
assert.strictEqual(binarySearch([], 5), -1, 'Empty array must return -1');
assert.strictEqual(binarySearch([10], 10), 0, 'Single-element match at index 0');
assert.strictEqual(binarySearch([10], 20), -1, 'Single-element missing must return -1');
assert.strictEqual(binarySearch([2, 4, 6, 8], 2), 0, 'First element match');
assert.strictEqual(binarySearch([2, 4, 6, 8], 8), 3, 'Last element match');
assert.strictEqual(binarySearch([2, 4, 6, 8], 1), -1, 'Element below minimum must return -1');
assert.strictEqual(binarySearch([2, 4, 6, 8], 9), -1, 'Element above maximum must return -1');
assert.strictEqual(binarySearch([2, 4, 6, 8], 5), -1, 'Element between existing values must return -1');
assert.strictEqual(binarySearch([1, 3, 5, 7, 9], 5), 2, 'Odd-length list center match');

console.log('\nAll JavaScript Binary Search assertions passed successfully!');

module.exports = { binarySearch };
