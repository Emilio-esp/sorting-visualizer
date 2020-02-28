export const EvaluateItemsReducer = (initialState = [], action) => {
    if (action.type === 'EVALUATE_ITEMS') {
        return action.payload
    }

    return initialState
}