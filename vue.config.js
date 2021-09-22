 
module.exports = {
  // 修改 src 目录 为 examples 目录
  
  pages: {
    index: {
      entry: 'example/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
      cdn: {
        css: [
          //'https://unpkg.com/element-plus/dist/index.css'
        ],
        js: [
          
          "https://cdn.jsdelivr.net/npm/vue-router@3.5.2/dist/vue-router.min.js",
          "https://cdn.jsdelivr.net/npm/vuex@3.6.2/dist/vuex.min.js",
         // "https://unpkg.com/element-plus", 
          "https://cdn.jsdelivr.net/npm/moment@2.24.0/moment.min.js" 
        ]
 
      }, 
    }
  },
  configureWebpack: {
    // 打包忽略文件
    externals: {
      //"element-plus": "ElementPlus",
      //'vue': 'vue',
      "vue-router": "VueRouter",
      vuex: "Vuex", 
      moment: "moment" 
    }
  }, 
  productionSourceMap: false,
  // 强制内联CSS
  css: { extract: true }, 
  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => { 
    //config.plugin('webpack-bundle-analyzer')
    //    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    config.module
      .rule('js')
		
      .include
        .add('/packages')
        .end() 
      .use('babel')
        .loader('babel-loader')
        .tap(options => {
          // 修改它的选项...
          return options
        })
       
  } 
 
}