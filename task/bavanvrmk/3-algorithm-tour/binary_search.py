def bin_search(arr, target):
    lo,hi=0,len(arr)-1
    while lo<=hi:
        mid=(lo+hi)//2
        if arr[mid]==target:
            return mid
        if arr[mid]<target:
            lo=mid+1
        else:
            hi=mid-1
    return -1


a = [int(i) for i in input("Enter vals: ").split(",")]
print('Array:',a)
se=[int(i) for i in input("Enter what to search: ").split(",")]
for t in se:
    print(f'Search {t}: pos', bin_search(a, t))
