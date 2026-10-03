#include <stdio.h>

int binary_search(int arr[],int n,int target){
    int low=0;
    int high=n-1;

    while (low<=high){
        int mid=low+(high-low)/2;

        if (arr[mid]==target){
            return mid;
        }
        else if(arr[mid]<target){
            low=mid+1;
        }
        else{
            high=mid-1;
        }

    }
    return -1;
}

void merge(int arr[],int temp[],int left,int mid,int right){
    int i=left;
    int j=mid+1;
    int k=left;

    while (i<=mid && j<=right){
        if (arr[i]<=arr[j]){
            temp[k]=arr[i];
            i++;
        }
        else{
            temp[k]=arr[j];
            j++;
        }
        k++;
    }
    while (i<=mid){
        temp[k]=arr[i];
        i++;
        k++;
    }
    while (j<=right){
        temp[k]=arr[j];
        j++;
        k++;
    }
    for(int m=left;m<=right;m++){
        arr[m]=temp[m];
    }
}


void merge_sort(int arr[],int temp[],int left,int right){
    if(left>=right){
        return;
    }
    int mid=left+(right-left)/2;

    merge_sort(arr,temp,left,mid);
    merge_sort(arr,temp,mid+1,right);
    merge(arr,temp,left,mid,right);
}

void print_array(int arr[],int n){
    printf("[");
    for(int i=0;i<n;i++){
        printf("%d",arr[i]);
        if(i<n-1)printf(",");
    }
    printf("]\n");
}


int main(){
    int data[]={38,27,43,3,8,82,10};
    int n=7;
    int temp[7];
    printf("before sorting");
    print_array(data,n);
    merge_sort(data,temp,0,n-1);
    print("after sorting");
    print_array(data,n);
    print("\nbinary search\n");
    printf("target 43 is at index %d\n",binary_search(data,n,43));
        
    printf("target 9 is at index %d\n",binary_search(data,n,9));
    printf("target 100 is at index %d\n",binary_search(data,n,100));
    return 0;

}