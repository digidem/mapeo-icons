const potrace = require('potrace')
const svgToMiniDataURI = require('mini-svg-data-uri')

module.exports = async (previewUrl, color = 'orange') => {
  const svg = await new Promise((resolve, reject) => {
    potrace.trace(previewUrl, { color }, (err, svg) => {
      if (err) reject(err)
      else resolve(svg)
    })
  })
  return svgToMiniDataURI.toSrcset(svg)
}
