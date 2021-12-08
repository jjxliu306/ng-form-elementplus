module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
  
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': ['warn', { args: 'none' }], // 未使用的变量会警告，忽略函数参数未使用警告
    'prefer-const': 'off', // 关闭强制 const
    'no-useless-call': 'off', // 关闭使用 .call 警告
    'no-useless-constructor': 'off', // 关闭空的 contructor 警告
    'handle-callback-err': 'off', // 关闭回掉 err 必须使用的警告
    'no-eval': 'off', // 关闭 eval 报错
    'prefer-rest-params': 'off', // 关闭使用 arguments 变量报错
    'no-unneeded-ternary': 'off', // 关闭三元表达式的报错
    'eslint-disable-next-line': 'off',
    'eslint-disable': 'off',
    'vue/no-mutating-props': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-useless-template-attributes': 'off'
  }
}
