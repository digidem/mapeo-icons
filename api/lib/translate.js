const translate = require('@vitalets/google-translate-api')

let tries = 0

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

async function runTranslate(searchTerm) {
  try {
    const translation = await translate(searchTerm, { from: 'pt', to: 'en' })
    return translation.text
  } catch (err) {
    console.log('ERROR on translation', err)
    await sleep(1000)
    tries++
    console.log('Tries', tries)
    if (tries < 10) runTranslate()
  }
}

module.exports = async (searchTerm) => {
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

  // console.log("🚀 ~ file: translate.js ~ line 16 ~ module.exports= ~ json", json)
  // if (json.error) {
  //   throw Error(json.error)
  // }
  // const text = json.translatedText;
  // return text;
  return await runTranslate(searchTerm)
}
