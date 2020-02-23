// 引入 必须同名接受,可以使用as改名
import { a as b, Person } from "./export"
console.log(b);
let p1 = new Person("田所浩二", 20);
p1.showInfo();

// 引入export时,可以不需要同名
// import P from "./export"
