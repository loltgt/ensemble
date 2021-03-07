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

    constructor(name, node) {
      this.__event = Symbol.for(this);
      this.name = name;
      this.node = (Compo.isCompo(node) ? node.node : node) || document;
    }

    add(handle, options = false) {
      this.node.addEventListener(this.name, handle, options);
    }

    remove(handle) {
      this.node.removeEventListener(this.name, handle);
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
