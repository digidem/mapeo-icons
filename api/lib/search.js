require('dotenv').config()
// const fs = require('fs')
const mkdirp = require('mkdirp')
const iconSearch = require('./iconSearch')
const translate = require('./translate')

const iconDir = '/tmp/pre-icons'

async function getTermIcons(noun, color) {
  // const total = {
  //   downloads: 0,
  // }
  let translateColor = color || 'black'
  if (color) {
    translateColor = await translate(color)
  }
  const translation = await translate(noun)
  console.log('Downloading translated: ', translation)
  return await iconSearch(translation, noun, translateColor, iconDir)
}

async function search(noun, color) {
  console.log('🚀 ~ file: searchIcon.js ~ line 15 ~ argument', noun, color)

  await mkdirp(iconDir)
  await mkdirp('./icons')
  const res = await getTermIcons(noun, color)
  console.log('🚀 ~ file: searchIcon.js ~ line 34 ~ search ~ res', res)
  return res
}

module.exports = {
  search,
}
