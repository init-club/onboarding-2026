// Binary Search
function binarysearch(arr, target) {
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
        let mid = Math.floor((low + high) / 2);
        if (arr[mid] === target) {
            return mid; // target found
        }
        if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1; 
}


function merge(left, right) {
    let result = [];
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


// Merge Sort
function mergesort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let mid = Math.floor(arr.length / 2);
    let left = arr.slice(0, mid);
    let right = arr.slice(mid);
    left = mergesort(left);
    right = mergesort(right);
    return merge(left, right);
}


let data = [38,27,43,8,82,1];
console.log("before sorting",data);
data = mergesort(data);
console.log("after sorting",data);
console.log("\nbinary search\n");
console.log("Target 43 is at %d\n", binarysearch(data, 43));
console.log("Target 9  is at %d\n", binarysearch(data, 9));
console.log("Target 100 is at %d\n", binarysearch(data, 100));