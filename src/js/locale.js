/**
 * ensemble locale
 *
 * @version 0.0.4
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
 * Functions to translate
 *
 * @object
 */
const l10n_funcs = {
  EARGN: (name) => `Provided argument "${name}" is not a valid name.`
};

// en [default]
const l10n_en = {
  EBADH: 'Bad invocation. Must be called with `new`.',
  ETAGN: l10n_funcs.EARGN('tag'),
  EPROP: 'Provided property name is not a valid name.',
  EMTAG: 'Object cannot be resolved into a valid node.',
  EOPTS: l10n_funcs.EARGN('options'),
  EELEM: l10n_funcs.EARGN('element'),
  EMETH: l10n_funcs.EARGN('method'),
  DOM: 'Direct access to the node is discouraged.'
};

/**
 * Locale class L10n
 *
 * @class
 */
class locale {

  /**
   * Constructor method
   *
   * @constructs
   * @param {string} lang Language name
   * @returns {mixed} Translated strings
   */
  constructor(lang) {
    if (typeof locale[lang] == 'object') {
      return locale[lang];
    } else {
      return locale[0];
    }
  }

  /**
   * Default translation markers
   *
   * @static
   * @returns {object} Translation markers
   */
  static defaults() {
    return Object.fromEntries(['EBADH', 'ETAGN', 'EPROP', 'EMTAG', 'EOPTS', 'EELEM', 'EMETH', 'DOM'].map(a => [a, a]));
  }
};

/**
 * Default l10n object
 *
 * @object
 */
const l10n = locale.defaults();


export { locale, l10n };
