/* eslint-disable camelcase */
const https = require('https')
const fs = require('fs')
const path = require('path')
const OAuth = require('oauth')
const potrace = require('potrace')
const mkdirp = require('mkdirp')

module.exports = async (searchTerm, originalTerm, color, tmpIconDir) => {
  const iconDir = path.join(tmpIconDir, originalTerm)
  try {
    const iconDirContent = fs.readdirSync(iconDir)
    if (iconDirContent.length === 1) return false
  } catch (err) {
    console.log('Got error reading', iconDir)
  }
  mkdirp(iconDir)
  if (!searchTerm || typeof searchTerm !== 'string') throw Error
  const { NOUN_KEY, NOUN_SECRET, ICONS_TO_DOWNLOAD } = process.env
  const resLimit = parseInt(ICONS_TO_DOWNLOAD)
  const limit = typeof resLimit === 'number' ? resLimit : 3
  console.log('Number of icons to download:', limit)
  const oauth = new OAuth.OAuth(
    'http://api.thenounproject.com',
    'http://api.thenounproject.com',
    NOUN_KEY,
    NOUN_SECRET,
    '1.0',
    null,
    'HMAC-SHA1'
  )
  const fetch = (url) =>
    new Promise((resolve) => {
      oauth.get(url, null, null, (e, data) => {
        if (e) {
          console.log('Got error on fetching', url)
          resolve(false)
        } else {
          const json = JSON.parse(data)
          resolve(json)
        }
      })
    })
  const search = await fetch(
    `https://api.thenounproject.com/icons/${searchTerm}?limit=${limit}`
  )
  if (!search) return false
  const final = {
    term: searchTerm,
    total: 0,
    converted: 0,
  }
  for await (const item of search.icons) {
    const { id, icon_url, preview_url, term_slug } = item
    console.log(
      '🚀 ~ file: iconDownloader.js ~ line 54 ~ forawait ~ preview_url',
      preview_url
    )
    const toSave = path.join(iconDir, `${term_slug}-${id}.svg`)
    if (icon_url) {
      console.log('Saving svg', term_slug, icon_url)
      final.total++
      const file = fs.createWriteStream(toSave)
      https.get(icon_url, (response) => {
        response.pipe(file)
      })
    } else {
      const svg = await new Promise((resolve, reject) => {
        potrace.trace(preview_url, { color }, (err, svg) => {
          if (err) reject(err)
          else resolve(svg)
        })
      })
      console.log(`Converted ${preview_url} to ${toSave}`)
      fs.writeFileSync(toSave, svg)
      final.total++
      final.converted++
    }
  }
  return final
}
