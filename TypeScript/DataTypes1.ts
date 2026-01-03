/* 
Type/Data Type
Annotations
Type Inference

let age:number = 30

number -> data typed
:numner -> annotation , explicitly applying the datatype to the variable

Type Inference: it's is like, if you don't specify any data type to the variable , at the run time TypeScript will allocate a datatype to the variable that's called Type Inference

JS is dynamically typed programming language

let age=30 - number
age="Thirty" - string

console.log(age) - it will prin string "Thirty"

TS is Statically Type programming language

***********************************************************************************
1. Premitive Data Types (Built-in): Premitive will allow a single value at a time
***********************************************************************************
	1. Number
	2. String
	3. Boolean
	4. Null
	5. Undefined
	6. Any
	7. Union Type
	8. Void

*******************************************************************************************
2. Non-Premitive Data Types(Objects): allowed more than a single value, or group of values
*******************************************************************************************
	1. Array
	2. Class
	3. Function
	4. Interface
	5. Touple etc.,
	
*****************************************************************	
NUMBER TYPE: // represents both integers and Floating numbers 
*****************************************************************



let age:number=10
let price =25.5
let big = 232453535

console.log("age:",age)
console.log("price:",price)
console.log("big:",big)


// *********************************************************************************
// STRING TYPE: // represents single quote (' '), double quote(" "), back tick(` `)
// ************************************************************************************

let firstName:string='Jala'
let lastName:String="Kala"

// Print Hello Jala Kala

// let greeting:string = "Hello",Jala,Kala
// console.log("Hello",Jala,Kala)


//Parametization
let greeting:string=`Hello ${firstName} ${lastName}`;
console.log(greeting)


// *********************************************************************************
// BOOLEAN TYPE: // represents TRUE or FALSE 
// ************************************************************************************


let isStudent:boolean=true
let hasJob:boolean=false
let isStudent1=true

console.log(typeof isStudent)
console.log(typeof isStudent1)

// *********************************************************************************
// NULL & UNDEFINED TYPE: // special types for absence of a value 
// ************************************************************************************


let emp:null=null
emp=10; // not assignable as the dataType is Null

let unDefined:undefined=undefined // never used in typeScript


// *********************************************************************************
// ANY TYPE: // loses type script benefits 
// ************************************************************************************

let value:any= "welcome"
value=100
console.log(value)
console.log(typeof value)



// *********************************************************************************
// UNION TYPE: // combine multiple types
// ************************************************************************************

let id:number | string | boolean

id=1234
console.log(typeof id)
console.log(id)

id="abcd"
console.log(typeof id)
console.log(id)

id=true
console.log(typeof id)
console.log(id)




// *****************************************************************************
// VOID TYPE: // Used for function that don't return anything
// *****************************************************************************

function show():void // it's optional , either way this function won't return anything
{
    console.log("welcome")
}
show()

function sum1(){
    console.log("Sum: ",10+20)
}sum1()
*/

function sum(a:number, b:number){
console.log("a + b: ",a+b)
}sum(10, 20)

function sum2(a:number, b:number)
{
return(a+b)
}
let res=sum2(10, 20)

console.log("Return:" ,res)

