const potrace = require('potrace')
const svgToMiniDataURI = require('mini-svg-data-uri')
const { optimize } = require('svgo')

module.exports = async (previewUrl, color = 'orange') =>
  await new Promise((resolve, reject) => {
    potrace.trace(previewUrl, { color }, (err, svg) => {
      const result = optimize(svg, {
        multipass: true,
      })
      const optimizedSvgString = result.data
      const optimizedSVGDataURI = svgToMiniDataURI.toSrcset(optimizedSvgString)
      if (err) reject(err)
      else resolve(optimizedSVGDataURI)
    })
  })
