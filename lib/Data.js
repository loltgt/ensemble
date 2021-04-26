/*!
 * loltgt ensemble.Data
 *
 * @version 0.0.1
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
 * Data is a multi-purpose utility object.
 * 
 * It could be used as a wrapper around a Compo composition, 
 * this object can store any kind of properties. 
 *
 * @class
 * @example
 * new ensemble.Data('namespace-of-my-foo-component', { compo: ensemble.Compo, foo: 'a text string', fooObj: 'an object' });
 */
class Data {

  /**
   * Constructor method.
   *
   * @constructs
   * @param {string} ns - Data namespace
   * @param {object} obj - A starter Object
   */
  constructor(ns, obj) {
    if (! new.target) {
      throw 'ensemble.Data error: Bad invocation, must be called with new.';
    }

    if (obj && typeof obj == 'object') {
      Object.assign(this, {}, obj);
    }

    const _ns = this._ns = '_' + ns;

    this.__Data = true;
    this[_ns] = { ns };
  }

  /**
   * The compo method is a utility render.
   * 
   * When you create a composition with this method, it will create a Compo composition or simply an Object placeholder.
   * With the defer render you can have it rendered in place, refresh, or freeze.
   *
   * @param {string} tag - Element node tag -or- component name
   * @param {string} name
   * @param {object} props - Properties for Element node -or- component
   * @param {boolean} defer - Defer render for composition
   * @param {mixed} fresh - A function callback, called when is loaded the compo
   * @param {mixed} stale - A function callback, called when is unloaded the compo
   * @returns {mixed} compo - An ensemble.Compo element -or- an Object placeholder 
   */
  compo(tag, name, props, defer = false, fresh = false, stale = false) {
    const ns = this[this._ns].ns;

    let compo;

    if (defer) {
      compo = { ns, tag, name, props, fresh, stale };
    } else {
      compo = new Compo(ns, tag, name, props);
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
   * Renderizes a composition, passed by reference.
   *
   * @async
   * @param {mixed} slot - Reference of the element that will be rendered
   */
  async render(slot) {
    const _ns = this._ns;

    if (this[_ns][slot] && this[_ns][slot].rendered) {
      this[_ns][slot].fresh();
    } else {
      this[_ns][slot] = { rendered: true, fresh: this[slot].fresh, stale: this[slot].stale, params: this[slot] };
      this[slot] = new Compo(this[slot].ns, this[slot].tag, this[slot].name, this[slot].props);
      this[_ns][slot].fresh();
    }
  }

  /**
   * Freezes a composition, passed by reference.
   *
   * @async
   * @param {mixed} slot - Reference of the element that will be rendered
   */
  async stale(slot) {
    const _ns = this._ns;

    if (this[_ns][slot] && this[_ns][slot].rendered) {
      this[_ns][slot].stale();
    }
  }

  /**
   * Refresh a composition, passed by reference.
   *
   * @async
   * @param {mixed} slot - Reference of the element that will be rendered.
   * @param {boolean} force - It forces the reflow.
   */
  async reflow(slot, force) {
    const _ns = this._ns;

    if (force) {
      this[_ns][slot] = this.compo(this[_ns][slot].params.ns, this[_ns][slot].params.name, this[_ns][slot].params.props);
    } else if (this[_ns][slot] && this[_ns][slot].rendered) {
      this[_ns][slot].fresh();
    }
  }

  /**
   * Check if passed object is an ensemble.Data instance.
   *
   * @static
   * @returns {boolean}
   * @todo backward compatibility
   */
  static isData(obj) {
    if (_Symbol) return _Symbol.for(obj) === _Symbol.for(Data.prototype);
    else return obj && typeof obj == 'object' && '__Data' in obj;
  }

  /**
   * Getter for Symbol property, returns the symbolic name for ensemble.Data class.
   *
   * @see Symbol.toStringTag
   *
   * @override
   * @returns {string}
   * @todo return undef
   * @todo backward compatibility
   */
  get [_Symbol.toStringTag]() {
    return 'ensemble.Data';
  }

}


export default Data;
