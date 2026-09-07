def merge_sort(arr):
    if len(arr)<=1:
        return arr

    mid=len(arr)//2

    left=merge_sort(arr[:mid])
    right=merge_sort(arr[mid:])

    return merge(left,right)

def merge(left,right):
    result=[]
    i=j=0

    while i<len(left) and j<len(right):
        if left[i]<=right[j]:
            result.append(left[i])
            i+=1
        else:
            result.append(right[j])
            j+=1

    result.extend(left[i:])
    result.extend(right[j:])
    

    return result

while True:
    choice=int(input("Enter 1 to end the program."))
    if choice==1:
        break
    num=int(input("Enter the number of elements in the array: "))
    arr = []
    print("Enter the elements of the array:")
    for i in range(num):
        print(f"Element {i+1}: ")
        arr.append(int(input()))
    print("Initial:", arr)
    print("Sorted:  ", merge_sort(arr))