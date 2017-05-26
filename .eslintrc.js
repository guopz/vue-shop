// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 配置添加分号
    'semi':['error','always'],
    'indent': 0,
    'no-tabs': 0,
    'space-in-parens':0,
    'space-infix-ops':0,
    'no-undef':0,
    'no-mixed-spaces-and-tabs':0,
    'quotes':0,
    'quotes':0
  }
}
