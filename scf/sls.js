const Koa = require('koa')
const KoaRouter = require('koa-router')
const cors = require('koa2-cors')
const httpProxy = require('http-proxy-middleware')
const k2c = require('koa2-connect')
const zlib = require('zlib')
const crypto = require('crypto')

function handleBuffer(oriBuffer) {
  let decodeMethod = 'gunzipSync'
  let encodeMethod = 'gzipSync'
  let decodeBuffer = oriBuffer
  if (decodeMethod && encodeMethod) {
    decodeBuffer = zlib[decodeMethod](oriBuffer)
  }
  let clearStr = decodeBuffer.toString()
  let decodeStr = decrypt(clearStr.trim())
  decodeStr = unescape(decodeStr.replace(/\\u/g, '%u'))
  let regExp = /\{(.+)\}/g
  decodeStr = decodeStr.match(regExp)[0]
  return decodeStr
}

function decrypt(data, key) {
  if (key == null) {
    key = crypto.createHash('sha256').update('zG2nSeEfSHfvTCHy5LCcqtBbQehKNLXn').digest()
  } else {
    key = crypto.createHash('sha256').update(key).digest()
  }
  let decipher = crypto.createDecipheriv('aes-256-cbc', key, new Uint8Array(16))
  decipher.setAutoPadding(false)
  let decrypted = decipher.update(data, 'base64', 'utf8')
  return decrypted
}

const app = new Koa()
const router = new KoaRouter()

app.use(
  cors({
    'Access-Control-Max-Age': 86400,
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers':
      'Origin,X-Api-ID,X-Service-RateLimit,X-UsagePlan-RateLimit,X-UsagePlan-Quota,Cache-Control,Connection,Content-Disposition,Date,Keep-Alive,Pragma,Via,Accept,Accept-Charset,Accept-Encoding,Accept-Language,Authorization,Cookie,Expect,From,Host,If-Match,If-Modified-Since,If-None-Match,If-Range,If-Unmodified-Since,Range,Origin,Referer,User-Agent,X-Forwarded-For,X-Forwarded-Host,X-Forwarded-Proto,Accept-Range,Age,Content-Range,Content-Security-Policy,ETag,Expires,Last-Modified,Location,Server,Set-Cookie,Trailer,Transfer-Encoding,Vary,Allow,Content-Encoding,Content-Language,Content-Length,Content-Location,Content-Type',
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  })
)

// Routes
router.get(`/api/*`, async (ctx, next) => {
  ctx.respond = false
  await k2c(
    httpProxy({
      target: 'https://app.hbooker.com',
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/api': '' },
      onProxyReq: (proxyReq, req, res) => {
        //伪造 ua 以正常访问图片
        proxyReq.setHeader('User-Agent', 'Android  com.kuangxiangciweimao.novel  fake_server_by_scf')
      },
      onProxyRes: (proxyRes, req, res) => {
        const oriWriteHead = res.writeHead
        const oriWrite = res.write
        const oriEnd = res.end
        let body = []
        Object.assign(res, {
          writeHead: () => {},
          write: chunk => {
            body.push(chunk)
          },
          end: () => {
            body = Buffer.concat(body)
            let buffer = handleBuffer(body)
            const headers = Object.keys(proxyRes.headers).reduce((prev, curr) => {
              let value = ''
              if (curr === 'content-encoding') {
                value = 'identity'
              } else if (curr === 'content-type') {
                value = 'application/json;charset-utf-8'
              } else {
                value = proxyRes.headers[curr]
              }
              return Object.assign({}, prev, { [curr]: value })
            }, {})
            oriWriteHead.apply(res, [200, headers])
            oriWrite.call(res, buffer)
            oriEnd.call(res)
          },
        })
      },
    })
  )(ctx, next)
  await next()
})

app.use(router.allowedMethods()).use(router.routes())
// app.listen(9612);
// console.log("启动成功，监听端口：9612");
// don't forget to export!
module.exports = app
