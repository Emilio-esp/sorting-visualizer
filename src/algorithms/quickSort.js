import store from "../store";
import {
    stateAlgorithm,
    evaluateItems,
    setSwapItems,
    setColumns,
    setPivot,
    FINISHED_ALGORITHM
} from "../actions";

function quickSort(arr, speed){
    store.dispatch(stateAlgorithm(true))
    let toDispatch = [],
        array = arr.map((val, index) => val );
    
    quickSortHelper(array, 0, array.length-1, toDispatch);
    
    handleDispatch(toDispatch, speed)
    

}


function quickSortHelper(arr, left, right, toDispatch) {
    if (left < right) {
        let pivotIndex = pivot(arr, left, right , toDispatch)
        quickSortHelper(arr, left, pivotIndex - 1, toDispatch);
        quickSortHelper(arr, pivotIndex + 1, right, toDispatch);
    }
    return arr;
}

function pivot(arr, start = 0, end = arr.length - 1, toDispatch) {
    let pivot = arr[start];
    
    toDispatch.push(arr.slice(0))
    toDispatch.push([start,true])
    let index = start;

    for (let i = start + 1; i <= end; i++) {
        toDispatch.push([])
        toDispatch.push([i, i])
        if (pivot > arr[i]) {
            index++;
            toDispatch.push([index, i, true]);
            
            let temp = arr[index];
            arr[index] = arr[i];
            arr[i] = temp;
            toDispatch.push(arr.slice(0))
            toDispatch.push([])
        }
    }


    let temp = arr[index];
    arr[start] = temp;
    arr[index] = pivot;
    toDispatch.push([start, index, true])
    toDispatch.push([])
    toDispatch.push(arr.slice(0))

    return index

}

function handleDispatch(toDispatch, speed) {
    if (!toDispatch.length) {
        store.dispatch(evaluateItems([]));
        store.dispatch(setSwapItems([]));
        store.dispatch(setPivot([]));
        store.dispatch(FINISHED_ALGORITHM(true));
        setTimeout(() => {
            store.dispatch(stateAlgorithm(false))
            store.dispatch(FINISHED_ALGORITHM(false));
            
        }, 1000);
        
        return;
    }
    let dispatchFuntion = toDispatch[0].length > 3 ? setColumns
                        : toDispatch[0].length === 2 && toDispatch[0][1]===true ? setPivot
                        : toDispatch[0].length === 2 ? evaluateItems
                        : toDispatch[0].length === 3 && toDispatch[0][2] === true? setSwapItems
                        : toDispatch[0].length === 0 ? setSwapItems :
                        evaluateItems;
    
    store.dispatch(dispatchFuntion(toDispatch.shift()));

    setTimeout(() => {
        handleDispatch(toDispatch, speed)
    }, speed);
}


export default quickSort