// 所有生产环境
const prodPlugin = [['@babel/plugin-proposal-pipeline-operator', { "proposal": "minimal" }]]

if (process.env.NODE_ENV === 'production') {
  // 如果是生产环境，则自动清理掉打印的日志，但保留error 与 warn
  prodPlugin.push([
    'transform-remove-console',
    {
      // 保留 console.error 与 console.warn
      exclude: ['error', 'warn']
    }
  ])
}
module.exports = {
  presets: [
    ['@babel/env'],
    // https://github.com/vuejs/vue-cli/tree/master/packages/@vue/babel-preset-app
    ['@vue/app', {
      useBuiltIns: 'entry'
    }]
  ],
  'env': {
    'development': {
      // babel-plugin-dynamic-import-node plugin only does one thing by converting all import() to require().
      // This plugin can significantly increase the speed of hot updates, when you have a large number of pages.
      'plugins': ['dynamic-import-node']
    }
  },
  plugins: [
    ...prodPlugin
  ]
}
