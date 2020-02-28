const pivotReducer = (pivot = [], action) => {
    if (action.type === 'SET_CURRENT_PIVOT') {
        return action.payload
    }
    return pivot
}

export {
    pivotReducer
}