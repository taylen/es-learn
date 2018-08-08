// ES2017 标准引入了 async/await 函数，使得异步操作变得更加方便。
// async 函数是 Generator 函数的语法糖。

const fs = require('fs');
const readFile = function(filename) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, function(error, data) {
            if (error) return reject(error);
            resolve(data);
        });
    })
}
const gen = function *(){
    const f1 = yield readFile('/etc/fstab');
    const f2 = yield readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
}

// 改写成async/await的方式后
const fs = require('fs');
const readFile = function(filename) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, function(error, data) {
            if (error) return reject(error);
            resolve(data);
        });
    })
}
const gen = async function() {
    const f1 = await readFile('/etc/fstab');
    const f2 = await readFile('/etc/shells');
    console.log(f1.toString());
    console.log(f2.toString());
}

// async 函数的实现原理，就是将 Generator 函数和 自动执行器，包装在一个函数里。
async function fn(args) {
    // ...
}
// 等同于
function fn(args) {
    return spawn(function *() {
        // ...
    });
}



