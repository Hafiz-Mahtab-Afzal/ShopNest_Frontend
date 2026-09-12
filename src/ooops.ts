
class Animal {
  name: string
  age: number

  constructor(name: string,age: number){
        this.name = name
        this.age = age
  }

  speak(){
    console.log(`${this.name} is speaking`)
  }
}

// object

const cat = new Animal("Cat",3)
const dog = new Animal("dog",3)

cat.speak()
dog.speak()

console.log(cat.name)
console.log(dog.age)