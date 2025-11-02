import { g as getDefaultExportFromNamespaceIfNotNamed, a as getDefaultExportFromCjs } from '../virtual/_commonjsHelpers.mjs';
import * as potrace$1 from 'potrace';
import * as miniSvgDataUri from 'mini-svg-data-uri';
import * as svgo from 'svgo';

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

const require$$0 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(potrace$1);

const require$$1 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(miniSvgDataUri);

const require$$2 = /*@__PURE__*/getDefaultExportFromNamespaceIfNotNamed(svgo);

const potrace = require$$0;
const svgToMiniDataURI = require$$1;
const { optimize } = require$$2;
var generateMapeoIcon = async (previewUrl, color = "orange") => await new Promise((resolve, reject) => {
  potrace.trace(previewUrl, { color }, (err, svg) => {
    const result = optimize(svg, {
      multipass: true
    });
    const optimizedSvgString = result.data;
    const optimizedSVGDataURI = svgToMiniDataURI.toSrcset(optimizedSvgString);
    if (err) reject(err);
    else resolve(optimizedSVGDataURI);
  });
});

const generateMapeoIcon$1 = /*@__PURE__*/getDefaultExportFromCjs(generateMapeoIcon);

const generateMapeoIcon$2 = /*#__PURE__*/_mergeNamespaces({
  __proto__: null,
  default: generateMapeoIcon$1
}, [generateMapeoIcon]);

export { generateMapeoIcon$2 as g };
//# sourceMappingURL=generateMapeoIcon.mjs.map
