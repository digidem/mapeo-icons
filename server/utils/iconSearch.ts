import { OAuth } from "oauth";
import translateTerm from "./translate";

type IconSearchApiResponse = {
  icons?: Array<{ preview_url: string | null | undefined }>;
};

type IconifySearchApiResponse = {
  icons?: string[];
};

const API_BASE_URL = "https://api.thenounproject.com/icons";
const DEFAULT_PROVIDER_ORDER = ["iconify", "noun"] as const;
const DEFAULT_ICONIFY_API_BASE_URL = "https://api.iconify.design";
const DEFAULT_ICONIFY_PREFIXES = [
  "maki",
  "temaki",
  "material-symbols",
  "mdi",
  "tabler",
  "ph",
  "lucide",
  "heroicons",
];

type IconProviderName = (typeof DEFAULT_PROVIDER_ORDER)[number];

export interface IconSearchOptions {
  nounKey: string;
  nounSecret: string;
  providerOrder?: string;
  iconifyApiBaseUrl?: string;
  iconifyPrefixes?: string;
  limit?: number;
}

function resolveLimit(limit?: number): number {
  if (typeof limit === "number" && Number.isFinite(limit) && limit > 0) {
    return Math.floor(limit);
  }

  return 10;
}

function resolveIconifyLimit(limit?: number): number {
  const resolvedLimit = resolveLimit(limit);
  return Math.min(Math.max(resolvedLimit, 32), 999);
}

function resolveProviderOrder(providerOrder?: string): IconProviderName[] {
  const providers = (providerOrder || DEFAULT_PROVIDER_ORDER.join(","))
    .split(",")
    .map((provider) => provider.trim().toLowerCase())
    .filter((provider): provider is IconProviderName =>
      DEFAULT_PROVIDER_ORDER.includes(provider as IconProviderName),
    );

  return providers.length ? providers : [...DEFAULT_PROVIDER_ORDER];
}

function resolveIconifyPrefixes(iconifyPrefixes?: string): string[] {
  const prefixes = (iconifyPrefixes || DEFAULT_ICONIFY_PREFIXES.join(","))
    .split(",")
    .map((prefix) => prefix.trim())
    .filter(Boolean);

  return prefixes.length ? prefixes : DEFAULT_ICONIFY_PREFIXES;
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

async function searchIconify(
  searchableTerm: string,
  pagination: number,
  options: IconSearchOptions,
): Promise<string[]> {
  const limit = resolveIconifyLimit(options.limit);
  const requestUrl = new URL(
    "/search",
    options.iconifyApiBaseUrl || DEFAULT_ICONIFY_API_BASE_URL,
  );
  requestUrl.searchParams.set("query", searchableTerm);
  requestUrl.searchParams.set(
    "prefixes",
    resolveIconifyPrefixes(options.iconifyPrefixes).join(","),
  );
  requestUrl.searchParams.set("limit", String(limit));
  requestUrl.searchParams.set("start", String((pagination - 1) * limit));

  const response = await fetch(requestUrl);

  if (!response.ok) {
    throw new Error(`Iconify search failed with status ${response.status}`);
  }

  const data = (await response.json()) as IconifySearchApiResponse;
  const icons = Array.isArray(data.icons) ? data.icons : [];
  const iconifyBaseUrl =
    options.iconifyApiBaseUrl || DEFAULT_ICONIFY_API_BASE_URL;

  return icons
    .map((icon) => {
      const [prefix, name] = icon.split(":");

      if (!prefix || !name) {
        return "";
      }

      return new URL(
        `/${encodeURIComponent(prefix)}/${encodeURIComponent(name)}.svg`,
        iconifyBaseUrl,
      ).toString();
    })
    .filter((url) => url.length > 0);
}

async function searchNounProject(
  searchableTerm: string,
  pagination: number,
  options: IconSearchOptions,
): Promise<string[]> {
  if (!options.nounKey || !options.nounSecret) {
    throw new Error("The Noun Project credentials are not configured");
  }

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

  const errors: string[] = [];
  let attemptedProviders = 0;

  for (const provider of resolveProviderOrder(options.providerOrder)) {
    try {
      attemptedProviders += 1;
      const results =
        provider === "iconify"
          ? await searchIconify(searchableTerm, pagination, options)
          : await searchNounProject(searchableTerm, pagination, options);

      if (results.length > 0) {
        return results;
      }
    } catch (error: any) {
      const message = error?.message ?? String(error);
      console.error(`${provider} icon search failed:`, message);
      errors.push(`${provider}: ${message}`);
    }
  }

  if (attemptedProviders > 0 && errors.length === attemptedProviders) {
    throw new Error(
      `Icon search failed for all providers (${errors.join("; ")})`,
    );
  }

  return [];
}
