const fs = require('fs')
const path = require('path')
// const slugify = require("@sindresorhus/slugify");

module.exports = (name) => {
  const slugTerm = name.charAt(0).toUpperCase() + name.slice(1)
  const toSave = path.join(process.cwd(), `presets/${slugTerm}.json`)
  const toSaveIcon100 = path.join(process.cwd(), `icons/${slugTerm}-100px.svg`)
  const toSaveIcon24 = path.join(process.cwd(), `icons/${slugTerm}-24px.svg`)
  // const terms = []
  fs.copyFileSync(
    path.join(process.cwd(), 'default-icons/plant-100px.svg'),
    toSaveIcon100
  )
  fs.copyFileSync(
    path.join(process.cwd(), 'default-icons/plant-24px.svg'),
    toSaveIcon24
  )
  const result = {
    name: name.charAt(0).toUpperCase() + name.slice(1),
    icon: slugTerm,
  }

  fs.writeFileSync(toSave, JSON.stringify(result))
}
