// Object ES5 新增的特性
'use strict'

// Object.getPrototypeOf：获取对象的 __proto__
var obj = {};
Object.getPrototypeOf(obj);
console.log(Object.getPrototypeOf(obj) === obj.__proto__); // true

// Object.getOwnPropertyDescriptor：获取对象的描述
var obj = {
    k: "123"
};
Object.getOwnPropertyDescriptor(obj, "k");  // Object {value: "123", writable: true, enumerable: true, configurable: true}
Object.getOwnPropertyDescriptor(obj, "a");  // undefined

// Object.getOwnPropertyNames：获取自有属性名列表，返回值为数组，结果列表将不包含原型链上的属性
var obj = {
    k: "123",
    b: "234"
};
Object.getOwnPropertyNames(obj);    // ["k", "b"]

var arr = ['a', 'b', 'c'];
Object.getOwnPropertyNames(arr);    // ["0", "1", "2", "length"]
// - 获取不可枚举属性
var obj = Object.create({}, {
    getFoo: {
        value: function() { return this.foo; },
        enumerable: false
    }
});
obj.foo = 1;
Object.getOwnPropertyNames(obj);    // ['getFoo', 'foo']

// - 不获取原型链上的属性
function ParentClass() {}
ParentClass.prototype.inheritedMethod = function() {};

function ChildClass() {
    this.prop = 5;
    this.method = function() {}
}
ChildClass.prototype = new ParentClass();
ChildClass.prototype.prototypeMethod = function() {};

Object.getOwnPropertyNames(new ChildClass());   // ["prop", "method"]

// Object.create(proto, [propertiesObject]): 创建一个新对象，使用现有的对象来提供新创建的对象的__proto__
var obj = {
    k: "123"
};
var newObj = Object.create(obj);
newObj.t = "234";
console.log(obj)    // {k: '123'}
console.log(newObj) // {t: '234'}

// - 用Object.create类式继承
function ParentClass() {
    this.x = 1;
    this.y = 2;
}
ParentClass.prototype.print = function() {
    console.log(this.x + this.y);
}
function ChildClass() {
    ParentClass.call(this);
}
// ChildClass.prototype = new ParentClass();
ChildClass.prototype = Object.create(ParentClass.prototype);

var ins = new ChildClass();
console.log(ins instanceof ChildClass);
console.log(ins instanceof ParentClass);

// - 使用 Object.create 的 propertyObject参数
var obj = Object.create({}, {
    p: {
      value: 42, 
      writable: true,
      enumerable: true,
      configurable: true 
    } 
  });
  console.log(obj);

// Object.defineProperty(obj, prop, descriptor)
var o = {};
Object.defineProperty(o, "p", {
    value: "123",
    writable: false,
    configurable: true,
    enumerable: true
});
o.p = 21;
console.log(o.p);

// 对象里存在的属性描述符由两种主要形式：数据描述符 和 存取描述符。
// 数据描述符 是一个具有值的属性，该值可能是可写的，也可能不是可写的。
// 存取描述符是由getter-setter函数对描述的属性。描述符必须是这两种形式之一，不能同时是两者。

// 数据描述符和存取描述符 均具有以下可选键值：
// configurable：当且仅当该属性的configurable为true时，该属性的描述符（所有）才能够被改变，同时该属性也能从对象上删除。默认为false。
var o = {}; 
Object.defineProperty(o, "p", {
    configurable: false,
    value: 123
})
delete o.p; // output: false

// enumerable：当且仅当该属性的enumerable为true时，该属性才能够出现在对象的枚举属性中。默认为false。
// 解析：当enumerable为false时，for...in Object.keys 等loops无法遍历到对象的该属性。
var obj = {}; Object.defineProperty(obj, "p", {enumerable: false})
for (var key in obj)
    console.log(key); // "undefined"

// 数据描述符同时具有以下可选键值：
// value：该属性对应的值。可以是任何有效的JavaScript值（数值、对象、函数等）。默认为 undefined。
// writable：当且仅当该属性为true时，value才能被赋值运算符改变，默认false。
var obj = Object.defineProperty({}, 'p', {
    value: 1,
    writable: false,
    enumerable: false,
    configurable: false
});
Object.defineProperty(obj, 'p', {value: 2}); // TypeError: Cannot redefine property: p
Object.defineProperty(obj, 'p', {writable: true}); // TypeError: Cannot redefine property: p
Object.defineProperty(obj, 'p', {enumerable: true}); // TypeError: Cannot redefine property: p
Object.defineProperty(obj, 'p', {configurable: true}); // TypeError: Cannot redefine property: p

// 存取描述符同时具有以下可选键值：
// get: 一个给属性提供getter的方法，如果没有getter则为undefined。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入this对象
// （由于继承关系，这里的this并不一定是定义该属性的对象），默认为undefined。
// set：一个给属性提供setter的方法，如果没有setter则为undefined。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。
var o = {}, tmp = 1;
Object.defineProperty(o, "p", {
    get: function() {
        return tmp;
    },
    set: function(v) {
        tmp = v;
    }
});
console.log(o.p);

// 如果一个描述符不具有value,writable,get 和 set 任意一个关键字，那么它将被认为是一个数据描述符。
// 如果一个描述符同时有(value或writable)和(get或set)关键字，将会产生一个异常。
var o = {};
Object.defineProperty(o, "p", {
    value: "123",
    get: function() {
        return this.value + "4";
    }
});
console.log(o.p);
// Uncaught TypeError: Invalid property descriptor. Cannot both specify accessors and a value or writable attribute

// Object.defineProperties(o, props)，根据对象描述props来定义对象o，通常props包含多个属性的定义。
var obj = Object.defineProperties({}, {
    p1: { value: 1, configurable: true },
    p2: { value: 2, configurable: false }
});
delete obj.p1 // true
delete obj.p2 // false
obj.p1 // undefined
obj.p2 // 2

// Object.seal(o) 使得一个对象既无法添加新属性，也无法删除旧属性。extensible 变为false，configurable变为false
var obj = { p: 'hello' };
Object.seal(obj);
delete obj.p;
obj.p // "hello"
obj.x = 'world';
obj.x // undefined
//  Object.isSealed(o) 判断一个对象是否sealed，即是否extensible 和 configurable 都为 false

// Object.freeze(o) 将对象的每个自有自有属性writable 和 configurable 都置为false
var o = {}; Object.defineProperty(o, "p", {configurable: true, writable: true})
Object.freeze(o)
Object.defineProperty(o, "p", {configurable: true, writable: true})  // Uncaught TypeError: Cannot redefine property: p
// Object.isFrozen(o) 即是否该属性的configurable 和 writable 都为false

// Object.isExtensible(o) 判对一个对象是否可扩展。
// Object.preventExtensions(o) 将对象置为不可扩展。

// Object.keys(o) 返回对象o的所有可枚举（enumerable）属性的名称
var o = {};
Object.defineProperties(o, {
    p: {
        value: 1,
        enumerable: true
    },
    t: {
        value: 2,
        enumerable: false
    }
});
console.log(Object.keys(o)); // output: ['p']

// Object.prototype.isPrototypeOf(v) 检查对象是否是位于给定对象v的原型链上
function object1() {}
function object2() {}
object1.prototype = Object.create(object2.prototype);
var object3 = new object1();
console.log(object1.prototype.isPrototypeOf(object3)); // expected output: true
console.log(object2.prototype.isPrototypeOf(object3)); // expected output: true

// Object.prototype.propertyIsEnumerable(p) 检查一个对象上的属性p是否可枚举
var o = {};
Object.defineProperties(o, {
    p: {
        value: 1,
        enumerable: true
    },
    t: {
        value: 2,
        enumerable: false
    }
});
o.propertyIsEnumerable("p"); // true
o.propertyIsEnumerable("t"); // false


