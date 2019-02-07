"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = req => {
  const {
    allLanguages,
    defaultLanguage,
    fallbackLng
  } = req.i18n.options;
  const language = req.i18n.languages.find(l => allLanguages.includes(l)) || fallbackLng || defaultLanguage;
  return language;
};

exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;