var login = async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa"></p>
            <p>Password: <input name="password" type="password"></p>
            <p><input type="submit" value="Submit"></p>
        </form>`
}

var signin = async (ctx, next) => {
    var name = ctx.request.body.name || ''
        password = ctx.request.body.password || ''
    console.log(`sign in width user:${name},pass:${password}`)
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome,${name}<h1>`
    } else {
        ctx.response.body = '<h1>login fail<h1>'
    }
}

module.exports = {
    'GET /login': login,
    'POST /signin': signin
}