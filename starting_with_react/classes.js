class Human {
    constructor(){
        this.gender = 'Male';
    }
    printGender(){
        console.log(this.gender);
    }
}

class Person extends Human{
    constructor(){
        super();
        this.name = 'Sarvesh';
        this.age = '23'
    }
    printName(){
        console.log(this.name);
    }
    printAge(){
        console.log(this.age);
    }
}

const obj1 = new Person();
obj1.printName();
obj1.printAge();
obj1.printGender();
