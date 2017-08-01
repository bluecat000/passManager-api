'use static'
const Koa = require('koa')
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const path = require('path')
const fs = require('fs')
const app = new Koa()

const rootdir = path.resolve('.')
const contdir = path.join(rootdir, 'controllers/')

// load controllers
var files = fs.readdirSync(contdir)
var controllers = files.filter(f => {
    return f.endsWith('.js')
})
controllers.forEach(function (k, v, arr) {
    let mapping = require(contdir + k)
    for(let url in mapping){
        if (url.startsWith('GET /')) {
            let path = url.substring(4)
            router.get(path, mapping[url])
        } else if(url.startsWith('POST /')) {
            let path = url.substring(5)
            router.post(path, mapping[url])
        } else {
            console.log(`invalid url:${url}`)
        }
    }
})

// public handle
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.url}...`)
    await next()
})

app.use(bodyParser())
app.use(router.routes())

app.listen(8080)
console.log(`app is listen in 8080 port`)