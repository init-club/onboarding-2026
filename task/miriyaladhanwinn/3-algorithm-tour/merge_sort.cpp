/**
 * Merge Sort Implementation in C++ (C++17)
 * Complexity:
 *   - Time: O(n log n)
 *   - Space: O(n) auxiliary
 */

#include <iostream>
#include <vector>
#include <cassert>
#include <algorithm>

void merge(std::vector<int>& arr, int left, int mid, int right) {
    int n1 = mid - left + 1;
    int n2 = right - mid;

    std::vector<int> L(n1);
    std::vector<int> R(n2);

    for (int i = 0; i < n1; ++i)
        L[i] = arr[left + i];
    for (int j = 0; j < n2; ++j)
        R[j] = arr[mid + 1 + j];

    int i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
        if (L[i] <= R[j]) {
            arr[k++] = L[i++];
        } else {
            arr[k++] = R[j++];
        }
    }

    while (i < n1) {
        arr[k++] = L[i++];
    }
    while (j < n2) {
        arr[k++] = R[j++];
    }
}

void mergeSort(std::vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}

void sort(std::vector<int>& arr) {
    if (arr.empty()) return;
    mergeSort(arr, 0, static_cast<int>(arr.size()) - 1);
}

void printVector(const std::vector<int>& v) {
    std::cout << "[";
    for (size_t i = 0; i < v.size(); ++i) {
        std::cout << v[i] << (i + 1 < v.size() ? ", " : "");
    }
    std::cout << "]\n";
}

int main() {
    std::vector<int> sample = {34, 12, 89, 5, 2, 99, 45, 8, 27, 19, 67};
    std::cout << "Original Array: ";
    printVector(sample);

    sort(sample);
    std::cout << "Sorted Array:   ";
    printVector(sample);

    assert(std::is_sorted(sample.begin(), sample.end()));

    // Edge cases
    std::vector<int> empty;
    sort(empty);
    assert(empty.empty());

    std::vector<int> single = {42};
    sort(single);
    assert(single.size() == 1 && single[0] == 42);

    std::vector<int> reversed = {5, 4, 3, 2, 1};
    sort(reversed);
    assert(std::is_sorted(reversed.begin(), reversed.end()));

    std::cout << "\nAll C++ Merge Sort assertions passed successfully!\n";
    return 0;
}
