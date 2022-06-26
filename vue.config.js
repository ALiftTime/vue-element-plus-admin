/*
 * @Descripttion:
 * @version:
 * @Author: BG
 * @Date: 2022-06-06 13:55:46
 * @LastEditors: BG
 * @LastEditTime: 2022-06-25 17:03:44
 */
// const IconsResolver = require('unplugin-icons/resolver')
// const Icons = require('unplugin-icons/webpack')
const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
const { setupDevMockServer } = require('./mock')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        additionalData: "@import '@/styles/variables.module.less';"
      }
    },
  },
  // pluginOptions: {
  //   windicss: {
  //   }
  // },
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [
          ElementPlusResolver(),
          // // 自动导入图标组件
          // IconsResolver({
          //   prefix: 'Icon',
          // }),
        ]
      }),
      Components({
        resolvers: [
          ElementPlusResolver(),
          // // 自动注册图标组件
          // IconsResolver({
          //   enabledCollections: ['ep'],
          // }),
        ]
      }),
      // Icons({ autoInstall: true, })
      process.env.NODE_ENV === 'production' ? new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' + ['html', 'js', 'css'].join('|') + ')$'
        ),
        threshold: 10240, // 只有大小大于该值的资源会被处理 10240
        minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
        deleteOriginalAssets: false // 删除原文件
      }) : () => {}
    ],
    resolve: {
      alias: {
        '@': resolve('src'),
        'Ajax': resolve('src/api/index.js')
      }
    }
  },
  devServer: {
    client: {
      overlay: {
        warnings: true,
        errors: true
      }
    },
    onBeforeSetupMiddleware: function(devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined')
      }
      setupDevMockServer(devServer.app)
    },
  }
})
