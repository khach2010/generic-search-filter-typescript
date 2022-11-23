interface IFooBar {
  foo: string;
  bar: string;
}

const fooBars: Array<IFooBar> = [
  {
    foo: 'fool',
    bar: 'bar'
  },
  {
    foo: 'fool two',
    bar: 'bar two'
  },
  {
    foo: 'fool three',
    bar: 'bar three'
  },
]

function sortByBar(foobars: Array<IFooBar>) {
  foobars.sort((a,b) => {
    if(a.bar > b.bar) {
      return 1
    }
    if(a.bar  < b.bar) {
      return -1
    }
    return 0
  })
}
function sortByFoo(foobars: Array<IFooBar>) {
  foobars.sort((a,b) => {
    if(a.foo > b.foo) {
      return 1
    }
    if(a.foo  < b.foo) {
      return -1
    }
    return 0
  })
}

// This generic accept data type T and sort data by it's Key 
export function sortByKey<T> (data: Array<T>, key: keyof T) {
  data.sort((a,b) => {
    if (a[key] > b[key]) {
      return 1
    }
    if (a[key] < b[key]) {
      return -1
    }
    return 0
  })
}

sortByKey<IFooBar>(fooBars, 'foo')


// sortByKey<IFooBar>(fooBars, 'cat')
// 'cat' is not in IFooBar interface so we will get warning from typescript
