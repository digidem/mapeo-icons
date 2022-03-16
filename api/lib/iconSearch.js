const OAuth = require('oauth')

module.exports = async (searchTerm) => {
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
  return search.icons.map((icon) => icon.preview_url)
}
