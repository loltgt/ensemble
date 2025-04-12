/**
 * ensemble Data
 *
 * @version 0.4.0
 * @link https://github.com/loltgt/ensemble
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

/**
 * @namespace ensemble
 * @exports Data
 */

import Compo from './Compo.js';


/**
 * Data is a multi-purpose utility object
 * 
 * It could be used to wrap around ensemble Compo, 
 * this object can store any kind of properties. 
 *
 * @class
 * @example
 * new ensemble.Data('compo-namespace', {compo, foo: 'a string', fooObj: 'an object'});
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
    if (obj && typeof obj == 'object') {
      Object.assign(this, {}, obj);
    }

    const ns0 = this.ns = `_${ns}`;

    this.__Data = 0;
    this[ns0] = {ns};
  }

  /**
   * The compo method is a utility to render elements
   * 
   * When you create a compo with this method, it will create a Compo or an Object placeholder.
   * With defer render you can render it in place.
   *
   * @param {string} tag Element node tag or compo name
   * @param {string} name
   * @param {object} props Properties for Element node or compo
   * @param {boolean} defer Defer componet render
   * @param {mixed} load Callback function, on load compo
   * @param {mixed} unload Callback function, on unload compo
   * @returns {mixed} compo A compo element or an Object placeholder 
   */
  compo(tag, name, props, defer = false, load = false, unload = false) {
    const ns = this[this.ns].ns;
    let compo;

    if (defer) {
      compo = {ns, tag, name, props, load, unload};
    } else {
      compo = new Compo(ns, tag, name, props);
    }
    if (load && typeof load == 'function') {
      compo.load = props.onload = load;
    }
    if (unload && typeof unload == 'function') {
      compo.unload = props.onunload = unload;
    }

    return compo;
  }

  /**
   * Renders a compo, passed by reference
   *
   * @async
   * @param {mixed} slot Reference of the element to render
   */
  async render(slot) {
    const el = this[this.ns];
    const self = this;
    // _ circular

    if (el[slot] && el[slot]._) {
      el[slot].load();
    } else {
      el[slot] = {_: self[slot], load: self[slot].load, unload: self[slot].unload};
      self[slot] = new Compo(self[slot].ns, self[slot].tag, self[slot].name, self[slot].props);
      el[slot].load();
    }
  }

  /**
   * Unloads a compo, passed by reference
   *
   * @async
   * @param {mixed} slot Reference of the element to render
   */
  async unload(slot) {
    const el = this[this.ns];
    // _ circular

    if (el[slot] && el[slot]._) {
      el[slot].unload();
    }
  }

  /**
   * Reflows a compo, passed by reference
   *
   * @async
   * @param {mixed} slot Reference of the element to render
   * @param {boolean} force Force reflow
   */
  async reflow(slot, force) {
    const el = this[this.ns];
    // _ circular

    if (force) {
      el[slot] = this.compo(el[slot]._.ns, el[slot]._.name, el[slot]._.props);
    } else if (el[slot] && el[slot]._) {
      el[slot].load();
    }
  }

  /**
   * Checks passed object is an ensemble Data instance
   *
   * @static
   * @returns {boolean}
   */
  static isData(obj) {
    return obj instanceof Data;
  }

}


export default Data;
