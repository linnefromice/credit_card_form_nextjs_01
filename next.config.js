const path = require('path')

module.exports = {
  assetPrefix: '/credit_card_form_nextjs_01',
  sassOptions: {
    includePaths: [path.join(__dirname, 'components'), path.join(__dirname, 'pages')],
  },
}