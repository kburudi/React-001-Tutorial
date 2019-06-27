import React, { Component } from 'react';
import cssClasses from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';

class App extends Component {
  state = {
    person: [
      { name: "Trevor", age: 21 },
      { name: "Jonathan", age: 24 },
      { name: "Marvin", age: 26 },
    ],
    showPersons: false,
  }

  switchNameHandler = (newName) => {
    this.setState(
      {
        person: [
          { name: newName, age: 21 },
          { name: "Musila", age: 24 },
          { name: "Marvin", age: 30 },
        ]
      }
    )
  }

  toglePersonHandler = () => {
    const showing = this.state.showPersons
    this.setState({
      showPersons: !showing,
    })
  }

  nameChangedHandler = (e, age) => {
    const personIndex = this.state.person.findIndex(p => {
      return p.age === age
    });

    const person = { ...this.state.person[personIndex] };

    person.name = e.target.value;
    const persons = [...this.state.person];
    persons[personIndex] = person;

    this.setState({ person: persons })
  }

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.person]
    persons.splice(personIndex, 1);
    this.setState({ person: persons })
  }

  render() {

    let persons = null

    if (this.state.showPersons) {

      persons = <div>
        <Persons
          person={this.state.person}
          click={this.deletePersonHandler}
          changed={this.nameChangedHandler}
        />
      </div>
    }

    return (
      <div className={cssClasses.App}>
        <Cockpit
          clicked={this.toglePersonHandler}
        />
        {persons}
      </div>
    );
  }
}

export default App; 
