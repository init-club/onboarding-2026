/**
 * Binary Search Implementation in C++ (C++17)
 * Complexity:
 *   - Time: O(log n)
 *   - Space: O(1) iterative
 */

#include <iostream>
#include <vector>
#include <cassert>
#include <iomanip>

int binarySearch(const std::vector<int>& arr, int target) {
    int low = 0;
    int high = static_cast<int>(arr.size()) - 1;

    while (low <= high) {
        // Safe midpoint calculation avoiding integer overflow
        int mid = low + (high - low) / 2;

        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;
}

int main() {
    std::vector<int> testArr = {3, 8, 15, 23, 37, 42, 59, 71, 88, 95};
    std::vector<int> targets = {42, 3, 95, 100, 1};

    std::cout << "Sorted Array: [";
    for (size_t i = 0; i < testArr.size(); ++i) {
        std::cout << testArr[i] << (i + 1 < testArr.size() ? ", " : "");
    }
    std::cout << "]\n";

    for (int t : targets) {
        int idx = binarySearch(testArr, t);
        std::cout << "Searching for " << std::setw(3) << t << " -> Index: " << std::setw(2) << idx << "\n";
    }

    // Edge case assertions
    assert(binarySearch({}, 5) == -1);
    assert(binarySearch({10}, 10) == 0);
    assert(binarySearch({10}, 20) == -1);

    std::cout << "\nAll C++ Binary Search assertions passed successfully!\n";
    return 0;
}
