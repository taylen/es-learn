// 允许声明函数设置参数默认值
function log(x = 1) {
    console.log(x);
}
log(); // output 1
log(false); // output false

// 箭头函数
var f = v => v;

// 等同于
var f = function(v) {
    return v;
}

// 如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分
const f = () => 5;
const f = (x = 1, y = 2) => x + y;

/**
 * 1、函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
 * 2、不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。
 * 3、不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用rest参数代替。
 * 4、不可以使用yield命令，因此箭头函数不能用作Generator函数。
 */

