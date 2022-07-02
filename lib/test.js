//Binary Search 

// function binSearch(arr = [], answer){
//     let min = 0;
//     let max = arr.length -1

//     while (min <= max) {
//         let mid = Math.floor((min+max)/2)
//         let guess = arr[mid];
//         if (guess == answer){
//             return (`guess is correct, number is: ${answer}. at ${mid}`)
//         }

//         if (guess > answer){
//             max = mid - 1
//         }
//         else{
//             min = mid + 1
//         }
//         return(null)
//     }
// }

// selection sort algorithm
// function findSmallest(arr){
//     min = arr[0];

//     for( let i = 1; i < arr.length ; i++  ){
//         if(arr[i] <= min ){
//             min = arr[i];
//             min_index = i;
//         }
//         return min_index;
//     }
    
// }
// function selectionSort(arr){
//     const dup_arr = arr
//     const sortedList = []
//     for(let tracker = 1; tracker <= arr.length; tracker++ ){
//         let current_min = findSmallest();
//         sortedList.push(arr[current_min]);
//         dup_arr.filter((i)=> i !== arr[indexOf(i)])
//     }
//     return sortedList;
// }

// //recursive programming
// //---factorial
// function fact(num){
//     if(i == 1){
//         return 1
//     }
//     else {num * fact(num - 1)}
// }


// //recursive addition
// function add(arr,i = 0){
//     if (i === arr.length-1){
//         return arr[i]
//     }
//     else { return arr[i] + add(arr, i + 1)}
// }
// console.log(add([1,4,5,7,9,3,4]))

// //Euclid's Algorithm
// function divideSq(x,y){
//     //let X be greater than Y
 
//     if (x < y){
//         [x,y]
//     }

//     if (x % y == 0){
//         return y
//     }
//     return divideSq(y,x%y)

// }


//  Quick sort

function quickSortx(arr){
    let newArr = arr;
    if(newArr.length < 2){
        return newArr
    }
    if(newArr.length == 2 ){
        if (newArr[0] > newArr[1]){
            [newArr[0],newArr[1]] = [newArr[1],newArr[0]]
        }
        return newArr
    }
    let pivot = newArr[0]
    let left = []
    let right = []
    for (i of newArr){
        //Sub group of array less than pivot
        if (i < pivot){
            
            left.push(i)
        }

        //Sub group of array greater than pivot

        else if(i > pivot){
            right.push(i)
        }
    }
    return [...quickSortx(left), pivot ,  ...quickSortx(right)]

}
console.log(quickSortx([8,2,1,7,2,3]))


// function quickSort(arr){
//     if(arr.length < 2){
//         return arr
//     }
    
//     let pivot = arr[0]
//     let left = arr.filter((i)=> i < pivot);
//     let right = arr.filter((i)=> i > pivot) 
//     return quickSort(left).concat(pivot, quickSort(right))

// }
// console.log(quickSort([8,2,8,3,12,1,6]))
