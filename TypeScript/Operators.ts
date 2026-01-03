// ***********************************************************
// Arithmetic operators (+, -. x, / , %, **)
// ************************************************************
/*
let a:number=20, b:number=10

console.log(a+b)
console.log(a-b)
console.log(a*b)
console.log(a/b) //division:  returns quotient value
console.log(a%b) //modular division:  returns reminder value
console.log(5**2)

// ***********************************************************
// Assignment operators or short hand operators
// ************************************************************

let a=10, b=5

// a=a+b
// console.log(a)

// a+=b
// console.log(a+=b)

console.log(a+=b) //a=a+b ->15
console.log(a-=b) //a=a-b ->10
console.log(a*=b) // a=a*b ->50
console.log(a/=b) // a=a/b ->10
console.log(a%=b) // a=a%b ->0




// ***************************************************************************************************************
// Relational operators returns only TRUE or FALSE or Boolean value  
// (>, <, >=, <=, ==, !=, === (strict equality) )
// ***************************************************************************************************************

let a=10, b=20

console.log(a>b) // false
console.log(a<b) // true
console.log(a<=b) // true
console.log(a>=b) // false
console.log(a==b) // false
console.log(a!=b) // true
console.log(a===b) // false

*/

// Difference between EQUALITY & Strict EQUALITY

let n1:any = 10     //number
let n2:any = "10" //string

console.log(n1==n2) // true (compares only values)
console.log(n1===n2) // false (compares the values & type)