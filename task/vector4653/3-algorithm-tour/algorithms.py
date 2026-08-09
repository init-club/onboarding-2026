# Simple Binary Search implementation
def binary_search(arr, target):
    low = 0
    high = len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
            
    return -1


# Merge Sort using divide and conquer
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    # Merge the two sorted halves
    res = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            res.append(left[i])
            i += 1
        else:
            res.append(right[j])
            j += 1
            
    res.extend(left[i:])
    res.extend(right[j:])
    return res


if __name__ == "__main__":
    numbers = [38, 27, 43, 3, 9, 82, 10]
    sorted_numbers = merge_sort(numbers)
    print("Original array:", numbers)
    print("Sorted array:", sorted_numbers)
    
    target_val = 9
    found_idx = binary_search(sorted_numbers, target_val)
    print(f"Index of {target_val}:", found_idx)
