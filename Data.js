/*!
 * loltgt ensemble.Data
 *
 * @version 0.0.1
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

// (function(window, module, require, ensemble) {

  // const Compo = ensemble ? ensemble.Compo : require('./Compo');

  import Compo from './Compo.js';


  class Data {

    constructor(ns, obj) {
      if (! new.target) {
        throw 'ensemble error: Wrong invocation, must be called with new.';
      }

      if (obj && typeof obj === 'object') {
        Object.assign(this, {}, obj);
      }

      const _ns = this._ns = '_' + ns;
      this[_ns] = { ns };
    }

    compo(tag, name, props, defer = false, fresh = false, stale = false) {
      const ns = this[this._ns].ns;

      let compo;

      if (defer) {
        compo = { ns, tag, name, props, fresh, stale };
      } else {
        compo = new Compo(ns, tag, name, props);
      }
      if (fresh && typeof fresh === 'function') {
        compo.fresh = props.onfresh = fresh;
      }
      if (stale && typeof stale === 'function') {
        compo.stale = props.onstale = stale;
      }

      return compo;
    }

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

    async stale(slot) {
      const _ns = this._ns;

      if (this[_ns][slot] && this[_ns][slot].rendered) {
        this[_ns][slot].stale();
      }
    }

    async reflow(slot, force) {
      const _ns = this._ns;

      if (force) {
        this[_ns][slot] = this.compo(this[_ns][slot].params.ns, this[_ns][slot].params.name, this[_ns][slot].params.props);
      } else if (this[_ns][slot] && this[_ns][slot].rendered) {
        this[_ns][slot].fresh();
      }
    }

    static isData(node) {
      return Symbol.for(node) === Symbol.for(Data.prototype);
    }

    get [Symbol.toStringTag]() {
      return 'ensemble.Data';
    }

  }


  // window.ensemble = { ...ensemble, ...{ Data } };
  // module.exports = Data;

// }((typeof window != 'undefined' ? window : {}), (typeof module != 'undefined' ? module : {}), (typeof require != 'undefined' ? require : function() {}), globalThis.ensemble));


export default Data;