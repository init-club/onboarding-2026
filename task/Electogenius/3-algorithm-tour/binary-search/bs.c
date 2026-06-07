#include <stdio.h>
size_t binarySearch(int* arr, int item, size_t startIndex, size_t length) {
  // mostly copy-pasted from the js code
  if (length == 0)
    return -1;
  if (length == 1)
    return arr[startIndex] == item ? startIndex : -1;
  size_t mid = startIndex + (length / 2);
  if (arr[mid] == item)
    return mid;
  else if (arr[mid] < item)
    return binarySearch(arr, item, mid + 1, length / 2);
  else
    return binarySearch(arr, item, startIndex, length / 2);
}

int main(void) {
  // same LLM-generated test-cases
  int a0[] = {}; // empty (length 0)
  int a1[] = {1};
  int a5[] = {1, 2, 3, 4, 5};
  int dup[] = {1, 2, 2, 2, 3, 4};
  int neg[] = {-10, -3, 0, 7, 15};
  int big[] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};

  printf("%zu  (expected: (size_t)-1)  // empty array\n",
         binarySearch(a0, 5, 0, 0));
  printf("%zu  (expected: 0)  // single element found\n",
         binarySearch(a1, 1, 0, 1));
  printf("%zu  (expected: (size_t)-1)  // single element not found\n",
         binarySearch(a1, 2, 0, 1));
  printf("%zu  (expected: 0)  // found at start\n", binarySearch(a5, 1, 0, 5));
  printf("%zu  (expected: 2)  // found in middle\n", binarySearch(a5, 3, 0, 5));
  printf("%zu  (expected: 4)  // found at end\n", binarySearch(a5, 5, 0, 5));
  printf("%zu  (expected: (size_t)-1)  // not present\n",
         binarySearch(a5, 6, 0, 5));
  printf("%zu  (expected: index of any 2 between 1..3)  // duplicates\n",
         binarySearch(dup, 2, 0, 6));
  printf("%zu  (expected: 1)  // negative numbers\n",
         binarySearch(neg, -3, 0, 5));
  printf("%zu  (expected: 8)  // larger array\n", binarySearch(big, 8, 0, 10));
}