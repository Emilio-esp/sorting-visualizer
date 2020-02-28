import store from "../store";
import {
    stateAlgorithm,
    evaluateItems,
    setSwapItems,
    setColumns,
    FINISHED_ALGORITHM
} from "../actions";

const  mergeSort = (arr, speed)=>{
    store.dispatch(stateAlgorithm(true))

    let toDispatch = [],
    start = 0,
    end = arr.length-1,
    array = arr.map((val, index)=>[val,index]),
    arrObj = {array: arr.slice(0)};

    toDispatch.push(arr);

    let finalArray = mergeSortHelper(array, toDispatch, start, end,arrObj)
    // console.log(toDispatch);
    
    toDispatch.push(finalArray.map(val => val[0]))
    handleDispatch(toDispatch, speed)
}

function mergeSortHelper(array, toDispatch, start, end, arrObj) {

    if ( array.length === 1) {
        return array;
    }

    let middle = Math.floor(array.length / 2);
    let indexMiddle = Math.floor((end + 1 + start)/ 2);

    let arr1 = [], arr2 = [];

    for (let i = 0; i < array.length; i++) {
        if (i < middle) {
            arr1.push(array[i])
        } else {
            arr2.push(array[i])
        }

    }

    let actualFirst = mergeSortHelper(arr1,toDispatch, start, indexMiddle-1, arrObj)
    let actualSecond = mergeSortHelper(arr2,toDispatch, indexMiddle, end, arrObj)

    return merge(actualFirst, actualSecond,toDispatch, start, end, arrObj)

}

function merge(first, second, toDispatch, start, end, arrObj) {
    // console.log(toDispatch, start, end);
    
    let merge = [];
    // let i = 0, j = 0;
    

    while (first.length && second.length) {
        //evaluate [idx1, idx2]
        toDispatch.push([ first[0][1], second[0][1] ])

        if (first[0][0] < second[0][0]) {
            merge.push(first.shift())            
        }
        else {
            //swap [idx1, idx2, true]
            toDispatch.push([first[0][1], second[0][1], true]);
            
            merge.push(second.shift())
            
            if (start === 0) {
                // console.log("if");
                
                arrObj.array = merge.map(subArr => subArr[0]).concat(first.map(subArr => subArr[0])).concat(second.map(subArr => subArr[0])).concat(arrObj.array.slice(end + 1));
            } else {
                // console.log("else");
                
                arrObj.array = arrObj.array.slice(0, start).concat(merge.map(subArr => subArr[0])).concat(first.map(subArr => subArr[0])).concat(second.map(subArr => subArr[0])).concat(arrObj.array.slice(end + 1));
            } 
            
            toDispatch.push(arrObj.array)
            toDispatch.push([])
            
            
        }
    }

    while (first.length) {
        merge.push(first.shift())
        
    }

    while (second.length) {
        merge.push(second.shift())
        
    }
    // console.log(merge);
    
    return merge
}

function handleDispatch(toDispatch,speed) {
    if (!toDispatch.length) {
        store.dispatch(evaluateItems([]));
        store.dispatch(FINISHED_ALGORITHM(true));
        setTimeout(() => {
            store.dispatch(stateAlgorithm(false))
            store.dispatch(FINISHED_ALGORITHM(false));
        }, 1000); 
        return
    }

    let dispatchFunction = toDispatch[0].length > 3 ? setColumns
                        :toDispatch[0].length === 2 ? evaluateItems
                        : toDispatch[0].length === 3 && toDispatch[0][2] === true ? setSwapItems
                        : setSwapItems;

    if (dispatchFunction.name === "setSwapItems") {
        store.dispatch(evaluateItems([]));
    }

    store.dispatch(dispatchFunction(toDispatch.shift()))
    

    setTimeout(() => {
        handleDispatch(toDispatch, speed)
    }, speed);

}


            




export default mergeSort