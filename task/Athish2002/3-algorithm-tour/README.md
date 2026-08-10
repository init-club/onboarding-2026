# Task 3 — Algorithm Tour

Submitted by [@Athish2002](https://github.com/Athish2002). Tier: **Easy** (both algorithms,
single language — Python).

**Gist:** <https://gist.github.com/Athish2002/6cc30b248c12779bdd5a623174de3fe3>

The task asks for a GitHub Gist as the deliverable, so `algorithms.py` in this folder is a
copy of the Gist contents, kept here so reviewers don't have to leave the PR.

## What I implemented

Binary Search and Merge Sort in Python. The Easy tier only requires one, but they're short
enough that doing both gives a better basis for the comparison notes below.

## How a reviewer can verify it

```bash
python3 task/Athish2002/3-algorithm-tour/algorithms.py
```

Expected output:

```
merge_sort: all cases passed
binary_search: all cases passed

--- demo ---
input        : [38, 27, 43, 3, 9, 82, 10]
merge_sort   : [3, 9, 10, 27, 38, 43, 82]
input intact : [38, 27, 43, 3, 9, 82, 10]
search  43   : index 5
search 100   : not found
```

No dependencies, no arguments. The file runs its own assertions; a non-zero exit means a
test failed.

## Implementation choices

**Binary search is iterative, not recursive.** The recursive form is prettier but adds a
stack frame per step. The loop is O(log n) time, O(1) space.

**Midpoint as `low + (high - low) // 2`.** In Python, integers are arbitrary precision, so
`(low + high) // 2` is equally safe here — I used the other form because it's the one that
survives a port to C/C++, where `low + high` can overflow a 32-bit `int` on a large array.
That exact bug sat undetected in the JDK's `binarySearch` for nine years.

**Returns `None`, not `-1`, on a miss.** `-1` is a *valid* index in Python (it means "last
element"), so a caller who forgets to check gets silently wrong data instead of an error.
`None` fails loudly.

**Merge sort is out-of-place and stable.** It returns a new list and never mutates its
input, which costs O(n) extra space but makes it much easier to test and reason about.
Stability comes down to one character: `left[i] <= right[j]` in the merge step. With `<`,
the sort is still correct, but equal elements from the right half overtake equal elements
from the left — which breaks sorting by a secondary key.

## Complexity

| | Time | Extra space |
|---|---|---|
| Binary search | O(log n) | O(1) |
| Merge sort | O(n log n) best / average / worst | O(n) |

Merge sort's worst case matching its average is its main advantage over quicksort, which
degrades to O(n²) on adversarial input. The cost is that O(n) of scratch space.

## Testing

`run_tests()` covers the cases that break naive implementations: empty list, single element,
two elements, all-duplicates, negatives, and fully-reversed input. It also asserts the input
list is unmodified. Binary search is checked against every present value plus values below,
above, and between existing elements.
