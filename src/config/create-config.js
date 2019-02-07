import defaultConfig from 'config/default-config'
import isNode from 'detect-node'

export default (userConfig) => {

  let combinedConfig = {
    ...defaultConfig,
    ...userConfig,
  }

  if (!userConfig.fallbackLng) {
    combinedConfig.fallbackLng = process.env.NODE_ENV === 'production'
      ? combinedConfig.defaultLanguage
      : null
  }

  combinedConfig.allLanguages = combinedConfig.otherLanguages
    .concat([combinedConfig.defaultLanguage])
  combinedConfig.ns = [combinedConfig.defaultNS]

  if (isNode && !process.browser) {
    const fs = eval("require('fs')")
    const path = require('path')

    const getAllNamespaces = p => fs.readdirSync(p).map(file => file.replace('.json', ''))
    const {
      allLanguages, defaultLanguage, localePath, localeStructure,
    } = combinedConfig

    const dir = () => `/`

    combinedConfig = {
      ...combinedConfig,
      preload: allLanguages,
      ns: getAllNamespaces(path.join(dir(), `${localePath}/${defaultLanguage}`)),
      backend: {
        loadPath: path.join(dir(), `${localePath}/${localeStructure}.json`),
        addPath: path.join(dir(), `${localePath}/${localeStructure}.missing.json`),
      },
    }
  }

  return combinedConfig

}
