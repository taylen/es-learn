// Function.prototype.bind(thisArg[, arg1[, arg2[, ...]]]) 返回由指定的this值和初始化参数改造的原函数拷贝
// 创建一个新的函数，当被调用时，将其this关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列

var module = {
    x: 42,
    getX: function() {
        return this.x;
    }
}

var unBindGetX = module.getX;
console.log(unBindGetX()); // output undefined

var bindGetX = unBindGetX.bind(module);
console.log(bindGetX()); // output 42

// bind() 函数会创建一个新函数（称为绑定函数），新函数与被调函数（绑定函数的目标函数）具有相同的函数体（在 ECMAScript 5 规范中内置的call属性）。
// 当新函数被调用时 this 值绑定到 bind() 的第一个参数，该参数不能被重写。绑定函数被调用时，bind() 也接受预设的参数提供给原函数。
// 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

