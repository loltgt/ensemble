/**
 * ensemble Flat
 *
 * @version 0.0.4
 * @link https://github.com/loltgt/ensemble
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

/**
 * @namespace ensemble
 * @exports Flat
 */

import part from './part.js';


/**
 * Flat is a composition stack with shorthand methods and utils
 * 
 * It is a wrap around DocumentFragment [DOM]
 * It could be used as abstraction of a component.
 *
 * @class
 * @extends part
 * @inheritdoc
 * @param {string} ns Compo namespace
 * @example
 * new ensemble.Flat('compo-namespace');
 */
class Flat extends part {

  /**
   * Constructor method
   *
   * @constructs
   */
  constructor(ns) {
    super();

    const ns0 = this.ns = `_${ns}`;

    this[ns0] = this.element(ns);

    this.__Flat = 1;
    this[ns0]._1 = this;

    this.render();
  }

  /**
   * Object wrapper
   *
   * @see document.createDocumentFragment
   *
   * @param {string} ns Compo namespace
   */
  element(ns) {
    return document.createDocumentFragment();
  }

  /**
   * Checks passed object is an ensemble Flat instance
   *
   * @static
   * @returns {boolean}
   */
  static isFlat(obj) {
    return obj instanceof Flat;
  }

}


export default Flat;
