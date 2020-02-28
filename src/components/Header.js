import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import '../styles/Header.css'
import { setCantOfColumns } from '../actions/index'
import { setColumns, setAlgorithm } from '../actions'
import bubleSort from "../algorithms/bubleSort";
import mergeSort from '../algorithms/mergeSort';
import quickSort from '../algorithms/quickSort';

const Header = (props) => {
    let rangeRef = React.createRef();

    useEffect(() => {
        handleSizeArray()
    },[]);

    const handleSizeArray = (e) => {
        if (!props.isRunning) {
            let cant = rangeRef.current.value;
            props.setCantOfColumns(cant);
            props.setColumns()
        }
    }

    const generateNewArray = (e)=>{
        if (!props.isRunning) {
            props.setColumns()
        }
    }

    const handleSelectAlgorithm= (e) =>{
        
        props.setAlgorithm(e.target.dataset.algo)
    }

    const handleSort = ()=>{
        if (!props.isRunning) {
            const arr = props.columns;
    
            const speed = 570 - Math.pow(arr.length, 2) > 0 ?
                570 - Math.pow(arr.length, 2) : 0;
    
            let algorithmRunnig = props.algorithm === 'bubbleSort' ? bubleSort 
                                : props.algorithm === 'mergeSort' ? mergeSort
                                : props.algorithm === 'quickSort'? quickSort
                                : null;
            
            algorithmRunnig(arr, speed)
        }
    }

    return (
        <header className="header-container">
            <div>
                <div
                    className={props.isRunning ? 'header-option option-block' : "header-option"}
                    onClick={generateNewArray}
                >
                    Generar un Nuevo Array
                </div>
            </div>
            <div className="header-input">
                <div 
                    className={props.isRunning ? 'header-option option-block' : "header-option"}
                >
                    Cambiar Tamaño del Array & Velocidad de Ordenamiento
                </div>
                <div className="header-range">
                    <input 
                        onChange={handleSizeArray}
                        ref={rangeRef}
                        type="range"
                        min="4"
                        max="150" 
                    >
                    </input>
                </div>
            </div>
            <div className="header-algorithms">
                <div 
                    data-algo="bubbleSort"
                    className={props.algorithm === "bubbleSort" ? 'header-option algorithm-selected' : "header-option"}
                    onClick={handleSelectAlgorithm}
                >
                    Bubble Sort
                </div>
                <div 
                    data-algo="quickSort"
                    className={props.algorithm === "quickSort" ? 'header-option algorithm-selected' : "header-option"}
                    onClick={handleSelectAlgorithm}
                >
                    Quick Sort
                </div>
                <div 
                    data-algo="mergeSort"
                    className={props.algorithm === "mergeSort" ? 'header-option algorithm-selected' : "header-option"}
                    onClick={handleSelectAlgorithm}
                >
                    Merge Sort
                </div>
            </div>
            <div>
                {
                    props.algorithm ?
                    (
                        <div 
                            onClick={handleSort} 
                            className={props.isRunning ? 'header-option option-block' : "header-option"}
                        >
                            Ordernar
                        </div>
                    )
                    : null
                }
            </div>
        </header>
    );
}

const stateMapToProps = (state)=>{
    return {
        algorithm: state.algorithm,
        columns: state.columns,
        isRunning: state.algorithmRunning
    }
}

export default connect(stateMapToProps, { setCantOfColumns, setColumns, setAlgorithm})(Header);
