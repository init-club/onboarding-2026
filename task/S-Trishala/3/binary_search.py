a = [2, 4, 6, 8, 10, 12, 14]
key = 10

low = 0
high = len(a) - 1

while low <= high:
    mid = (low + high) // 2

    if a[mid] == key:
        print("Element found at position", mid)
        break
    elif a[mid] < key:
        low = mid + 1
    else:
        high = mid - 1
else:
    print("Element not found")