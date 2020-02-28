export const SwapItemsReducer = (initialState = [], action) => {
    if (action.type === 'SWAP_ITEMS') {
        return action.payload
    }

    return initialState
}