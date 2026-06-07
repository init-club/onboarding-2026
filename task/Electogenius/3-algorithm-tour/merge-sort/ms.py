def merge_sort(arr):
	if len(arr) < 2:
		return arr
	mid = len(arr) // 2
	fhs = merge_sort(arr[:mid]) # first half sorted
	shs = merge_sort(arr[mid:]) # second half sorted
	merged = []
	while True:
		if not fhs:
			merged.extend(shs)
			break
		if not shs:
			merged.extend(fhs)
			break
		if fhs[0] < shs[0]:
			merged.append(fhs.pop(0))
		else:
			merged.append(shs.pop(0))
	return merged

print(merge_sort([1, 2, 10, 11, 1000, -5, 80, 4, 1]))