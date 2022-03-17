const translate = require('@vitalets/google-translate-api')

let tries = 0

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function runTranslate(searchTerm, locale) {
  try {
    const translation = await translate(searchTerm, { from: locale, to: 'en' })
    return translation.text
  } catch (err) {
    console.log('ERROR on translation', err)
    await sleep(1000)
    tries++
    console.log('Tries', tries)
    if (tries < 10) runTranslate()
  }
}

module.exports = async (searchTerm, locale) => {
  /* LibreTranslate, doesn't work well */
  // const { IDIOM } = process.env;
  // const res = await fetch("https://libretranslate.com/translate", {
  //   method: "POST",
  //   body: JSON.stringify({
  //     q: searchTerm,
  //     source: IDIOM,
  //     target: "en",
  //   }),
  //   headers: { "Content-Type": "application/json" },
  // });
  // const json = await res.json();

  // if (json.error) {
  //   throw Error(json.error)
  // }
  // const text = json.translatedText;
  // return text;
  return await runTranslate(searchTerm, locale)
}
