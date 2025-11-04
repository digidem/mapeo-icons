import { translate as bingTranslate } from "bing-translate-api";

export default async function translateTerm(
  searchTerm: string,
  locale: string,
): Promise<string> {
  if (!searchTerm) {
    throw new Error("search term is required");
  }

  if (!locale) {
    return searchTerm;
  }

  if (locale === "en") {
    return searchTerm;
  }

  const result = await bingTranslate(searchTerm, locale, "en", true);
  return result.translation ?? searchTerm;
}
