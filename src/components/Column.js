import React from 'react';
import '../styles/column.css'

const Column = (props) => {
    let marginLeft = 0
    const numWidth = Math.floor((document.body.offsetWidth / (props.cant* 3)));


    marginLeft = props.cant < 5 ?
        10 : props.cant < 8 ?
            8 : props.cant < 11 ?
                6 : props.cant < 20 ?
                    4 : props.cant < 50 ?
                        3.5 : props.cant < 100 ?
                            3 : props.cant.length < 130 ?
                                2.5 : 2;

    const numFont = numWidth > 70 ?
        20 : numWidth > 60 ?
            18 : numWidth > 50 ?
                16 : numWidth > 40 ?
                    14 : numWidth > 30 ?
                        12 : numWidth > 20 ?
                            10 : 8;
    const fontSize = `${numFont}px`

   
    return (
        <div className={`column ${props.styleColumn}`} style={{ 
            height: `${props.value}vh `,
            width: `${numWidth}px`,
            marginLeft: `${marginLeft}px`,
            fontSize: fontSize
        }}> 
            {props.cant < 28 ? props.value: null}
        </div>
    );
}

export default Column;
