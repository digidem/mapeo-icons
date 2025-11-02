import { g as getDefaultExportFromNamespaceIfNotNamed, a as getDefaultExportFromCjs } from '../virtual/_commonjsHelpers.mjs';
import * as oauth from 'oauth';
import * as bingTranslateApi from 'bing-translate-api';

function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== 'string' && !Array.isArray(e)) { for (const k in e) {
      if (k !== 'default' && !(k in n)) {
        const d = Object.getOwnPropertyDescriptor(e, k);
        if (d) {
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () { return e[k]; }
          });
        }
      }
    } }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: 'Module' }));
}

const require$$0$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(oauth);

const require$$0 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(bingTranslateApi);

const { translate: translate$1 } = require$$0;
async function runTranslate(searchTerm, locale) {
  const translation = await translate$1(searchTerm, locale, "en", true);
  console.log("translation", translation);
  return translation.translation;
}
var translate_1 = async (searchTerm, locale) => {
  return await runTranslate(searchTerm, locale);
};

const OAuth = require$$0$1;
const translate = translate_1;
var iconSearch = async (noun, locale, pagination) => {
  if (!noun || typeof noun !== "string") throw Error;
  let translation = noun;
  if (locale !== "en") translation = await translate(noun, locale);
  translation = translation.split(" ").join("%20");
  console.log(`Downloading page ${pagination} translated: ${translation}`);
  const { NOUN_KEY, NOUN_SECRET, ICONS_TO_DOWNLOAD } = process.env;
  const resLimit = parseInt(ICONS_TO_DOWNLOAD);
  const limit = typeof resLimit === "number" ? resLimit : 3;
  console.log("Number of icons to search for:", limit);
  const oauth = new OAuth.OAuth(
    "http://api.thenounproject.com",
    "http://api.thenounproject.com",
    NOUN_KEY,
    NOUN_SECRET,
    "1.0",
    null,
    "HMAC-SHA1"
  );
  const fetch = (url) => new Promise((resolve, reject) => {
    oauth.get(url, null, null, (e, data) => {
      if (e) {
        console.log("Got error on fetching", url);
        console.error(e);
        reject(e);
      } else {
        const json = JSON.parse(data);
        resolve(json);
      }
    });
  });
  const search = await fetch(
    `https://api.thenounproject.com/icons/${translation}?limit=${limit}${pagination && `&page=${pagination}`}`
  );
  if (!search) return false;
  return search.icons.map((icon) => icon.preview_url);
};

const iconSearch$1 = /*@__PURE__*/getDefaultExportFromCjs(iconSearch);

const iconSearch$2 = /*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  default: iconSearch$1
}, [iconSearch]);

export { iconSearch$2 as i };
//# sourceMappingURL=iconSearch.mjs.map
