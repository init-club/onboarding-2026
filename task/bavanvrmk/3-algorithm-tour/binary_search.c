#include <stdio.h>

int bin_search(int arr[], int n, int target){
    int lo = 0, hi = n - 1;
    while (lo<=hi){
        int mid=lo+(hi-lo)/2;
        if (arr[mid]==target) return mid;
        if (arr[mid]<target) lo=mid+1;
        else hi=mid-1;
    }
    return -1;
}

int main(void) {
    int a[]={1,2,3,4,5};
    int n=sizeof(a)/sizeof(a[0]);
    int targets[]={1,2,3};
    int m=sizeof(targets)/sizeof(targets[0]);
    printf("Array:");
    for (int i=0;i<n;++i) printf("%d ", a[i]);
    printf("\n");
    for (int i=0;i<m;++i) {
        int t=targets[i];
        int idx=bin_search(a,n,t);
        printf("Search %d: %d\n",t,idx);
    }
    return 0;
}
