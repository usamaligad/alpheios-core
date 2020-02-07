const webpack = {
  common: {
    entry: './driver.js',
    externals: {
      'intl-messageformat': 'intl-messageformat',
      'uuid/v4': 'uuid/v4'
    },
    target: "node"
  },

  production: {
    output: {filename: 'alpheios-data-models.node.min.js'}
  },
  development: {
    output: {filename: 'alpheios-data-models.node.js'}
  }
}

export { webpack }