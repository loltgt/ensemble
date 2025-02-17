/**
 * ensemble Data
 *
 * @version 0.0.4
 * @link https://github.com/loltgt/ensemble
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

/**
 * @namespace ensemble
 * @exports Data
 */

import _Symbol from './_Symbol.js';
import Compo from './Compo.js';


/**
 * Data is a multi-purpose utility object
 * 
 * It could be used to wrap around a Compo composition, 
 * this object can store anykind of properties. 
 *
 * @class
 * @example
 * new ensemble.Data('component-namespace', {compo: ensemble.Compo, foo: 'a string', fooObj: 'an object'});
 */
class Data {

  /**
   * Constructor method
   *
   * @constructs
   * @param {string} ns Data namespace
   * @param {object} obj A starter Object
   */
  constructor(ns, obj) {
    if (! new.target) {
      throw 'Bad invocation. Must be called with `new`.';
    }

    if (obj && typeof obj == 'object') {
      Object.assign(this, {}, obj);
    }

    const ns0 = this.ns = '_' + ns;

    this.__Data = true;
    this[ns0] = {ns};
  }

  /**
   * The compo method is a utility to render elements
   * 
   * When you create a composition with this method, it will create a Compo composition or an Object placeholder.
   * With the defer render you can render it in-place.
   *
   * @param {string} tag Element node tag or component name
   * @param {string} name
   * @param {object} props Properties for Element node or component
   * @param {boolean} defer Defer the composition render
   * @param {mixed} fresh Callback function, on load compo
   * @param {mixed} stale Callback function, on unload compo
   * @returns {mixed} compo An ensemble Compo element or an Object placeholder 
   */
  compo(tag, name, props, defer = false, fresh = false, stale = false) {
    const ns = this.ns, ns1 = this[ns].ns;

    let compo;

    if (defer) {
      compo = {ns1, tag, name, props, fresh, stale};
    } else {
      compo = new Compo(ns1, tag, name, props);
    }
    if (fresh && typeof fresh == 'function') {
      compo.fresh = props.onfresh = fresh;
    }
    if (stale && typeof stale == 'function') {
      compo.stale = props.onstale = stale;
    }

    return compo;
  }

  /**
   * Renders a composition, passed by reference
   *
   * @async
   * @param {mixed} slot Reference of the element to render
   */
  async render(slot) {
    const ns = this.ns, el = this[ns], self = this;

    if (el[slot] && el[slot].rendered) {
      el[slot].fresh();
    } else {
      el[slot] = {rendered: true, fresh: self[slot].fresh, stale: self[slot].stale, params: self[slot]};
      self[slot] = new Compo(self[slot].ns, self[slot].tag, self[slot].name, self[slot].props);
      el.fresh();
    }
  }

  /**
   * Freezes a composition, passed by reference
   *
   * @async
   * @param {mixed} slot Reference of the element to render
   */
  async stale(slot) {
    const ns = this.ns, el = this[ns];

    if (el[slot] && el[slot].rendered) {
      el[slot].stale();
    }
  }

  /**
   * Reflows a composition, passed by reference
   *
   * @async
   * @param {mixed} slot Reference of the element to render
   * @param {boolean} force Force reflow
   */
  async reflow(slot, force) {
    const ns = this.ns, el = this[ns];

    if (force) {
      el[slot] = this.compo(el[slot].params.ns, el[slot].params.name, el[slot].params.props);
    } else if (el[slot] && el[slot].rendered) {
      el[slot].fresh();
    }
  }

  /**
   * Checks passed object is an ensemble Data instance
   *
   * @static
   * @returns {boolean}
   */
  static isData(obj) {
    if (_Symbol) return _Symbol.for(obj) === _Symbol.for(Data.prototype);
    else return obj && typeof obj == 'object' && '__Data' in obj;
  }

  /**
   * Getter for Symbol property, returns the symbolic name for ensemble Data class
   *
   * @see Symbol.toStringTag
   *
   * @override
   * @returns {string}
   */
  get [_Symbol.toStringTag]() {
    return 'ensemble.Data';
  }

}


export default Data;
