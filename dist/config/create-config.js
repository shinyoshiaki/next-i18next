"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defaultConfig = _interopRequireDefault(require("./default-config"));

var _detectNode = _interopRequireDefault(require("detect-node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = userConfig => {
  let combinedConfig = { ..._defaultConfig.default,
    ...userConfig
  };

  if (!userConfig.fallbackLng) {
    combinedConfig.fallbackLng = process.env.NODE_ENV === 'production' ? combinedConfig.defaultLanguage : null;
  }

  combinedConfig.allLanguages = combinedConfig.otherLanguages.concat([combinedConfig.defaultLanguage]);
  combinedConfig.ns = [combinedConfig.defaultNS];

  if (_detectNode.default && !process.browser) {
    const fs = eval("require('fs')");

    const path = require('path');

    const getAllNamespaces = p => fs.readdirSync(p).map(file => file.replace('.json', ''));

    const {
      allLanguages,
      defaultLanguage,
      localePath,
      localeStructure
    } = combinedConfig;

    const dir = () => process.env.NODE_ENV === 'production' ? '/' : process.cwd();

    combinedConfig = { ...combinedConfig,
      preload: allLanguages,
      ns: getAllNamespaces(path.join(dir(), `${localePath}/${defaultLanguage}`)),
      backend: {
        loadPath: path.join(dir(), `${localePath}/${localeStructure}.json`),
        addPath: path.join(dir(), `${localePath}/${localeStructure}.missing.json`)
      }
    };
  }

  return combinedConfig;
};

exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;