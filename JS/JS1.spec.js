   module.exports = class Person{
    age = 25
    // location = "Canada"

    // properties 

    get location()
    {
        return "Canada"
    }

    constructor(firstName, lastName){ //firsName & lastName called instance variable
        this.firstName = firstName
        this.lastName = lastName
    }

    //  methods
    fullName(){
        console.log(this.firstName+this.lastName)
    }

}

// let person = new Person("Jala", "Pathi", 3)

// console.log(person.age)
// console.log(person.location)
// console.log(person.fullName())

// let person1 = new Person("Kala", "giri", 4)
// console.log(person1.fullName())