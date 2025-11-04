import potrace from "potrace";
import svgToMiniDataURI from "mini-svg-data-uri";
import { optimize } from "svgo";

export default async (previewUrl, color = "orange") =>
  await new Promise((resolve, reject) => {
    potrace.trace(previewUrl, { color }, (err, svg) => {
      const result = optimize(svg, {
        multipass: true,
      });
      const optimizedSvgString = result.data;
      const optimizedSVGDataURI = svgToMiniDataURI.toSrcset(optimizedSvgString);
      if (err) reject(err);
      else resolve(optimizedSVGDataURI);
    });
  });
