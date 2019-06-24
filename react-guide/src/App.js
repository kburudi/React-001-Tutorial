import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person'

// function App() {
//   return (
//     <div className="App">
//       <h2> Crap, react  is gon be whack on sublime text</h2>
//     </div>
//   );
// }

// compare JSX to react
class App extends Component {
  state = {
    person: [
      { name: "Trevor", age: 21 },
      { name: "Jonathan", age: 24 },
      { name: "Marvin", age: 26 },
    ]
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

  nameChangedHandler = (e) => {
    this.setState(
      {
        person: [
          { name: "Zonecc", age: 21 },
          { name: "Musila", age: 24 },
          { name: e.target.value, age: 30 },
        ]
      }
    )
  }

  render() {
    const btnStyle = {
      color: "#fff",
      backgroundColor: "#000",
      padding: "8px 14px",
      cursor: "pointer",
      outline: "none",
    }

    return (
      <div className="App">
        <h2> Crap, react  is gon be whack on sublime text</h2>
        {/*
        Stateless
        ----

        <Person name="Trevor" age="21" />
        <Person name="Jonathan" age="24">
          My Hobby: Singing
        </Person>
        <Person name="Marvin" age="26" /> */}

        {/* Using the arrow function */}
        <button
          onClick={() => this.switchNameHandler('Zonecc!!')}
          style={btnStyle}
          className="btn"
        >Click Me</button>
        <Person name={this.state.person[0].name} age={this.state.person[0].age} />
        {/* Using Bind */}
        <Person
          name={this.state.person[1].name}
          age={this.state.person[1].age}
          click={this.switchNameHandler.bind(this, 'Kurland')}
        >
          My Hobby: Singing
        </Person>
        <Person
          name={this.state.person[2].name}
          age={this.state.person[2].age}
          changed={this.nameChangedHandler}
        />
      </div>
    );
    // return React.createElement('div', { className: 'App' }, React.createElement('h1',
    //   null, 'Crap, react  is gon be whack on sublime text'))
  }
}

export default App;
