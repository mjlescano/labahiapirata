const fs = require('fs').promises
const path = require('path')

const isDirectory = (file) =>
  fs.stat(file).then((stat) => stat.isDirectory())

exports.listFolders = async (location) => {
  const items = await fs.readdir(location)

  const stats = await Promise.all(
    items.map(
      (item) => Promise.all([
        item,
        isDirectory(path.join(location, item))
      ]))
  )

  return stats.filter(([item, isDir]) => isDir).map(([item]) => item)
}

exports.isFile = async (location) => {
  const stats = await fs.stat(location)
  return stats.isFile()
}
