// JSON.parse(string)
// JSON.stringify(json)

var res = JSON.parse('{"a":1,"b":"123"}');
console.log(res); // output Object {a: 1, b: "123"}

var obj = {
    a: 1,
    b: "123"
}
console.log(JSON.stringify(obj)); // output '{"a":1,"b":"123"}'



