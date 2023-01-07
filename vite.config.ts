import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
import pptv, {AcceptedPlugin} from 'postcss-px-to-viewport-8-plugin'


const load_pptv: AcceptedPlugin = pptv({
  viewportWidth: 375, // 设计稿的视口宽度
  propList: ['*'],
  unitPrecision: 2, // 转换后的精度，即小数点位数
  minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
  replace: true, // 是否转换后直接更换属性值
})
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  css: {
    postcss: {
      plugins: [load_pptv]
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  server: {
    port: 4200
  }
})
