module.exports = {
  root: true,
  env: {
    node: true,
    browser: true, // 浏览器环境及全局变量
    es6: true // es6环境及全局变量
  },
  globals: {
    navigator: false // 禁用navigator全局变量
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  rules: {
    'object-curly-spacing': 0,
    'no-undef': 0,
    'vue/no-use-v-if-with-v-for': 0,
    'no-console': 0,
    'no-debugger': 0,
    'block-scoped-var': 2, // 强制把变量的使用限制在其定义的作用域范围内
    'generator-star-spacing': 0, // 强制 generator 函数中 * 号周围使用一致的空格
    'no-multi-spaces': 0, // 禁止使用多个空格
    'no-unused-vars': 0,
    'no-var': 1, //禁止使用var
    'no-useless-catch': 0
    // 'max-len':  ["error",{code:160}]
  },
  parserOptions: {
    parser: 'babel-eslint' //使用eslint解析器
  }
}
