/*!
 * loltgt ensemble.Snap
 *
 * @version 0.0.2
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
 * Snap is an empty skeleton composition with shorthands method and utils.
 * 
 * It is a wrapper around a DocumentFragment [DOM].
 * It could be used as base for abstraction of a custom component element.
 *
 * @class
 * @extends _composition
 * @inheritdoc
 * @example
 * new ensemble.Snap('namespace-of-my-foo-component');
 */
class Snap extends _composition {

  /**
   * Constructor method.
   *
   * @constructs
   * @param {string} ns - Component namespace
   */
  constructor(ns) {
    if (! new.target) {
      throw 'ensemble.Snap error: Bad invocation, must be called with new.';
    }

    super();

    const _ns = this._ns = '_' + ns;

    const node = this[_ns] = this._element(ns);

    this.__Snap = true;
    this[_ns].__snap = this;

    this._renderer();
  }

  /**
   * Element wrapper.
   *
   * @see document.createDocumentFragment()
   *
   * @param {string} ns - Component namespace
   */
  _element(ns) {
    return document.createDocumentFragment();
  }

  /**
   * Check if passed object is an ensemble.Snap instance.
   *
   * @static
   * @returns {boolean}
   * @todo backward compatibility
   */
  static isSnap(obj) {
    if (_Symbol) return _Symbol.for(obj) === _Symbol.for(Snap.prototype);
    else return obj && typeof obj == 'object' && '__Snap' in obj;
  }

  /**
   * Getter for Symbol property, returns the symbolic name for ensemble.Snap class.
   *
   * @see Symbol.toStringTag
   *
   * @override
   * @returns {string}
   * @todo return undef
   * @todo backward compatibility
   */
  get [_Symbol.toStringTag]() {
    return 'ensemble.Snap';
  }

}


export default Snap;
