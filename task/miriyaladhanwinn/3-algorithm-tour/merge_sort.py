#!/usr/bin/env python3
"""
Merge Sort Implementation in Python
Complexity:
  - Time: O(n log n) best, average, worst
  - Space: O(n) auxiliary
"""

from typing import List

def merge_sort(arr: List[int]) -> List[int]:
    """
    Recursively sorts a list using Merge Sort algorithm.
    Returns a new sorted list.
    """
    if len(arr) <= 1:
        return arr[:]

    mid = len(arr) // 2
    left_sorted = merge_sort(arr[:mid])
    right_sorted = merge_sort(arr[mid:])

    return _merge(left_sorted, right_sorted)

def _merge(left: List[int], right: List[int]) -> List[int]:
    merged: List[int] = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1

    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged

if __name__ == "__main__":
    sample = [34, 12, 89, 5, 2, 99, 45, 8, 27, 19, 67]
    print(f"Original Array: {sample}")
    sorted_arr = merge_sort(sample)
    print(f"Sorted Array:   {sorted_arr}")

    # Edge cases
    assert merge_sort([]) == []
    assert merge_sort([42]) == [42]
    assert merge_sort([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]
    assert merge_sort([1, 2, 3, 4, 5]) == [1, 2, 3, 4, 5]
    print("\nAll Python Merge Sort test assertions passed successfully!")
