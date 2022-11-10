const OAuth = require('oauth')
const { parseDocument } = require('htmlparser2')
const translate = require('./translate')
const { NOUN_KEY, NOUN_SECRET, ICONS_TO_DOWNLOAD } = process.env

const oauth = new OAuth.OAuth(
  'http://api.thenounproject.com',
  'http://api.thenounproject.com',
  NOUN_KEY,
  NOUN_SECRET,
  '1.0',
  null,
  'HMAC-SHA1'
)

const fetch = (url, locale) =>
  new Promise((resolve) => {
    oauth.get(url, null, null, async (e, data) => {
      if (e) {
        console.log('Got error on fetching', url)
        // Parse error
        const dom = parseDocument(e.data)
        const messages = dom.children
        const errorMsg = messages
          .filter((m) => m.name === 'p')
          .map((m) => m.children[0].data)[0]
        e.data = errorMsg
        if (locale && locale !== 'en') {
          console.log('locale', locale)
          const translated = await translate(errorMsg, 'en', locale)
          e.data = translated
        }
        resolve({ error: e })
      } else {
        const json = JSON.parse(data)
        resolve(json)
      }
    })
  })

module.exports = async (noun, locale, pagination) => {
  if (!noun || typeof noun !== 'string') throw Error
  translation = noun
  if (locale !== 'en') translation = await translate(noun, locale)
  translation = translation.split(' ').join('%20')
  console.log(`Downloading page ${pagination} translated: ${translation}`)
  const resLimit = parseInt(ICONS_TO_DOWNLOAD)
  const limit = typeof resLimit === 'number' ? resLimit : 3
  console.log('Number of icons to search for:', limit)
  const search = await fetch(
    `https://api.thenounproject.com/icons/${translation}?limit=${limit}${
      pagination && `&page=${pagination}`
    }`,
    locale
  )
  if (!search.error) return search.icons.map((icon) => icon.preview_url)
  else return search
}
