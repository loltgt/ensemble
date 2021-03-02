'use strict';

(function(ensemble) {

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


  globalThis.ensemble = { ...ensemble, ...{ Event } };

})(globalThis.ensemble);
