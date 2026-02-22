/*1. JavaScript HellWorld Program 
2. Declaring the Variables in JS 
3. Understaning var, let, const keywirjds in JS
4. Understanding the DataTypes in JS
5. Logical operators and Assignments in JS
6. Loops and Conditions in JS
7. Arrays and its methods with detailed examples
8. Functions in JS
9. String and its related functions in JS
10. What are JavaScript Object ?
11. Classes and its Properties, Methods in JS
12. Inheritance in JS*/

console.log(" *********** 1. JavaScript HellWorld Program ************ ")

/*
console.log("Hello World");

*/
console.log(" *********** 2. Declaring the Variables in JS ************ ")
/*
var a = 3; var a =5console.log(a)
let b = 3let g = "Jala"
*/

console.log(" *********** 3. Understanding the DataTypes in JS ************ ")

/*
let a = 4console.log(typeof(a))
let b = 'Jala'console.log(typeof(b))
let c = 234.6console.log(typeof(c))
let d = trueconsole.log(typeof(d))
// null - if you store any null value in to any variable, then it will show that type as Null.
// undefined - if you don't assign any value to the variable, then will return as undefined
*/

console.log(" *********** 8. Understaning var, let, const keywirjds in JS ************ ")

/*
const - can't re-declared and re-assigned in entire programlet - can't re-declared but re-assign is possiblevar - variables can be re-declared and re-assigned
// var is function scoped and can be re-declared and updated/re-initializedvar a = 10;console.log(a); 
// let is block scoped and cannot be re-declared but can be updated/re-initializedlet b = 20;
//let b=25 // This will throw an error because 'b' has already been declared with 'let'b=25;
 // This is allowed because we are updating the value of 'b', not re-declaring itconsole.log(b);
// const is block scoped and cannot be re-declared or updated/re-initializedconst c = 30;c=35;
 // This will throw an error because 'c' is a constant and cannot be updated
console.log(c);

*/

console.log(" ***********   5. Logical operators and Assignments in JS   ************ ")

/*
var e = a+b 
// not definedconsole.log(e)

*/

console.log(" ***********   5. Loops and Conditions in JS   ************ ")

/*

// CONDITIONAL STATEMENTS

//IF ELSE
if(!true){    console.log("This is true");} else{    console.log("This is false");}

const { forEachChild, ProgramUpdateLevel } = require("typescript")

// WHILE - when you want to run a loop based on a condition.
let i=1;
while(i<10)
{
        console.log(i);  
      i++;
}
let j=10;
while(j>0)
{    
console.log("J value: ",j) 
   j--;   
 }
let required = true;
while(required){ 
   console.log(required)  
   required = false;
 }

console.log("******************  FOR LOOP  *******************")

// For Loop - run when you know how many times you need to run it

for( let k=1; k<10; k++){    console.log(k)}

// from 1 to 10 give me even number// from 1 to 10 give me common multiple values of 2 and 5
// print even numbers from 1 to 10console.log("************ AND condition (&&) ***************")for(j=1 ; j<=100 ; j++){
    if(j%2 == 0 && j%5 == 0)
{
        console.log(j)
    }
}
// from 1 to 10 give me common multiple values of 2 or 5

console.log("************ or (||) condition ***************")

for(j=1 ; j<=10 ; j++){
    if(j%2 == 0 || j%5 == 0)
{        
console.log(j)  
  }
}
// just print first 3 numbers only
console.log("************ print first 3 numbers only ***************")
let n=0for(j=1 ; j<=100 ; j++){
    if(j%2 == 0 && j%5 == 0)
{        n++
        console.log(j)
        if(n==3)  
          break    
}
}
*/

console.log(" ***********   6. Arrays and its methods with detailed examples   ************ ")

/*
let marks = Array(4) marks = Array(10, 34,54)  
console.log(marks.length) console.log(marks[0]) marks [0] = 99  console.log(marks[0])
  var mark = [33, 23,21,54]  mark [3] = 99  console.log(mark[3])    console.log(mark.length)
// push it will add an element at the end of the Arraymark.push(100)console.log(mark)
// pop it will delete the last value from the Arraymark.pop()console.log(mark)
// unshift it will add an element at Start of the Arraymark.unshift(100)console.log(mark)

// index of a valueconsole.log(mark.indexOf(100))
// validate the value is Present in the Array or Notconsole.log(mark.includes(100))console.log(mark.includes(10))
// slice , break the Array, it create a section of sub Array from main Array
let mr = [0,1,2,3,4,5]subsr = mr.slice(2,5)console.log(subsr)


// iterate and print all the Array value with For Looplet score = [99, 98, 97, 96, 95]
for (let i = 0; i < score.length; i++) 
{
   console.log(score[i])
    }
let j=0
while (j<score.length) {
    console.log(score[j])
    j++
    }

// Sum of an Array
sum = 0
for(i=0; i<score.length; i++){
    sum = sum+score[i]
    }
console.log(sum)

console.log(" ***********   Reduce   ************ ") 
// use when you want to accumulate or iterate the value

*/

// reduce - which is same as for loop, it iterates the value and add
/*
let jk = [99, 98, 97, 96, 95]
let v=0
let total = jk.reduce((v, jk)=>v+jk, 0)
console.log(total)

console.log(" ***********   Filter   ************ ") 

// use this when you filter method  filter from an arrya

let jp = [12,13,14,16]
for (let i= 0; i < jp.length; i++)
 { 
   if(jp[i]%2==0){
         console.log(jp[i])
     }
 }
//2nd method to find even number in simple way
let evennbr = []
let newEventNbr = jp.filter(jpk=>jpk%2==0)
console.log(newEventNbr)

*/
console.log(" ***********   Map   ************ ")

let lj = [23, 34, 45, 56]
//lj.map()

console.log(" ***********   sorting Array   ************ ")
/*
//String sortinglet legs = ["banana", "mango", "apple"]legs.sort()console.log(legs)
// reverseconsole.log(legs.reverse())
// number sortinglet nb = [3,5,1,3,8,6,4,23,11]nb.sort()console.log(nb) 
// default sort won't working 
//ascendingvar sortNb = nb.sort((a,b)=>a-b)console.log(sortNb)
var sortNb = nb.sort((a,b)=>b-a)console.log(sortNb)

*/

console.log(" ***********   Functions   ************ ")

// a block of code executed together by wrapping in a module called a Function (=>) 
/*
function add(a,b){
   return a+b
}
console.log(add(2,3))
 
   //do not have a name => anounomus function
   let sumOfInt = (c,d)=> c*d   console.log(sumOfInt(2,3))
*/
console.log(" ***********   9. String and its related functions in JS   ************ ")

/*let day = 'Tuesday 'console.log(day.length)console.log(day.trim().length)

console.log(day.slice(0,3))console.log(day)

// Tue day

let splitDay = day.split("s")console.log(splitDay[1].trim())
let date = '23'let nextDate = '27'
// parseInt will convert the String variable to Integer
let diff = parseInt(nextDate) - parseInt(date)diff.toString()console.log(diff)

*/

console.log("************ concatenate ********** ")

/*
let newDay = day+ "is funday"console.log(newDay)
*/

console.log("************ find number of occurence of any word in a string using while loop ********** ")

/*
let newDay = 'Tuesday is Funday day'let count =0let val = newDay.indexOf("day")
while(val !== -1){count++val = newDay.indexOf("day", val+1)}console.log(count)
*/
console.log("************ Object : Object is collection of Properties. ********** ")
/*
let person={    firstName:'Jala',    lastName:'Kala',    fullName: function(){        console.log(this.firstName + this.lastName)    }}
console.log(person.firstName   )console.log(person.lastName)
console.log(fullName())
console.log(person['firstName'])
person.firstName='Jalapathi'console.log(person.firstName   )
person.gender = 'Male'console.log(person)
console.log('gender' in person)
delete person.genderconsole.log(person)
console.log('gender' in person)
console.log ("************ Print all the values of the JS Object ********** ")
person.age = 35for(let sd in person){    console.log(person[sd])}
*/
console.log("************ Classes ********** ") // itroduced from ES06 engine
/*
class Person{    age = 25    // location = "Canada"
    // properties 
    get location(){        return "Canada"    }
    constructor(firstName, lastName, group){ //firsName & lastName called instance variable        this.firstName = firstName        this.lastName = lastName        this.group = group    }
    //  methods    fullName(){        console.log(this.firstName+this.lastName)        console.log(this.group)    }
}
let person = new Person("Jala", "Pathi", 3)
console.log(person.age)console.log(person.location)console.log(person.fullName())
let person1 = new Person("Kala", "giri", 4)console.log(person1.fullName())
*/

console.log("************ Inheritance in JS ********** ")
// itroduced from ES06 engine
// Inheritance - when a child class acquires the properties and methods of the parent class, then it is called Inheritance. 
//It is one of the most important concepts in Object Oriented Programming (OOP).
// Inheritance is used to achieve code reusability and method overriding. It is also used to implement the real-world relationship between objects.
// Inheritance is achieved using the extends keyword in JavaScript. 
//The child class can also have its own properties and methods, in addition to the properties and methods of the parent class. 
//The child class can also override the properties and methods of the parent class.
// The child class can also call the constructor of the parent class using the super keyword.
//  The child class can also call the methods of the parent class using the super keyword.
// Inheritance is a fundamental concept in Object Oriented Programming (OOP) and it is widely used in JavaScript to create reusable and maintainable code.

const Person = require('./JS1')
class Pet extends Person {

    get location() { return "Bluecross" }
    constructor(firstName, lastName, group) {
        //call parent class constructor
        super(firstName, lastName, group)
    }
}
let pet1 = new Pet('sam', 'Ram', 5)
console.log(pet1.fullName())
console.log(pet1.location)