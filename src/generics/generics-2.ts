class Animal {
  public legCount: number;

  constructor(legCount: number) {
    this.legCount = legCount
  }
}

class Cat extends Animal {
  constructor() {
    super(4)
  }
}
class Duck extends Animal {
  constructor() {
    super(2)
  }
}
class Vis {
 
}

export function printLegCount<T extends Animal>(animal: T) {
  console.log(`This animal has: ${animal.legCount} legs`)
}

const myCat = new Cat()
const myDuck = new Duck()
const myVis = new Vis()

printLegCount(myCat)
printLegCount(myDuck)
// printLegCount(myVis)
// Typescript give a warning to printLegCount(myVis) because  class Vis is not extends from Animal 