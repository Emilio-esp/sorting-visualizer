
import store from '../store';

const setCantOfColumns = (cant)=>{
    return({
        type: 'ARRAY_UNSHIFT',
        payload: cant
    })
}

const setColumns = (columnsArray = [] ) => {
    
    const state = store.getState();
    
    if (!columnsArray.length) {
        for (let i = 0; i < state.cantOfColumns; i++) {
            let column = Math.floor(Math.random() * 100)

            column < 4 ? columnsArray.push(column + 3) : columnsArray.push(column);
            
        }        
    }
    
    return({
        type: "SET_COLUMNS",
        payload: columnsArray
    })

}

const setAlgorithm = (algorithm)=>{

    return({
        type: 'SET_ALGORITHM',
        payload: algorithm
    })

    
}

const stateAlgorithm = (status) =>{
    return({
        type: "TOGGLE_ALGORITHM",
        payload: status
    })
}

/**
 * Bubble Sort Reducer
 */
const setSwapItems = (arr) => {
    
    return({
        type: "SWAP_ITEMS",
        payload: arr
    })
}

const evaluateItems = (arr) => {
    
    return({
        type: "EVALUATE_ITEMS",
        payload: arr
    })
}

const resetArray = ()=>{
    return ({
        type: "RESET_ARRAY",
        payload: []
    })
}

/* QuickjSort */

const setPivot = (arr)=>{
    return ({
        type: "SET_CURRENT_PIVOT",
        payload: arr
    })
}
const FINISHED_ALGORITHM = (arr)=>{
    return ({
        type: "FINISHED_ALGORITHM",
        payload: arr
    })
}


export {
    setCantOfColumns,
    setColumns,
    setAlgorithm,
    stateAlgorithm,
    setSwapItems,
    evaluateItems,
    resetArray,
    setPivot,
    FINISHED_ALGORITHM
}