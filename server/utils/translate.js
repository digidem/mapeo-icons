import { translate } from "bing-translate-api";

async function runTranslate(searchTerm, locale) {
  const translation = await translate(searchTerm, locale, "en", true);
  console.log("translation", translation);
  return translation.translation;
}

export default async (searchTerm, locale) => {
  return await runTranslate(searchTerm, locale);
};
