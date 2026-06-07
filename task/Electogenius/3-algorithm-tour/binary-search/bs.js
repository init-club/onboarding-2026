function binarySearch(arr, item, startIndex = 0, length = null) {
	if (length === null) length = arr.length;
	if (length < 0) return;
	if (length == 0) return null;
	if (length == 1) return arr[startIndex] == item ? startIndex : null;
	const mid = startIndex + (length >> 1);
	if (arr[mid] == item)
		return mid;
	else if (arr[mid] < item)
		return binarySearch(arr, item, mid + 1, length >> 1 - 1);
	else
		return binarySearch(arr, item, startIndex, length >> 1);
}

// LLM-generated test-cases:

console.log(binarySearch([], 5));                // expected: -1 (empty array)
console.log(binarySearch([1], 1));               // expected: 0  (single element, found)
console.log(binarySearch([1], 2));               // expected: -1 (single element, not found)
console.log(binarySearch([1,2,3,4,5], 1));       // expected: 0  (found at start)
console.log(binarySearch([1,2,3,4,5], 3));       // expected: 2  (found in middle)
console.log(binarySearch([1,2,3,4,5], 5));       // expected: 4  (found at end)
console.log(binarySearch([1,2,3,4,5], 6));       // expected: -1 (not present)
console.log(binarySearch([1,2,2,2,3,4], 2));     // expected: index of any 2 (e.g., 1, 2, or 3)
console.log(binarySearch([-10,-3,0,7,15], -3));  // expected: 1  (negative numbers)
console.log(binarySearch([0,1,2,3,4,5,6,7,8,9], 8)); // expected: 8 (larger array)
