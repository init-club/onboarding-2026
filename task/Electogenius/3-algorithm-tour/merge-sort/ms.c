#include<stdio.h>
#include<string.h>

#define LENGTH(A) (sizeof(A) / sizeof(A[0]))

void mergeSort(int *arr, size_t length) {
	if (length < 2) return;

	int left_length = length >> 1;
	int right_length = length - left_length;

	int left[left_length];
	int right[right_length];

	for (int i = 0; i < left_length; i++) {
		left[i] = arr[i];
	}
	for (int i = 0; i < right_length; i++) {
		right[i] = arr[left_length + i];
	}

	mergeSort(left, left_length);
	mergeSort(right, right_length);

	int l = 0, r = 0;

	while (1) {
		if (l == left_length) {
			memcpy(&(arr[l + r]), &(right[r]), (right_length - r)*sizeof(int));
			break;
		}
		if (r == right_length) {
			memcpy(&(arr[l + r]), &(left[l]), (left_length - l)*sizeof(int));
			break;
		}
		if (left[l] < right[r]) {
			arr[l + r] = left[l]; l++;
		} else {
			arr[l + r] = right[r]; r++;
		}
	}
}

int main(void) {
	int arr[] = {1, 2, 10, 11, 1000, -5, 80, 4, 1};
	mergeSort(arr, LENGTH(arr));
	for (int i = 0; i < LENGTH(arr); i++) {
		printf("%d ", arr[i]);
	}
	printf("\n");
	return 0;
}