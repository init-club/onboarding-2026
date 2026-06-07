def binary_search(l, item):
	# assume l is sorted
	if not l:
		return None
	if len(l) == 1:
		return 0 if l[0] == item else None
	mid = len(l) // 2
	if l[mid] == item:
		return mid
	elif l[mid] < item:
		return mid + 1 + binary_search(l[mid + 1:], item)
	else:
		return binary_search(l[:mid], item)
print("index:", binary_search([1, 3, 5, 7, 8, 10, 11, 15, 23], 23))
