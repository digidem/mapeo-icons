import generateMapeoIcon from "~/server/utils/generateMapeoIcon";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const image = typeof query.image === "string" ? query.image : "";
  const color = typeof query.color === "string" ? query.color : "";

  if (!image || !color) {
    throw createError({
      statusCode: 400,
      statusMessage: "Missing image or color parameter",
    });
  }

  try {
    const normalizedColor = color.startsWith("#") ? color : `#${color}`;
    const svg = await generateMapeoIcon(image, normalizedColor, {
      iconifyApiBaseUrl: process.env.ICONIFY_API_BASE_URL,
    });
    return [{ svg }];
  } catch (err: any) {
    console.error(err);
    const message = err?.message ?? "Generation failed";
    const isBadRequest =
      message.startsWith("Unsupported image host") || message === "Invalid URL";

    throw createError({
      statusCode: isBadRequest ? 400 : 500,
      statusMessage: message,
    });
  }
});
