"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _createConfig = _interopRequireDefault(require("./config/create-config"));

var _createI18nextClient = _interopRequireDefault(require("./create-i18next-client"));

var _hocs = require("./hocs");

var _utils = require("./utils");

var _components = require("./components");

var _reactI18next = require("react-i18next");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NextI18Next {
  constructor(userConfig) {
    this.config = (0, _createConfig.default)(userConfig);
    this.consoleMessage = _utils.consoleMessage.bind(this);
    /* Validation */

    if (this.config.otherLanguages.length <= 0) {
      throw new Error('To properly initialise a next-i18next instance you must provide one or more locale codes in config.otherLanguages.');
    }

    this.i18n = (0, _createI18nextClient.default)(this.config);
    this.appWithTranslation = _hocs.appWithTranslation.bind(this);
    this.withNamespaces = _reactI18next.withNamespaces;
    const nextI18NextConfig = {
      config: this.config,
      i18n: this.i18n
    };
    this.Trans = (0, _hocs.withConfig)(_components.Trans, nextI18NextConfig);
    this.Link = (0, _hocs.withConfig)(_components.Link, nextI18NextConfig);
  }

}

exports.default = NextI18Next;
module.exports = exports.default;
module.exports.default = exports.default;