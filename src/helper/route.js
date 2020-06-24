const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')
const promisify = require('util').promisify
const config = require('../config/defaultConfig')
const mime = require('../helper/mime')
const compress = require('../helper/compress')
const range = require('../helper/range')

const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)

const tplPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tplPath)
const template = handlebars.compile(source.toString())

async function handleDir (res, filePath) {
  try {
    const files = await readdir(filePath)
    const dir = path.relative(config.root, filePath)

    const data = {
      title: path.basename(filePath),
      dir: dir ? `/${dir}` : '',
      files
    }
    res.end(template(data))
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = async function (req, res, filePath) {
  try {
    const stats = await stat(filePath)
    const contentTypes = mime(filePath)

    if (stats.isFile()) {
      res.setHeader('Content-Type', contentTypes)
      let fileReadStream
      const {
        code,
        start,
        end
      } = range(stats.size, req, res)
      if (code === 200) {
        res.statusCode = 200
        fs.createReadStream(filePath)
      } else {
        res.statusCode = 216 // 216说明只是部分内容
        fs.createReadStream(filePath, {
          start,
          end
        })
      }

      if (filePath.match(config.compress)) {
        fileReadStream = compress(fileReadStream, req, res)
      }
      fileReadStream.pipe(res)
    } else if (stats.isDirectory()) {
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html')
      handleDir(res, filePath)
    }
  } catch (error) {
    res.statusCode = 404
    res.end(`${filePath} is not a directory or file.`)
  }
}
