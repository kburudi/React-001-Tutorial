// Use in browser

// old way
var name = 'Max'

// Modern
let myName = 'Zonecc'

// Constants
const mySirName = 'Trevor'

// Normal functions
function printMyName(name) {
    console.log(name)
    return name
}

// Arrow functions
const printMyArrowName = (name) => {
    console.log(name)
    return name
}

const multiplyNumbers = (num1, num2) => {
    const product = num2 * num1
    return product
}

const doubleNumber = someNumber => someNumber * 2; // should work
console.log(doubleNumber(8))

// classes

class Person {
    constructor() {
        this.emoji = 'Nerd'
    }

    name = 'Zonecc'
    yearOfBirth = 1998

    printEmoji() {
        console.log(this.emoji)
    }

    getAge(yearOfBirth) {
        const age = 2019 - this.yearOfBirth
        console.log(age)
        return age
    }
}

const me = new Person();
me.printEmoji();
me.getAge();

// Ingeritance
class Programmer extends Person {
    constructor() {
        super();
        this.hobby = "Coding"
    }

    printNameAndHoby() {
        console.log("I am "+ this.name + " and I love " + this.hobby)
    }
}
myHobby = new Programmer();
myHobby.printNameAndHoby()


// next gen js classes
class NewPerson {
    emoji = ":smile:"
    name = "Happy Me"

    printEmoji = () => {
        console.log(this.emoji)
    }
}

class MyAge extends NewPerson{
    printHappyMeSmile = () => console.log(this.name + " " + this.emoji)
}

const me2 = new NewPerson();
me2.printEmoji()
const meSmiling = new MyAge()
meSmiling.printHappyMeSmile()

// spread operator
const oldArray = [1,2,3]
const newArray = [...oldArray, 4, 5, 6]
console.log(newArray)

const oldObject = {
    firstName : "Trevor",
    lastName : "Burudi",
}

const newObject = {
    ...oldObject,
    sirName : "Kurland"
}

console.log(newObject)


// Rest Operator
const filter_args = (...args) => args.filter(el => el === 1);
console.log(filter_args(1,2,3))

// destructuring
// array
const [a,b] = ["A", "B"]
console.log(a)
console.log(b)

// objects
const {nickName, age} = {nickName: "Zonecc", age: 21}

console.log(nickName)
console.log(age)

// double numbers
const numbers = [1, 2, 3]
const doubleNumbers =numbers.map((num) => {
    return num * 2
})

console.log(numbers, doubleNumbers)