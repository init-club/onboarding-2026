a = [10, 20, 30, 40, 50, 60, 70]

x = int(input("Enter element to search: "))

low = 0
high = len(a) - 1
found = 0

while low <= high:
    mid = (low + high) // 2

    if a[mid] == x:
        print("Element found at index", mid)
        found = 1
        break

    elif x < a[mid]:
        high = mid - 1

    else:
        low = mid + 1

if found == 0:
    print("Element not found")