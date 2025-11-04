import { OAuth } from "oauth";
import translateTerm from "./translate";

type IconSearchApiResponse = {
  icons?: Array<{ preview_url: string | null | undefined }>;
};

const API_BASE_URL = "https://api.thenounproject.com/icons";

export interface IconSearchOptions {
  nounKey: string;
  nounSecret: string;
  limit?: number;
}

function resolveLimit(limit?: number): number {
  if (typeof limit === "number" && Number.isFinite(limit) && limit > 0) {
    return Math.floor(limit);
  }

  return 10;
}

function createOAuthClient(options: IconSearchOptions): OAuth {
  const { nounKey, nounSecret } = options;

  if (!nounKey || !nounSecret) {
    throw new Error("The Noun Project credentials are not configured");
  }

  return new OAuth(
    "http://api.thenounproject.com",
    "http://api.thenounproject.com",
    nounKey,
    nounSecret,
    "1.0",
    null,
    "HMAC-SHA1",
  );
}

async function fetchFromNounProject(
  url: string,
  options: IconSearchOptions,
): Promise<IconSearchApiResponse> {
  const client = createOAuthClient(options);

  return new Promise((resolve, reject) => {
    client.get(url, null, null, (error, data) => {
      if (error) {
        reject(error);
        return;
      }

      try {
        resolve(JSON.parse(data as unknown as string));
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

export default async function iconSearch(
  noun: string,
  locale: string,
  pagination = 1,
  options: IconSearchOptions,
): Promise<string[]> {
  if (!noun || typeof noun !== "string" || noun.trim().length === 0) {
    throw new Error("Search term is required");
  }

  const trimmedNoun = noun.trim();
  const targetLocale = locale || "en";

  const searchableTerm =
    targetLocale === "en"
      ? trimmedNoun
      : await translateTerm(trimmedNoun, targetLocale);

  const limit = resolveLimit(options.limit);
  const encodedTerm = encodeURIComponent(searchableTerm);
  const pageSuffix = pagination > 1 ? `&page=${pagination}` : "";
  const requestUrl = `${API_BASE_URL}/${encodedTerm}?limit=${limit}${pageSuffix}`;

  const response = await fetchFromNounProject(requestUrl, options);
  const icons = Array.isArray(response.icons) ? response.icons : [];

  return icons
    .map((icon) => icon?.preview_url)
    .filter((url): url is string => typeof url === "string" && url.length > 0);
}
