import React from 'react';
// import Radium from 'radium'; // --- Radium ---
import personStyles from './Person.css';

const person = (props) => {
    // --- Radium ---
    // const divStyle = {
    //     '@media (min-width: 500px)': {
    //         width: "400px",
    //     }
    // }

    return (
        <div className={personStyles.Person}
        // style={divStyle} // --- Radium ---
        >
            <p onClick={props.click}>I am {props.name} and I'm {props.age} years old!</p>
            <p>{props.children}</p>
            <input type="text" onChange={props.changed} value={props.name} />
        </div>
    )
}

// export default Radium(person); // --- Radium ---
export default person;