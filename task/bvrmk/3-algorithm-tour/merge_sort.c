#include <stdio.h>
#include <stdlib.h>

void merge(int *a, int l, int m, int r) {
    int n1=m-l+1;
    int n2=r-m;
    int *L=malloc(n1*sizeof(int));
    int *R=malloc(n2*sizeof(int));
    for (int i=0;i<n1;++i) L[i]=a[l+i];
    for (int j=0;j<n2;++j) R[j] = a[m+1+j];
    int i=0,j=0,k=l;
    while (i<n1 && j<n2){
        if (L[i]<=R[j])a[k++]=L[i++];else a[k++]=R[j++];
    }
    while (i<n1) a[k++] = L[i++];
    while (j<n2) a[k++] = R[j++];
    free(L); free(R);
}

void merge_sort(int *a, int l, int r) {
    if (l>=r) return;
    int m=l+(r-l)/2;
    merge_sort(a,l,m);
    merge_sort(a,m+1,r);
    merge(a,l,m,r);
}

int main(void) {
    int a[]={1,2,3,4,5,6};
    int n=sizeof(a)/sizeof(a[0]);
    printf("Unsorted:");
    for (int i=0;i<n;++i) printf("%d ",a[i]);
    printf("\n");
    merge_sort(a, 0, n-1);
    printf("Sorted:   ");
    for (int i = 0; i < n; ++i) printf("%d ", a[i]);
    printf("\n");
    return 0;
}
