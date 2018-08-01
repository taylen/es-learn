// let 命令，用来声明变量，用法类似于var，但是所声明的变量，只能在let命令所在的代码块内有效
{
    let a = 1;
}
console.log(a); // Uncaught ReferenceError: a is not defined

let arr = [1, 2, 3]
for (let i = 0, len = arr.length - 1; i < len; i++) {
    // do sth
}
console.log(i); // Uncaught ReferenceError: i is not defined

// 变量提升：var 的情况
console.log(foo); // 输出undefined
var foo = 2;

// 变量提升：let 的情况
console.log(bar); // Uncaught ReferenceError: bar is not defined
let bar = 2;

// 暂时性死区 - 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
// ES6 明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
// 总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。
var tmp = 123;
if (true) {
  tmp = 'abc'; // Uncaught ReferenceError: tmp is not defined
  let tmp;
}

// 不允许重复声明 - let不允许在相同作用域内，重复声明同一个变量。
function func() {
    let a = 10;
    let a = 1;
}
func() // output Uncaught SyntaxError: Identifier 'a' has already been declared

function func(arg) {
    let arg; // 报错
}
function func(arg) {
    let arg; // 不报错
}

// const声明一个只读的常量。一旦声明，常量的值就不能改变。
// const的作用域与let命令相同：只在声明所在的块级作用域内有效。
// const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用.
const PI = 3.1415;
PI // 3.1415
PI = 3; // Uncaught TypeError: Assignment to constant variable.

// 声明变量的六种方法
// ES5 - var function
// ES6 - let const import class

// var命令和function命令声明的全局变量，依旧是顶层对象的属性；
// 另一方面规定，let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。
// 也就是说，从 ES6 开始，全局变量将逐步与顶层对象的属性脱钩。
var a = 1;
window.a // 1

let b = 1;
window.b // undefined

// ES5 的顶层对象，本身也是一个问题，因为它在各种实现里面是不统一的。
// 浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
// 浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
// Node 里面，顶层对象是global，但其他环境都不支持。

// 综上所述，很难找到一种方法，可以在所有情况下，都取到顶层对象。下面是两种勉强可以使用的方法。
// 方法一
(typeof window !== 'undefined'
   ? window
   : (typeof process === 'object' &&
      typeof require === 'function' &&
      typeof global === 'object')
     ? global
     : this);
// 方法二
var getGlobal = function () {
  if (typeof self !== 'undefined') { return self; }
  if (typeof window !== 'undefined') { return window; }
  if (typeof global !== 'undefined') { return global; }
  throw new Error('unable to locate global object');
};
// 现在有一个提案，在语言标准的层面，引入global作为顶层对象。也就是说，在所有环境下，global都是存在的，都可以从它拿到顶层对象。


