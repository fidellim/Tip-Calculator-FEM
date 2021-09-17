import React from 'react'

const Button = ({value, type, handle, index, isToggled}) => {
    return (
        <div  
        className = {type === 'tip' && isToggled ? 
                        `${type} selected` : 
                        type === 'tip' && !isToggled ? 
                        'tip' : `reset ${type}`}

        onClick={type === "tip" ? () => handle(value, index) : handle}>
           {typeof value === 'number' ? `${value}%` : 'RESET'}
        </div>
    )
}

export default Button
