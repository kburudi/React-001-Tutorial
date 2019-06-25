import React, { Component } from 'react';
// import Radium, { StyleRoot } from 'radium'; // --- Radium ---
import cssClasses from './App.css';
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
    ],
    showPersons: false,
    newPerson: false,
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

  toglePersonHandler = (e) => {
    const showing = this.state.showPersons
    this.setState({
      showPersons: !showing,
    })
  }

  togleNewPersonHandler = (e) => {
    const showing = this.state.newPerson
    this.setState({
      newPerson: !showing,
    })

    e.target.classList.toggle(cssClasses.redBtn)
    e.target.classList.toggle(cssClasses.greenBtn)
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.person; --> bad idea
    // const persons = this.state.person.slice(); // --> better
    const persons = [...this.state.person] // --> spread operator
    persons.splice(personIndex, 1);
    this.setState({ person: persons })
  }

  render() {
    const btnStyle = {
      color: "#fff",
      padding: "8px 14px",
      cursor: "pointer",
      outline: "none",
      // --- Radium ---
      // ":hover": {
      //   backgroundColor: "lightgreen",
      //   color: "black",
      // },
    }

    const btnStyle1 = { ...btnStyle }

    let persons = null

    if (this.state.showPersons) {
      btnStyle.backgroundColor = "red"

      // --- Radium ---
      // btnStyle[":hover"] = {
      //   backgroundColor: 'orange',
      //   color: "black",
      // }


      // Old way
      /* persons = (
        <div>
          <Person
            name={this.state.person[0].name}
            age={this.state.person[0].age}
          />
          <Person
            name={this.state.person[1].name}
            age={this.state.person[1].age}
            click={this.switchNameHandler.bind(this, 'Kurland')}>
            My Hobby: Singing
            </Person>
          <Person
            name={this.state.person[2].name}
            age={this.state.person[2].age}
            changed={this.nameChangedHandler}
          />
        </div>
      ); */

      persons = <div>{
        this.state.person.map((per, index) => {
          return <Person
            key={index}
            name={per.name}
            age={per.age}
            click={() => this.deletePersonHandler(index)}
            changed={(event) => this.nameChangedHandler(event, per.age)}
          />
        })
      }
      </div>
    }

    // const redBold = ['red', 'bold'].join(' ') // "red bold"
    return (
      // <StyleRoot></StyleRoot>  //--> radium wrapper
      <div className={cssClasses.App}>
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
          key="btn1"
          onClick={(event) => this.toglePersonHandler(event)}
          style={btnStyle}
          className={cssClasses.greenBtn}
        >Click Me</button>

        <button
          key="btn2"
          onClick={(event) => this.togleNewPersonHandler(event)}
          style={btnStyle1}
          className={cssClasses.greenBtn}
        >New Person</button>

        {/* Tanery js */}
        <div>
          {this.state.newPerson ?
            < div >
              <Person
                name="New Person"
                age="10"
                click={null}
                changed={(event) => this.nameChangedHandler(event, '1')}
              />
            </div> : <p className={[cssClasses.red, cssClasses.bold].join(' ')}> New Person Hidden </p>
          }
        </div>

        {/* Conditional statements js render */}
        {persons}
      </div>
    );
    // return React.createElement('div', { className: 'App' }, React.createElement('h1',
    //   null, 'Crap, react  is gon be whack on sublime text'))
  }
}

// export default Radium(App); // --> using radium
export default App; 
