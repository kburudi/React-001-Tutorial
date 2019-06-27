import React, { PureComponent } from 'react';
import Person from './Person/Person';

class Persons extends PureComponent {
    constructor(props) {
        super(props);
        console.log("Inside Constructor Persons.js")
        this.lastPersonRef = React.createRef();
    }

    componentWillMount() {
        console.log("Inside componentWillMount Persons.js")
    }

    componentDidMount() {
        console.log("Inside componentDidMount Persons.js")
        this.lastPersonRef.current.focus()
    }

    componentWillReceiveProps(nextProps) {
        console.log("Inside componentWillReceiveProps Persons.js")
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log("Inside shouldComponentUpdate Persons.js")
    //     return nextProps.person !== this.props.person;
    // }

    componentWillUpdate(nextProps, nextState) {
        console.log("Inside componentWillUpdate Persons.js")
    }

    componentDidUpdate(nextProps, nextState) {
        console.log("Inside componentDidUpdate Persons.js")
    }

    render() {
        console.log("Inside render Persons.js")

        return this.props.person.map((per, index) => {
            return <Person
                key={index}
                name={per.name}
                position={index}
                age={per.age}
                ref={this.lastPersonRef}
                click={() => this.props.click(index)}
                changed={(event) => this.props.changed(event, per.age)}
            />
        });
    }
}

export default Persons;