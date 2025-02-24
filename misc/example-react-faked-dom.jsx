// example
//
// Using ensemble composition objects with an essential faked DOM in React
// 
// DocumentElement and DocumentFragment are replicated extending React Component
// ensemble Compo and Flat are aliased and extended
//

import React from 'react';
import { Compo as $Compo, Flat as $Flat } from 'ensemble';


class RCTree extends React.Component {
  appendChild(child) {
    const {children} = this.state;
    children.concat(child);

    this.setState({children});
  }

  removeChild(child) {
    const {children} = this.state;
    const i = this.state.children.indexOf(child);
    delete this.state.children[i];

    this.setState({children});
  }

  replaceChild(prevChild, nextChild) {
    const {children} = this.state;
    const i = this.state.children.indexOf(prevChild);
    children[i] = nextChild;

    this.setState({children});
  }

  get children() {
    return this.state.children;
  }

  //
  // to complete with some logic for element tree

  get parentElement() {}
  get previousElementSibling() {}
  get nextElementSibling() {}
}

class $Fragment extends RCTree {
  constructor(props) {
    super(props);

    this.state = {
      children: props.$.children instanceof Array ? props.$.children : []
    };
  }
}

class $Element extends RCTree {
  constructor(props) {
    super(props);

    this.state = {
      className: typeof props.$.className == 'string' ? props.$.className : '',
      style: typeof props.$.style == 'object' ? props.$.style : {},
      children: props.$.children instanceof Array ? props.$.children : []
    };
  }

  addEvent(event, func) {
    if (typeof func != 'function') return;

    this.setState({[`on${event}`]: func});
  }

  removeEvent(event, func) {
    if (typeof func != 'function') return;

    const {state} = this;

    if (state[`on${event}`] && state[`on${event}`] === func)
      delete state[`on${event}`];

    this.setState(state);
  }

  hasAttribute(name) {
    return name in this.state;
  }

  getAttribute(name) {
    return this.state[name];
  }

  setAttribute(name, value) {
    if (/^on|style/.test(name))
      return;

    this.setState({[name]: value.toString()});
  }

  removeAttribute(name) {
    if (/^on|style/.test(name))
      return;

    const {state} = this;

    if (state[name])
      delete state[name];

    this.setState(state);
  }

  getStyle(name) {
    return this.state.style[name];
  }

  setStyle(name, value) {
    const {style} = this.state.style;
    style[name] = value.toString();

    this.setState({style});
  }

  clearStyle() {
    this.setState({style: {}});
  }

  #classList(className) {
    const {setState} = this;

    class classList {
      constructor(className) {
        this.className = className.split(' ');
      }

      add(name) {
        const className = ! this.contains(name) ? this.className.push(name.toString()) : this.className;
        setState({className});
      }

      remove(name) {
        const className = this.className.filter(a => a != name.toString());
        setState({className});
      }

      contains(name) {
        return this.className.indexOf(name.toString()) != -1;
      }

      toggle(name) {
        this.contains(name) ? this.remove(name) : this.add(name);
      }
    }

    return new classList(className);
  }

  get attributes() {
    return this.state;
  }

  get style() {
    return this.state.style;
  }

  get className() {
    return this.state.className;
  }

  get classList() {
    return this.#classList(this.state.className);
  }

  render() {
    return React.createElement(this.props.name, this.state);
  }
}

//
// to complete with some logic for bind, unbind, place, show, hide, enable, disable, 
// render, events, computed style

class Compo extends $Compo {
  bind() {}
  unbind() {}
  place() {}

  element(name, props) {
    return $Element({name, $: props});
  }

  getStyle(prop) {}
  show() {}
  hide() {}
  enable() {}
  disable() {}
}

class Flat extends $Flat {
  bind() {}
  unbind() {}
  place() {}

  element(name, props) {
    return $Fragment({name, $: props});
  }
}


export { Compo, Flat };

