const Koa = require("koa")
const KoaRouter = require("koa-router")
const KoaBody = require("koa-body")
KoaBody({ multipart: true })
const app = new Koa()
const router = new KoaRouter()

require("./calc")(router)
app
  .use(KoaBody())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(11041, () => console.log(`服务器启动成功，mock数据端口号：11041`))
