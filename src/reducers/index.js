import { combineReducers } from 'redux';
import ArraySizeReducer from './ArraySizeReducer'
import ColumnsReducer from './ColumnsReducer'
import { setAlgorithmReducer, stateAlgorithmReducer, algorithmFinishedReducer} from './AlgorithmReducer'
import { SwapItemsReducer } from './SwapReducer'
import { EvaluateItemsReducer } from './EvaluateReducer'
import {pivotReducer} from '../reducers/quickSort'

export default combineReducers({
    cantOfColumns: ArraySizeReducer,
    columns: ColumnsReducer,
    algorithm: setAlgorithmReducer,
    algorithmRunning: stateAlgorithmReducer,
    SwapItemsReducer,
    EvaluateItemsReducer,
    pivot: pivotReducer,
    algorithmFinishedReducer
});
