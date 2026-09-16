#!/usr/bin/env python3
"""
Binary Search Implementation in Python
Complexity:
  - Time: O(log n)
  - Space: O(1) iterative
"""

from typing import List, Any, Optional

def binary_search(arr: List[int], target: int) -> int:
    """
    Searches for target in a sorted list arr.
    Returns the index if found, else -1.
    """
    low: int = 0
    high: int = len(arr) - 1

    while low <= high:
        # Prevents integer overflow in standard architectures
        mid: int = low + (high - low) // 2

        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1

if __name__ == "__main__":
    test_arr = [3, 8, 15, 23, 37, 42, 59, 71, 88, 95]
    targets = [42, 3, 95, 100, 1]

    print(f"Sorted array: {test_arr}")
    for t in targets:
        idx = binary_search(test_arr, t)
        print(f"Searching for {t:3d} -> Index: {idx:2d}")

    # Edge cases
    assert binary_search([], 5) == -1
    assert binary_search([10], 10) == 0
    assert binary_search([10], 20) == -1
    print("\nAll Python Binary Search test assertions passed successfully!")
