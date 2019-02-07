"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const DEFAULT_LANGUAGE = 'en';
const OTHER_LANGUAGES = [];
const DEFAULT_NAMESPACE = 'common';
const LOCALE_PATH = 'static/locales';
const LOCALE_STRUCTURE = '{{lng}}/{{ns}}';
const LOCALE_SUBPATHS = false;
var _default = {
  defaultLanguage: DEFAULT_LANGUAGE,
  otherLanguages: OTHER_LANGUAGES,
  load: 'languageOnly',
  localePath: LOCALE_PATH,
  localeStructure: LOCALE_STRUCTURE,
  localeSubpaths: LOCALE_SUBPATHS,
  ns: [DEFAULT_NAMESPACE],
  use: [],
  defaultNS: DEFAULT_NAMESPACE,
  interpolation: {
    escapeValue: false,
    formatSeparator: ',',
    format: (value, format) => format === 'uppercase' ? value.toUpperCase() : value
  },
  browserLanguageDetection: true,
  serverLanguageDetection: true,
  ignoreRoutes: ['/_next', '/static'],
  customDetectors: [],
  detection: {
    order: ['cookie', 'header', 'querystring'],
    caches: ['cookie']
  },
  backend: {
    loadPath: `/${LOCALE_PATH}/${LOCALE_STRUCTURE}.json`,
    addPath: `/${LOCALE_PATH}/${LOCALE_STRUCTURE}.missing.json`
  },
  react: {
    wait: true
  },
  strictMode: true,
  errorStackTraceLimit: 0
};
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;