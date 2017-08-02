'use static'
var index = async (ctx, next) => {
    ctx.response.body = `<h1>Index<h1>`
}

var hello = async (ctx, next) => {
    var name = ctx.params.name
    ctx.response.body = `<h1>Hello, ${name}<h1>`
    // get localhost:8080/hello/koa
}

module.exports = {
    'GET /': index,
    'GET /hello/:name': hello
}