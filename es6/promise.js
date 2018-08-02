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