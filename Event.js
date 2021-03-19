/*!
 * loltgt ensemble.Event
 *
 * @version 0.0.1
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

'use strict';

// (function(window, module, require, ensemble) {

  // const Compo = ensemble ? ensemble.Compo : require('./Compo');

  import Compo from './Compo.js';

  //TODO
  // backward compatibility
  const _Symbol = typeof Symbol == 'undefined' ? 0 : Symbol;


  class Event {

    constructor(ns, name, node) {
      if (! new.target) {
        throw 'ensemble error: Wrong invocation, must be called with new.';
      }

      const _ns = this._ns = '_' + ns;

      node = (Compo.isCompo(node) ? node.node : node) || document;

      //TODO
      this.__Event = true;
      this[_ns] = { name, node };
    }

    add(handle, options = false) {
      this[this._ns].node.addEventListener(this[this._ns].name, handle, options);
    }

    remove(handle) {
      this[this._ns].node.removeEventListener(this[this._ns].name, handle);
    }

    //TODO
    // backward compatibility
    static isEvent(obj) {
      if (_Symbol) return _Symbol.for(obj) === _Symbol.for(Event.prototype);
      else return obj && typeof obj == 'object' && '__Event' in obj;
    }

    //TODO undef
    // backward compatibility
    get [_Symbol.toStringTag]() {
      return 'ensemble.Event';
    }

  }


  // window.ensemble = { ...ensemble, ...{ Event } };
  // module.exports = Event;

// }((typeof window != 'undefined' ? window : {}), (typeof module != 'undefined' ? module : {}), (typeof require != 'undefined' ? require : function() {}), globalThis.ensemble));


export default Event;