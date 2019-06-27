import React from 'react';
import Person from './Person/Person';

const persons = (props) => props.person.map((per, index) => {
    return <Person
        key={index}
        name={per.name}
        age={per.age}
        click={() => props.click(index)}
        changed={(event) => props.changed(event, per.age)}
    />
});

export default persons;