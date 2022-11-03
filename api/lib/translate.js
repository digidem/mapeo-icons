const { translate } = require('bing-translate-api')

async function runTranslate(searchTerm, locale) {
  const translation = await translate(searchTerm, locale, 'en', true)
  console.log('translation', translation)
  return translation.translation
}

module.exports = async (searchTerm, locale) => {
  return await runTranslate(searchTerm, locale)
}
