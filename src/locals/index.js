// index.js
import { createI18n } from 'vue-i18n'
import zh from './zh'
import en from './en'

// vant所需要引入的
import { Locale } from 'vant'
//vant中的文件夹  需要的语言和本地的语言保持一致
import enUS from 'vant/lib/locale/lang/en-US'
import zhCN from 'vant/lib/locale/lang/zh-CN'
import zhHK from 'vant/lib/locale/lang/zh-HK'

const messages = {
  en,
  zh,
}


// 更新vant组件库本身的语言变化，支持国际化
function vantLocales(lang) {
  if (lang === 'en') {
    Locale.use(lang, enUS)
  } else if (lang === 'zhhk') {
    Locale.use(lang, zhHK)
  }
}

  const language = (navigator.language || 'en').toLocaleLowerCase() // 这是获取浏览器的语言
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: localStorage.getItem('lang') || language.split('-')[0] || 'en', // 首先从缓存里拿，没有的话就用浏览器语言，
    fallbackLocale: 'en', // 设置备用语言
    messages,
  })

  export { i18n, vantLocales } 

