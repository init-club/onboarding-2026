"""
INIT Club Onboarding - Task 3: Algorithm Tour (Easy Level)
Binary Search and Merge Sort implemented in Python.

Run:  python3 algorithms.py
"""

from typing import List, Optional


def binary_search(arr: List[int], target: int) -> Optional[int]:
    """Return the index of `target` in a sorted list, or None if absent.

    Iterative rather than recursive: O(log n) time, O(1) extra space.
    Returns None rather than -1 on a miss, because -1 is a valid index in
    Python and would silently read the last element.
    """
    low, high = 0, len(arr) - 1

    while low <= high:
        # Written this way rather than (low + high) // 2 so the logic ports
        # to C/C++, where the sum can overflow a 32-bit int.
        mid = low + (high - low) // 2
        if arr[mid] == target:
            return mid
        if arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return None


def merge_sort(arr: List[int]) -> List[int]:
    """Return a new sorted list. Stable, O(n log n) time, O(n) extra space.

    Out-of-place by design: the input is never mutated, which makes the
    function easier to reason about and test.
    """
    if len(arr) <= 1:
        return arr[:]

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return _merge(left, right)


def _merge(left: List[int], right: List[int]) -> List[int]:
    """Merge two sorted lists into one sorted list."""
    merged: List[int] = []
    i = j = 0

    while i < len(left) and j < len(right):
        # `<=` rather than `<` is the whole of what makes this sort stable.
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1

    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged


def run_tests() -> None:
    cases = [
        [],
        [1],
        [2, 1],
        [5, 3, 8, 1, 9, 2, 7],
        [4, 4, 4, 4],
        [-3, 0, -7, 12, -1],
        list(range(20, 0, -1)),
    ]
    for case in cases:
        original = case[:]
        assert merge_sort(case) == sorted(case), f"merge_sort failed on {case}"
        assert case == original, f"merge_sort mutated its input: {case}"
    print("merge_sort: all cases passed")

    data = [1, 3, 5, 7, 9, 11, 13]
    for i, value in enumerate(data):
        assert binary_search(data, value) == i, f"binary_search missed {value}"
    for missing in [0, 2, 8, 14]:
        assert binary_search(data, missing) is None, f"false hit on {missing}"
    assert binary_search([], 5) is None
    print("binary_search: all cases passed")


if __name__ == "__main__":
    run_tests()

    print("\n--- demo ---")
    unsorted = [38, 27, 43, 3, 9, 82, 10]
    print(f"input        : {unsorted}")

    ordered = merge_sort(unsorted)
    print(f"merge_sort   : {ordered}")
    print(f"input intact : {unsorted}")

    for target in (43, 100):
        idx = binary_search(ordered, target)
        found = f"index {idx}" if idx is not None else "not found"
        print(f"search {target:>3}   : {found}")
