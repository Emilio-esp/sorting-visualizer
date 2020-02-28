export default( columns = [], action) => {
    if (action.type === 'SET_COLUMNS') {
        return action.payload
    }

    return columns
}