let a;
a = "hello";
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  showInfo() {
    console.log(this.name);
  }
}

let foo = () => {
  console.log("hello");
}
// ES6 转换为 ES5