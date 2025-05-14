/**
 * ensemble locale
 *
 * @version 0.4.0
 * @link https://github.com/loltgt/ensemble
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

/**
 * @namespace ensemble
 * @exports locale
 * @exports l10n
 */

/**
 * Language english
 */
/** @constant {object} */
const lang_en_h = {
  EARGN: (name) => `Provided argument "${name}" is not a valid name.`
};
/** @constant {object} */
const lang_en = {
  ETAGN: lang_en_h.EARGN('tag'),
  EPROP: 'Provided property name is not a valid name.',
  EMTAG: 'Object cannot be resolved into a valid node.',
  EOPTS: lang_en_h.EARGN('options'),
  EELEM: lang_en_h.EARGN('element'),
  EMETH: lang_en_h.EARGN('method'),
  DOM: 'Direct access to the node is discouraged.'
};

/**
 * Locale class L10n
 *
 * @class
 * @param {string} lang Current language name
 * @example
 * const l10n = new locale("en");
 * l10n.set("en", lang_en);
 * l10n.set("de", lang_de);
 * l10n.lang = "de";
 * l10n.tr("ETAGN");
 */
class locale {

  /**
   * Constructor
   *
   * @constructs
   */
  constructor(lang) {
    this.lang(lang);
  }

  /**
   * Sets translation strings
   *
   * @param {string} lang Language name
   * @param {object} obj Translation strings
   */
  set(lang, obj) {
    locale[lang] = obj;
  }

  /**
   * Gets translation string
   *
   * @param {string} marker Translation marker
   * @returns {string} Translation string
   */
  tr(marker) {
    return locale[this.lang][marker];
  }

  /**
   * Language getter
   *
   * @static
   * @type {string} Current language name
   */
  static get lang() {
    return locale[0];
  }

  /**
   * Language setter
   *
   * @static
   * @type {string} lang Current language name
   */
  static set lang(lang) {
    locale[0] = lang;
  }
}

/**
 * Default l10n object proxied
 *
 * @type {Proxy}
 * @param {locale} locale Locale object
 * @example
 * l10n.ETAGN;
 */
const l10n = new Proxy(locale, {
  /**
   * Trap for getter
   *
   * Returns translation string if set or translation marker.
   *
   * @param {object} self
   * @param {string} marker
   * @returns {string}
   */
  get(self, marker) {
    return self.lang && self[self.lang][marker] || marker;
  }
});


export { locale, l10n };
