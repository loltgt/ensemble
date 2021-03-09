/*!
 * loltgt ensemble.Event
 *
 * @version 0.0.1
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

(function(window, module, require, ensemble) {

  const Compo = ensemble ? ensemble.Compo : require('./Compo');


  class Event {

    constructor(ns, name, node) {
      const _ns = this._ns = '_' + ns;

      node = (Compo.isCompo(node) ? node.node : node) || document;

      this[_ns] = { name, node };
    }

    add(handle, options = false) {
      this[this._ns].node.addEventListener(this[this._ns].name, handle, options);
    }

    remove(handle) {
      this[this._ns].node.removeEventListener(this[this._ns].name, handle);
    }

    static isEvent(node) {
      return Symbol.for(node) === Symbol.for(Event.prototype);
    }

    get [Symbol.toStringTag]() {
      return 'ensemble.Event';
    }

  }


  window.ensemble = { ...ensemble, ...{ Event } };
  module.exports = Event;

}((typeof window != 'undefined' ? window : {}), (typeof module != 'undefined' ? module : {}), (typeof require != 'undefined' ? require : function() {}), globalThis.ensemble));
