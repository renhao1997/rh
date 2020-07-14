//引入TOKEN
const jwt = require('jsonwebtoken');

// console.log("11");


//生成TOKEN
let secret = 'renhao';
function create(data, expiresIn = 60 * 60 * 24 * 7) {
    // console.log(111);
    let token = jwt.sign({ data }, secret, { expiresIn });
    return token;
}

let str = create('123');
// console.log(str);

function verify(token) {
    let res;
    try {
        let result = jwt.verify(token, secret);
        // console.log(result)
        res = true;
    } catch (err) {
        res = false;
    }
    return res;
}

let ok = verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiMTIzIiwiaWF0IjoxNTk0NjIzMzM3LCJleHAiOjE1OTUyMjgxMzd9.NbvulHqTTaXL-e4FY6l1w-uidISaYKHAg8YZoK9TsVQ');
console.log(ok);

//导出
module.exports = {
    create,//创建token
    verify//校验token
}