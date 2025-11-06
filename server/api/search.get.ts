import iconSearch from "~/server/utils/iconSearch";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const search = typeof query.s === "string" ? query.s : "";
  const locale = typeof query.l === "string" ? query.l : "pt";
  const pageValue = typeof query.p === "string" ? query.p : "1";
  const page = Number.parseInt(pageValue, 10);

  const fallbackSearch = search?.trim().length ? search.trim() : "tree";
  const sanitizedLocale = locale || "pt";
  const pagination = Number.isNaN(page) || page < 1 ? 1 : page;
  const configuredLimit = Number.parseInt(
    String(process.env.ICONS_TO_DOWNLOAD ?? ""),
    10,
  );
  const limit = Number.isNaN(configuredLimit) ? undefined : configuredLimit;

  try {
    const data = await iconSearch(fallbackSearch, sanitizedLocale, pagination, {
      nounKey: process.env.NOUN_KEY || "",
      nounSecret: process.env.NOUN_SECRET || "",
      limit,
    });
    return data;
  } catch (err: any) {
    console.error(err);
    throw createError({
      statusCode: 500,
      statusMessage: err?.message ?? "Search failed",
    });
  }
});
