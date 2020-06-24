const chalk = require('chalk')
const http = require('http')
const path = require('path')
const config = require('./config/defaultConfig')
const router = require('./helper/route')

const app = http.createServer((req, res) => {
  const filePath = path.join(config.root, req.url)
  router(req, res, filePath)
})

app.listen(config.port, config.host, () => {
  console.info(`${chalk.green(`\nReno Server 启动成功: http://${config.host}:${config.port}`)}\n`)
})
