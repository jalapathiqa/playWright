var age;
age=30
// console.log(age)

// function varScope(){

//     if(true){
//         var msg="block scope"
//         console.log(msg)
//     }
//     var msg1="functional scope"

//     console.log(msg1)
//     console.log(msg)
// }
// varScope();


// function letScope(){

//     if(true){
//         let msg="block scope"
//         console.log(msg)
//     }
//     console.log(msg) 

// }
// letScope();

// function scopeConst(){

//     if(true){
//         var n1=10
//         let n2=20
//         const n3=30

//         console.log(n1)
//         console.log(n2)
//         console.log(n3)

//     }
//     console.log(n1)
//         console.log(n2)
//         console.log(n3)
// }
// scopeConst()


//declaration / initialization

/*example1: Var

var x;
console.log(x)
x=10
console.log(x)
*/

//example2: Let

/*let x;
console.log(x)
x=20
console.log(x)
*/

//example3: Const

/*
const x;
console.log(x)
const y=20
console.log(y)

*/

//RE-DECLAARATION:

// var - allows the Re-declaration
// let & const = not allows the Re-declaration

var city = "surrey"
var city = "fleetwood"
// console.log(city)

let area = "area"
// let area = "area1"

const load = "100"
// const load = "200"