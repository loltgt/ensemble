/*!
 * loltgt ensemble.Event
 *
 * @version 0.0.1
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

(function(window, module, require, ensemble) {

  class Event {

    constructor(name, node) {
      this.name = name;
      this.node = (node && '__compo' in node ? node.node : node) || document;
    }
    add(handle, options = false) {
      this.node.addEventListener(this.name, handle, options);
    }
    remove(handle) {
      this.node.removeEventListener(this.name, handle);
    }

  }


  window.ensemble = { ...ensemble, ...{ Event } };
  module.exports = Event;

}((typeof window != 'undefined' ? window : {}), (typeof module != 'undefined' ? module : {}), (typeof require != 'undefined' ? require : function() {}), globalThis.ensemble));
