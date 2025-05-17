/**
 * ensemble locale
 *
 * @version 0.5.0
 * @link https://github.com/loltgt/ensemble
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

/**
 * @namespace ensemble
 * @exports locale
 * @exports $locale
 * @exports l10n
 * @exports lang_en
 */


/**
 * Locale class L10n
 *
 * @class
 * @param {string} [lang] Current language name
 * @example
 * const l10n = new locale();
 * l10n.set("en", lang_en);
 * l10n.set("de", lang_de);
 * l10n.tr("ETAGN");
 * l10n.lang = "de";
 * l10n.tr("ETAGN");
 */
class locale {

  /**
   * Constructor
   *
   * @constructs
   */
  constructor(lang = 'en') {
    this.lang = lang;
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
 * Locale proxy
 *
 * @type {Proxy}
 * @param {object} l10n Locale object
 * @example
 * const l10n = $locale(lang_en);
 * l10n.ETAGN;
 */
const $locale = (l10n) => new Proxy(l10n, {
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


/**
 * Default l10n object proxied
 *
 * Empty object
 *
 * @constant {object}
 */
const l10n = $locale({});


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


export default locale;
export { locale, $locale, l10n, lang_en };
