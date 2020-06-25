const chalk = require('chalk')
const http = require('http')
const path = require('path')
const conf = require('./config/defaultConfig')
const router = require('./helper/route')
// const openUrl = require('./helper/openUrl')

class Server {
  constructor (config) {
    this.conf = Object.assign({}, conf, config)
  }

  start () {
    const app = http.createServer((req, res) => {
      const filePath = path.join(this.conf.root, req.url)
      router(req, res, filePath, this.conf)
    })

    app.listen(this.conf.port, this.conf.host, () => {
      const addr = `http://${this.conf.host}:${this.conf.port}`
      console.info(`${chalk.green(`\nReno Server 启动成功: ${addr}`)}\n`)
      // openUrl(addr)
    })
  }
}

module.exports = Server
