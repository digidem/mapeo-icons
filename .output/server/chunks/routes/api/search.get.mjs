import { d as defineEventHandler, g as getQuery, c as createError } from '../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import '@intlify/utils';
import 'vue-router';
import 'node:url';

const search_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const s = query.s || "tree";
  const l = query.l || "pt";
  const p = parseInt(query.p || "1");
  try {
    const searchModule = await import('../../_/iconSearch.mjs').then(function (n) { return n.i; });
    const search = searchModule.default || searchModule;
    const data = await search(s, l, p);
    return data;
  } catch (err) {
    console.error(err);
    throw createError({
      statusCode: 500,
      statusMessage: err.data || "Search failed"
    });
  }
});

export { search_get as default };
//# sourceMappingURL=search.get.mjs.map
