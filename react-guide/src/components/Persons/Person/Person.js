import React, { Component } from 'react';
import personStyles from './Person.css';
import Aux from '../../../hoc/Aux';
import repWithClass from '../../../hoc/repWithClass';
import PropTypes from 'prop-types';
import { AuthContext } from '../../../containers/App';


class Person extends Component {
    constructor(props) {
        super(props);
        console.log("Inside Constructor Person.js")
        this.inputElement = React.createRef();
    }

    componentWillMount() {
        console.log("Inside componentWillMount Person.js")
    }

    componentDidMount() {
        console.log("Inside componentDidMount Person.js")
        if (this.props.position === 0) {
            this.inputElement.current.focus()
        }
    }

    focus() {
        this.inputElement.current.focus()
    }

    render() {
        console.log("Inside render Person.js")
        return (
            <Aux>
                <AuthContext.Consumer>
                    {auth => auth ? <p>I'm Authenticated</p> : null}
                </AuthContext.Consumer>
                <p onClick={this.props.click}>I am {this.props.name} and I'm {this.props.age} years old!</p>
                <p>{this.props.children}</p>
                <input
                    // ref={(inp) => { this.inputElement = inp }}
                    ref={this.inputElement}
                    type="text"
                    onChange={this.props.changed}
                    value={this.props.name} />
            </Aux>
        )
    }
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func,
}

export default repWithClass(Person, personStyles.Person);