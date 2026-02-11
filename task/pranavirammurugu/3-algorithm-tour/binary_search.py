def binary_search(arr,target):
  high=len(arr)-1
  low=0
  while low<=high:
    mid=(low+high)//2
    if arr[mid]==target:
      return mid
    elif arr[mid]<target:
      low=mid+1
    else:
      low=mid-1
  return -1
my_list=[1,34,56,74,76]
target=56
result=binary_search(my_list,target)
print("element is found at index:",result)
