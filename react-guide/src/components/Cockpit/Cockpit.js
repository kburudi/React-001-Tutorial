import React from 'react';
import cssClasses from './Cockpit.css';

const cockpit = (props) => {
    const btnStyle = {
        color: "#fff",
        padding: "8px 14px",
        cursor: "pointer",
        outline: "none",
    }

    if (props.showPersons) {
        btnStyle.backgroundColor = "red"
    }

    return (
        <div>
            <h2> Crap, react  is gon be whack on sublime text</h2>

            <button
                key="btn1"
                onClick={props.clicked}
                style={btnStyle}
                className={cssClasses.greenBtn}
            >Click Me</button>
        </div>
    )
};

export default cockpit;