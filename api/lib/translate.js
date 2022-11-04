const { translate } = require('bing-translate-api')

async function runTranslate(searchTerm, from, to) {
  console.log('searchTerm', searchTerm)
  console.log('from', from)
  console.log('to', to)
  const translation = await translate(searchTerm, from, to || 'en', true)
  console.log('translation', translation)
  return translation.translation
}

module.exports = async (searchTerm, from) => {
  return await runTranslate(searchTerm, from)
}
