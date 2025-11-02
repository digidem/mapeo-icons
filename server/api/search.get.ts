export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const s = (query.s as string) || "tree";
  const l = (query.l as string) || "pt";
  const p = parseInt((query.p as string) || "1");

  try {
    // Dynamic import for CommonJS module
    const searchModule = await import("~/server/utils/iconSearch.js");
    const search = searchModule.default || searchModule;
    const data = await search(s, l, p);
    return data;
  } catch (err: any) {
    console.error(err);
    throw createError({
      statusCode: 500,
      statusMessage: err.data || "Search failed",
    });
  }
});
