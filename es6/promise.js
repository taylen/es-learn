// Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。它们是两个函数，由 JavaScript 引擎提供，不用自己部署。
// resolve函数的作用是，将Promise对象的状态从“未完成”变为“成功”（即从 pending 变为 resolved），在异步操作成功时调用，并将异步操作的结果，作为参数传递出去；
// reject函数的作用是，将Promise对象的状态从“未完成”变为“失败”（即从 pending 变为 rejected），在异步操作失败时调用，并将异步操作报出的错误，作为参数传递出去。
let promise = new Promise(function(resolve, reject) {
    if ( true/* 异步操作成功 */) {
        resolve(value);
    } else {
        reject(error);
    }
});
// Promise实例生成以后，可以用then方法分别指定resolved状态和rejected状态的回调函数。
promise.then(function(value) {
    // Promise对象的状态变为resolved时调用
}, function(error) {
    // Promise对象的状态变为rejected时调用
});

// 图片加载示例
const loadImg= new Promise(function(resolved, rejected) {
    const img = new Image();
    img.onload = function() {
        resolved()
    };
    img.onerror = function(error) {
        rejected(error)
    };
    img.src = "https://www.baidu.com/img/bd_logo1.pg?qua=high";
})
loadImg.then(function() {
    console.log("load success");
}, function(error) {
    console.log("load fail. msg: ");
    console.log(error)
});

// 简单AJAX示例
let getJson = function(api) {
    return new Promise(function(resolved, rejected) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", api);
        xhr.responseType = "json";
        xhr.onreadystatechange = function() {
            if (this.readyState != 4) {
                return;
            }
            if (this.status === 200) {
                resolved(this.responseText);
            } else {
                rejected(new Error(this.statusText));
            }
        }
        xhr.send();
    });
}
getJson("https://wzq.tenpay.com/cgi-bin/userinfo.fcgi")
.then(function(json) {
    console.log(json);
}, function(error) {
    console.log(error);
});

getJson("https://wzq.tenpay.com/cgi-bin/userinfo.fcgi")
.then(function(json) {
    console.log("resolved");
})
.then(function() {
    console.log("rejected");
});

// Promise.prototype.then(function resolved() {}, function rejected() {}) 的作用是为 Promise 实例添加状态改变时的回调函数。
// then 方法的第一个回调函数是 resolved 状态的回调函数，第二个参数（可选）是rejected状态的回调函数
// then 方法返回的是一个新的 Promise实例（注意不是原来 那个Promise实例），因此可采用链式写法，即then方法后再调用一个then方法
new Promise(function(resolve, reject) {
    resolve({
        a: 1,
        b:2
    })
}).then(function resolved(json) {
    console.log(json);
    return json;
}).then(function resolved(json) {
    console.log(json);
}).then(function resolved(json) {
    console.log(json);
});
/**
 * 第一个then方法指定的回调函数，返回的是另一个Promise对象。这时，第二个then方法指定的回调函数，就会等待这个新的Promise对象状态发生变化。
 * 第三个then因为第二个回调未传递值，因此为undefined
 * output:
 *  Object {a: 1, b: 2}
 *  Object {a: 1, b: 2}
 *  undefined
 */

// Promise.prototype.catch() 是.then(null, rejection)的别名，用于指定发生错误时的回调函数
// 一般来说，不要在then方法里面定义 Reject 状态的回调函数（即then的第二个参数），总是使用catch方法。
new Promise(function(resolve, reject) {
    throw new Error("test");
    // setTimeout(reject(123), 1000);
}).then(function(json) {
    console.log("resolved");
}, function() {
    console.log("rejected");
}).catch(function(err) {
    console.log("catch");
    console.log(err);
})
// 一般总是建议，Promise 对象后面要跟catch方法，这样可以处理 Promise 内部发生的错误。
// catch方法返回的还是一个 Promise 对象，因此后面还可以接着调用then方法。

// Promise.prototype.finally() 用于指定不管promise 对象最后状态如何，都会执行的操作，ES2018引入，目前chrome还不支持。
new Promise(function(resolve, reject) {

}).then(function() {

}).catch(function() {

}).finally(function() {
    console.log("must be exec.");
});

// finally 原理：
Promise.prototype.finally = function (callback) {
    let P = this.constructor;
    return this.then(
      value  => P.resolve(callback()).then(() => value),
      reason => P.resolve(callback()).then(() => { throw reason })
    );
  };

// Promise.all(); 用于将多个Promise实例，包装成一个新的Promise实例
const p = Promise.all([p1, p2, p3]);

// p的状态由p1、p2、p3决定，分成两种情况。
// （1）只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
// （2）只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。


