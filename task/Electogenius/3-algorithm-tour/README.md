# Task completed: Algorithm Tour

I have implemented binary search and merge sort in python, js and C (in that order).

Some notes on my implementations:

## Binary search
Used recursion.
- Python: Prolific use of slicing.
- JS: Tried not to use slicing, so ended up with a few extra arguments and some finnicky indexing (might still be mistakes in there but the code works atleast). Also realized right bitshift is a nice way to do floor division by 2. Returns `null` if key not found.
- C: Mostly similar implementation to JS, returns -1 if not found. Slightly less convenient usage because C doesn't have default arguments.

## Merge sort
Might be a better way to merge but this is what I know and like.
- Python: Used slicing.
- JS: Also used slicing, direct translation of the python version
- C: Used in-place merge sort (no slicing of course) (copies first and second halves to seperate arrays, sorts them in place and merges them into original array). Very surprised that that `memcpy` works.

