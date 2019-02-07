"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _i18nextExpressMiddleware = _interopRequireDefault(require("i18next-express-middleware"));

var _utils = require("../utils");

var _url = require("url");

var _pathMatch = _interopRequireDefault(require("path-match"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const route = (0, _pathMatch.default)();

function _default(nexti18next) {
  const {
    config,
    i18n
  } = nexti18next;
  const {
    allLanguages,
    ignoreRoutes,
    localeSubpaths
  } = config;
  const ignoreRegex = new RegExp(`^\/(?!${ignoreRoutes.map(x => x.replace('/', '')).join('|')}).*$`);
  const ignoreRoute = route(ignoreRegex);

  const isI18nRoute = url => ignoreRoute(url);

  const localeSubpathRoute = route(`/:lng(${allLanguages.join('|')})/*`);
  const middleware = []; // If not using server side language detection,
  // we need to manually set the language for
  // each request

  if (!config.serverLanguageDetection) {
    middleware.push((req, res, next) => {
      if (isI18nRoute(req.url)) {
        req.lng = config.defaultLanguage;
      }

      next();
    });
  }

  middleware.push(_i18nextExpressMiddleware.default.handle(i18n, {
    ignoreRoutes
  }));

  if (localeSubpaths) {
    middleware.push((req, res, next) => {
      if (isI18nRoute(req.url)) {
        const {
          pathname
        } = (0, _url.parse)(req.url);

        if (allLanguages.some(lng => pathname === `/${lng}`)) {
          return (0, _utils.forceTrailingSlash)(req, res, pathname.slice(1));
        }

        (0, _utils.lngPathDetector)(req, res);
        const params = localeSubpathRoute(req.url);

        if (params !== false) {
          const {
            lng
          } = params;
          req.query = { ...req.query,
            lng
          };
          req.url = req.url.replace(`/${lng}`, '');
        }
      }

      return next();
    });
  }

  return middleware;
}

module.exports = exports.default;
module.exports.default = exports.default;