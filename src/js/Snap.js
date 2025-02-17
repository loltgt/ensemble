/**
 * ensemble Snap
 *
 * @version 0.0.4
 * @link https://github.com/loltgt/ensemble
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

/**
 * @namespace ensemble
 * @exports Snap
 */

import _Symbol from './_Symbol.js';
import _composition from './_composition.js';


/**
 * Snap is a skeleton composition with shorthand methods and utils
 * 
 * It is a wrap around DocumentFragment [DOM]
 * It could be used as base for abstraction of a custom component element.
 *
 * @class
 * @extends _composition
 * @inheritdoc
 * @param {string} ns Component namespace
 * @example
 * new ensemble.Snap('component-namespace');
 */
class Snap extends _composition {

  /**
   * Constructor method
   *
   * @constructs
   */
  constructor(ns) {
    if (! new.target) {
      throw 'Bad invocation. Must be called with `new`.';
    }

    super();

    const ns0 = this.ns = '_' + ns;

    this[ns0] = this._element(ns);

    this.__Snap = true;
    this[ns0].__snap = this;

    this._render();
  }

  /**
   * Element wrapper
   *
   * @see document.createDocumentFragment
   *
   * @param {string} ns Component namespace
   */
  _element(ns) {
    return document.createDocumentFragment();
  }

  /**
   * Checks passed object is an ensemble.Snap instance
   *
   * @static
   * @returns {boolean}
   */
  static isSnap(obj) {
    if (_Symbol) return _Symbol.for(obj) === _Symbol.for(Snap.prototype);
    else return obj && typeof obj == 'object' && '__Snap' in obj;
  }

  /**
   * Getter for Symbol property, returns the symbolic name for ensemble Snap class
   *
   * @see Symbol.toStringTag
   *
   * @override
   * @returns {string}
   */
  get [_Symbol.toStringTag]() {
    return 'ensemble.Snap';
  }

}


export default Snap;
