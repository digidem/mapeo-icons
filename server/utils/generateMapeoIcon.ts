import { trace } from "potrace";
import miniSvgDataUri from "mini-svg-data-uri";
import { optimize } from "svgo";

const DEFAULT_ICONIFY_API_BASE_URL = "https://api.iconify.design";
const ALLOWED_REMOTE_IMAGE_HOSTS = new Set(["static.thenounproject.com"]);

type GenerateMapeoIconOptions = {
  iconifyApiBaseUrl?: string;
};

function assertAllowedRemoteImageUrl(
  previewUrl: string,
  options: GenerateMapeoIconOptions,
): URL {
  const url = new URL(previewUrl);
  const iconifyHost = new URL(
    options.iconifyApiBaseUrl || DEFAULT_ICONIFY_API_BASE_URL,
  ).hostname;

  if (
    url.hostname === iconifyHost ||
    ALLOWED_REMOTE_IMAGE_HOSTS.has(url.hostname)
  ) {
    return url;
  }

  throw new Error(`Unsupported image host: ${url.hostname}`);
}

function isSvgUrl(url: URL): boolean {
  return url.pathname.toLowerCase().endsWith(".svg");
}

function replacePaintAttributes(svg: string, color: string): string {
  return svg.replace(
    /\b(fill|stroke)=["']([^"']+)["']/gi,
    (match, attribute: string, value: string) => {
      const normalizedValue = value.trim().toLowerCase();

      if (
        normalizedValue === "none" ||
        normalizedValue === "transparent" ||
        normalizedValue.startsWith("url(")
      ) {
        return match;
      }

      return `${attribute}="${color}"`;
    },
  );
}

function optimizeSvgDataUri(svg: string): string {
  const result = optimize(svg, { multipass: true });
  const optimizedSvgString = result.data ?? svg;

  return miniSvgDataUri.toSrcset(optimizedSvgString);
}

async function generateFromSvg(
  previewUrl: string,
  color: string,
): Promise<string> {
  const response = await fetch(previewUrl);

  if (!response.ok) {
    throw new Error(`Failed to fetch SVG icon with status ${response.status}`);
  }

  const svg = await response.text();
  const coloredSvg = replacePaintAttributes(
    svg.replace(/\bcurrentColor\b/g, color),
    color,
  );

  return optimizeSvgDataUri(coloredSvg);
}

export default async function generateMapeoIcon(
  previewUrl: string,
  color = "#ffa500",
  options: GenerateMapeoIconOptions = {},
): Promise<string> {
  if (!previewUrl) {
    throw new Error("previewUrl is required");
  }

  const parsedUrl = assertAllowedRemoteImageUrl(previewUrl, options);

  if (isSvgUrl(parsedUrl)) {
    return generateFromSvg(parsedUrl.toString(), color);
  }

  return new Promise((resolve, reject) => {
    trace(
      parsedUrl.toString(),
      { color },
      (error: Error | null, svg: string) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(optimizeSvgDataUri(svg));
      },
    );
  });
}
