import { 
    stateAlgorithm,
    evaluateItems,
    setSwapItems,
    setColumns ,
    FINISHED_ALGORITHM
} from "../actions";
import store from '../store'

export default (arr, speed)=>{
    store.dispatch(stateAlgorithm(true))

    let toDispatch = [];
    toDispatch.push(arr.slice(0));

    for (let i = arr.length - 1; i >= 0; i--) {
        for (let j = 0; j < i; j++) {
            toDispatch.push([j, j + 1])
            if (arr[j] > arr[j + 1]) {
                toDispatch.push(arr.slice(0));
                toDispatch.push([j, j + 1, true])
                let temp = arr[j + 1];
                arr[j + 1] = arr[j];
                arr[j] = temp;
                toDispatch.push(arr.slice(0));
                toDispatch.push([]);
            }
        }
    }
    handleDispatch(toDispatch, speed)
}
//[[4,6],[4,6,true],[4,6,1,5], []]
function handleDispatch(toDispatch, speed) {

    if (!toDispatch.length) {
        store.dispatch(evaluateItems(toDispatch));  

        store.dispatch(FINISHED_ALGORITHM(true));
        setTimeout(() => {
            store.dispatch(stateAlgorithm(false))
            store.dispatch(FINISHED_ALGORITHM(false));
        }, 1000);  

        return
    }
    let dispatchFunction = toDispatch[0].length > 3 ? setColumns:
                    toDispatch[0].length === 2 ? evaluateItems:
                        toDispatch[0].length === 3 && toDispatch[0][2] === true ? setSwapItems:
                            toDispatch[0].length === 0 ? setSwapItems : evaluateItems;

        
    if (dispatchFunction.name === "setSwapItems") {
        store.dispatch(evaluateItems([]));
    }

    store.dispatch(dispatchFunction(toDispatch.shift()));

    
    setTimeout(() => {
        handleDispatch(toDispatch, speed)
    }, speed);

}
