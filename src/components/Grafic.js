import React from 'react';
import { connect } from 'react-redux';
import Column from "./Column";

import "../styles/graphic.css";


const Grafic = (props) => {
    // console.log(props);
    

    const generateGraphic = ( arr ) => {

        return arr.map((value, index)=>{
            let styleColumn

            props.swapItems.includes(index) ? styleColumn = 'swap' 
                : props.evaluate.includes(index) ? styleColumn = 'evaluate'  
                    :props.pivot.includes(index) ? styleColumn = 'pivot'
                    :props.isFinished ? styleColumn = 'finish'
                    :styleColumn = 'column'
                
                return (
                    <Column
                        key={index}
                        value={value}
                        cant={arr.length}
                        styleColumn={styleColumn}
                    />
                )
            
        })

    }

    return (
        <div>
            <div 
                className="container-columns"
            >
                {generateGraphic(props.columns)}
            </div>
        </div>
    );
}

const mapStateToProps = state=>{
    return{
        columns: state.columns,
        swapItems: state.SwapItemsReducer,
        evaluate: state.EvaluateItemsReducer,
        pivot: state.pivot,
        isFinished: state.algorithmFinishedReducer
    }
}

export default connect(mapStateToProps)(Grafic);
