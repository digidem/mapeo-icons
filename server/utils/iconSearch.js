const OAuth = require('oauth')
const translate = require('./translate')

module.exports = async (noun, locale, pagination) => {
  if (!noun || typeof noun !== 'string') throw Error
  let translation = noun
  if (locale !== 'en') translation = await translate(noun, locale)
  translation = translation.split(' ').join('%20')
  console.log(`Downloading page ${pagination} translated: ${translation}`)
  const { NOUN_KEY, NOUN_SECRET, ICONS_TO_DOWNLOAD } = process.env
  const resLimit = parseInt(ICONS_TO_DOWNLOAD)
  const limit = typeof resLimit === 'number' ? resLimit : 3
  console.log('Number of icons to search for:', limit)
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
    new Promise((resolve, reject) => {
      oauth.get(url, null, null, (e, data) => {
        if (e) {
          console.log('Got error on fetching', url)
          console.error(e)
          reject(e)
        } else {
          const json = JSON.parse(data)
          resolve(json)
        }
      })
    })
  const search = await fetch(
    `https://api.thenounproject.com/icons/${translation}?limit=${limit}${
      pagination && `&page=${pagination}`
    }`
  )
  if (!search) return false
  return search.icons.map((icon) => icon.preview_url)
}
