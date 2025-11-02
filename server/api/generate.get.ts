export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const image = query.image as string
  const color = query.color as string

  if (!image || !color) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing image or color parameter',
    })
  }

  try {
    // Dynamic import for CommonJS module
    const generateModule = await import('~/server/utils/generateMapeoIcon.js')
    const generate = generateModule.default || generateModule
    const data = await generate(image, `#${color}`)
    return [{ svg: data }]
  } catch (err: any) {
    console.error(err)
    throw createError({
      statusCode: 500,
      statusMessage: 'Generation failed',
    })
  }
})
