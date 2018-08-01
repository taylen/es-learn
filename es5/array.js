// Array.isArray(a) 判断a是否为真正的Array
Array.isArray([]); // true
Array.isArray(new Array()); // true

// Array.prototype.indexOf(e, i) 使用“严格等”判断元素e在数组中的索引号。一个可选的搜索起点i
var arr = [1, 2, "3"];
arr.indexOf(1); // 0
arr.indexOf(1, 1);  // -1
arr.indexOf(3); // -1

// Array.prototype.lastIndexOf(e, i) 获取元素e在数组中最后出现的位置。
// 起始位置i为可选，若传入i，则表示从i位置开始向前搜索，若不传入则默认从arr.length-1开始检索
var numbers = [2, 5, 9, 2];
numbers.lastIndexOf(2);     // 3
numbers.lastIndexOf(7);     // -1
numbers.lastIndexOf(2, 3);  // 3
numbers.lastIndexOf(2, 2);  // 0
numbers.lastIndexOf(2, -2); // 0
numbers.lastIndexOf(2, -1); // 3

// Array.prototype.every(t, c) 测试数组的所有元素是否都通过了指定函数t的测试，c 是执行 t 时使用的 this 值
// 方法c 的入参包括 element index 和 array
var array1 = [1, 30, 39, 29, 10, 13];
array1.every(function isBelowThreshold(element, index, array1) {
    return element < 30;
}); // expected output: false

// Array.prototype.some(t, c) 测试数组中是否有元素通过了指定函数t的测试，c 是执行 t 时使用的 this 值
// 方法c 的入参包括 element index 和 array
var array1 = [1, 30, 39, 29, 10, 13];
array1.some(function isBelowThreshold(element, index, array1) {
    return element < 30;
}); // expected output: true

// Array.prototype.forEach(callback(element, index, array)[, thisArg]) 返回值undefined，对数组的每个元素执行一次提供的函数
var array1 = ['a', 'b', 'c'];
array1.forEach(function(element) {
  console.log(element);
});

// Array.prototype.map(callback(element, index, array) [, thisArg]) 返回值：一个新数组，每个元素都是回调函数的结果
var arr = [1, 2, 3];
var newArr = arr.map(function(elem, index, arr) {
    return elem * 2;
})
console.log(newArr);
// output [2, 4, 6]

// Array.prototype.filter() 创建一个新数组，其包含通过所提供函数实现的测试的所有元素
let arr = [1, 20, 10, 3, 5];
let newArr = arr.filter(function(e, i, a) {
    return e < 10;
});
console.log(newArr); // output [1, 3, 5]

// Array.prototype.reduce(callback(accumulator, currentValue, index, arr) [, initialValue]) 
// 对累加器和数组中的每个元素（从左到右）应用一个函数，将其减少为单个值。
let arr = [1, 2, 3, 4];
let res = arr.reduce(function(accu, val) {
    return accu += val;
});
console.log(res); // output 10

// Array.prototype.reduceRight 是Array.prototype.reduce的从右向左的版本。
var arr = ["1", "2", "3", "4"];
var res = arr.reduce(function(total, item) {
    return total + item;
});
console.log(res); // output 1234
var res = arr.reduceRight(function(total, item) {
    return total + item;
});
console.log(res); // output 4321




