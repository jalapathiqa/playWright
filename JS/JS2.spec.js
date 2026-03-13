/*Inheritance - when a child class acquires the properties and methods of the parent class, then it is called Inheritance. It is one of the most important concepts in Object Oriented Programming (OOP).Inheritance is used to achieve code reusability and method overriding. It is also used to implement the real-world relationship between objects.Inheritance is achieved using the extends keyword in JavaScript. The child class can also have its own properties and methods, in addition to the properties and methods of the parent class. The child class can also override the properties and methods of the parent class.The child class can also call the constructor of the parent class using the super keyword.The child class can also call the methods of the parent class using the super keyword.Inheritance is a fundamental concept in Object Oriented Programming (OOP) and it is widely used in JavaScript to create reusable and maintainable code.*//*const Person = require("./JS1")class Pet extends Person{

    get location()    {        return "Bluecross"    }
    constructor(firstName, lastName)    {        //call parent class constructor        super(firstName, lastName)
    }}console.log ("************ Inheritance in JS ********** ") // itroduced from ES06 engine
let pet1 = new Pet('sam', 'Ram')pet1.fullName()console.log(pet1.location)
*/console.log("************ Exercise - 1 : Calculate total expenses, highest and lowest expense from the given array of expenses using JavaScript. ********** ")

const expenses = [120.5, 45.0, 89.99, 230.75, 15.25]
const totalExpenses = expenses.reduce((sum, amount) => sum + amount, 0)
const highestExpense = Math.max(...expenses)
const lowestExpense = Math.min(...expenses)
console.log("Expenses:", expenses)
console.log("Total expenses:", totalExpenses)
console.log("Highest expense:", highestExpense)
console.log("Lowest expense:", lowestExpense)
