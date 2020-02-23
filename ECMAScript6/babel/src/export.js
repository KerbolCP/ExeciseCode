// 抛出
export let a = "hello";
export class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  showInfo() {
    console.log(this.name, this.age);
  }
}

// 当只有一个类需要抛出时
// export default
