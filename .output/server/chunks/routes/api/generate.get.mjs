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

const generate_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const image = query.image;
  const color = query.color;
  if (!image || !color) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing image or color parameter"
    });
  }
  try {
    const generateModule = await import('../../_/generateMapeoIcon.mjs').then(function (n) { return n.g; });
    const generate = generateModule.default || generateModule;
    const data = await generate(image, `#${color}`);
    return [{ svg: data }];
  } catch (err) {
    console.error(err);
    throw createError({
      statusCode: 500,
      statusMessage: "Generation failed"
    });
  }
});

export { generate_get as default };
//# sourceMappingURL=generate.get.mjs.map
