import React from 'react'

const Button = ({value, type, handle, index, isToggled}) => {
    return (
        <button  
        className = {type === 'tip' && isToggled ? 
                        `${type} selected` : 
                        type === 'tip' && !isToggled ? 
                        'tip' : `reset ${type}`}

        onClick={type === "tip" ? () => handle(value, index) : handle}>
           {typeof value === 'number' ? `${value}%` : 'RESET'}
        </button>
    )
}

export default Button
