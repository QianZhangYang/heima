const pxtorem = require('postcss-pxtorem')
module.exports = {
  plugins: [
    pxtorem({
      propList: ['*'],
      rootValue: ({ file }) => (/vant/.test(file) ? 37.5 : 75)
    })
  ]
}
