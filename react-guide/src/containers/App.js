import React, { PureComponent } from 'react';
import cssClasses from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Aux';
import repWithClass from '../hoc/repWithClass';

export const AuthContext = React.createContext(false);

class App extends PureComponent {
  constructor(props) {
    super(props);

    console.log("Inside Constructor App.js")

    this.state = {
      person: [
        { name: "Trevor", age: 21 },
        { name: "Jonathan", age: 24 },
        { name: "Marvin", age: 26 },
      ],
      showPersons: false,
      toggleCounter: 0,
      authenticated: false,
    }
  }

  componentWillMount() {
    console.log("Inside componentWillMount App.js")
  }

  componentDidMount() {
    console.log("Inside componentDidMount App.js")
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("Inside shouldComponentUpdate App.js")
  //   return nextState.person !== this.state.person || nextState.showPersons !== this.state.showPersons;
  // }

  componentWillUpdate(nextProps, nextState) {
    console.log("Inside componentWillUpdate App.js", nextProps, nextState)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("Inside getDerivedStateFromProps App.js", nextProps, prevState)
  }

  getSnapshotBeforeUpdate() {
    console.log("Inside getSnapshotBeforeUpdate App.js")
    return null
  }

  componentDidUpdate(nextProps, nextState) {
    console.log("Inside componentDidUpdate App.js")
  }

  // state = {
  //   person: [
  //     { name: "Trevor", age: 21 },
  //     { name: "Jonathan", age: 24 },
  //     { name: "Marvin", age: 26 },
  //   ],
  //   showPersons: false,
  // }

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

  // toglePersonHandler = () => {
  //   const showing = this.state.showPersons
  //   this.setState({
  //     showPersons: !showing,
  //     toggleCounter: this.state.toggleCounter + 1
  //   })
  // }

  toglePersonHandler = () => {
    const showing = this.state.showPersons
    this.setState((prevState, props) => {
      return {
        showPersons: !showing,
        toggleCounter: this.state.toggleCounter + 1
      }
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

  loginHandler = () => {
    this.setState({ authenticated: true });
  }

  render() {

    console.log("Inside render App.js")

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
      // <WithClass classes={cssClasses.App}>
      //   <button
      //     onClick={() => {
      //       this.setState({
      //         showPersons: true
      //       })
      //     }}
      //   >Always Show</button>
      //   <Cockpit
      //     clicked={this.toglePersonHandler}
      //   />

      //   {persons}
      // </WithClass>

      <Aux >
        <button
          onClick={() => {
            this.setState({
              showPersons: true
            })
          }}
        >Always Show</button>
        <Cockpit
          clicked={this.toglePersonHandler}
          login={this.loginHandler}
        />
        <AuthContext.Provider value={this.state.authenticated}>
          {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default repWithClass(App, cssClasses.App); 
