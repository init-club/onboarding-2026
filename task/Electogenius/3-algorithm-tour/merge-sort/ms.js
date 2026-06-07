function mergeSort(arr) {
	if (arr.length < 2) return arr;

	const mid = arr.length >> 1;

	let lhs = mergeSort(arr.slice(0, mid));
	let rhs = mergeSort(arr.slice(mid));

	let merged = [];
	while (true) {
		if (!lhs.length) {
			merged.push(...rhs);
			break;
		}
		if (!rhs.length) {
			merged.push(...lhs);
			break;
		}
		if (lhs[0] < rhs[0]) merged.push(lhs.shift());
		else merged.push(rhs.shift());
	}

	return merged;
}

console.log(mergeSort([1, 2, 10, 11, 1000, -5, 80, 4, 1]))