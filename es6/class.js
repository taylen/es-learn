// 类 - 语法糖
function Animal(name, age) {
    this.name = name || 'Tom';
    this.age = age || 12;
}
Animal.prototype.getAge = function() {
    return this.age;
};
Animal.prototype.getName = function() {
    return this.name;
}
var dog = new Animal('花虎', 7);

// 转换为class
class Car {
    constructor(name = 'TiGuan', color = 'white') {
        this.name = name;
        this.color = color;
    }
    getName() {
        return this.name;
    }
    getColor() {
        return this.color;
    }
}
// 子类必须在constructor方法中调用super方法，否则新建实例时会报错。
// 这是因为子类自己的this对象，必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再对其进行加工，加上子类自己的实例属性和方法。
// 如果不调用super方法，子类就得不到this对象。
// 报错信息：Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor
// ES6 要求，子类的构造函数必须执行一次super函数。
class ChinaCar extends Car {
    constructor(name, color) {
        super(name, color);
        this.name = name;
        this.color = color;
    }
}

