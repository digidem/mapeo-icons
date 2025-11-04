import { trace } from "potrace";
import miniSvgDataUri from "mini-svg-data-uri";
import { optimize } from "svgo";

export default async function generateMapeoIcon(
  previewUrl: string,
  color = "#ffa500",
): Promise<string> {
  if (!previewUrl) {
    throw new Error("previewUrl is required");
  }

  return new Promise((resolve, reject) => {
    trace(previewUrl, { color }, (error: Error | null, svg: string) => {
      if (error) {
        reject(error);
        return;
      }

      const result = optimize(svg, { multipass: true });
      const optimizedSvgString = result.data ?? svg;
      const optimizedSvgDataUri = miniSvgDataUri.toSrcset(optimizedSvgString);

      resolve(optimizedSvgDataUri);
    });
  });
}
