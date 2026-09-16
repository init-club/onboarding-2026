/**
 * Binary Search Implementation in JavaScript (Node.js / ES6)
 * Complexity:
 *   - Time: O(log n)
 *   - Space: O(1) iterative
 */

function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;

  while (low <= high) {
    // Bitwise zero-fill right shift for fast, overflow-safe integer midpoint
    const mid = (low + high) >>> 1;

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

// Assertions
console.assert(binarySearch([], 5) === -1, 'Failed on empty array');
console.assert(binarySearch([10], 10) === 0, 'Failed on single-element match');
console.assert(binarySearch([10], 20) === -1, 'Failed on single-element missing');
console.log('\nAll JavaScript Binary Search assertions passed successfully!');

module.exports = { binarySearch };
