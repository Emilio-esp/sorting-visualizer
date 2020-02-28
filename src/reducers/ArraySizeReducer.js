export default (columns = [],  action )=>{
    if(action.type === 'ARRAY_UNSHIFT'){
        return action.payload 
    }

    return columns
}