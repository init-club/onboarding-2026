def binary_search(arr,target):
    low,high=0,len(arr)-1
    while low<=high:
        mid=(low+high)//2
        if arr[mid]==target:
            return mid
        elif arr[mid]<target:
            low=mid+1
        else:
            high=mid-1
    return -1

def merge_sort(a):
    if len(a)<=1:
        return a 
    mid=len(a)//2
    L,R=merge_sort(a[:mid]),merge_sort(a[mid:])
    out,i,j=[],0,0
    while i<len(L) and j<len(R):
        if L[i]<=R[j]:
            out.append(L[i]);i+=1
        else:
            out.append(R[j]);j+=1
    return out+L[i:]+R[j:]

data =merge_sort([38,27,43,32,96,10])
print(data)
print(binary_search(data,32))
print(binary_search(data,96))
print(binary_search(data,-2))

