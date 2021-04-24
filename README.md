# ensemble

For testing purpose — **under development**

 

**ensemble** is a tiny JS library, which can be used as a starting point to create beautiful software or applications.

It is a JavaScript module with 4 classes: **Compo**, a wrapper around DOM node element; **Data**, a wrapper around ensemble.Compo element with utility; **Event**, a wrapper around DOM event; **Snap**, a wrapper around DOM *DocumentFragment* element.

**ensemble** is not gluey, it does not contain anykind of data controller, you may want to use other software to handle data structures.

You can also consider **ensemble** like an helper to easy porting from different environments or software libraries. As an example, if you want to use Vue or React or another lib, you could do something like this:

```javascript
import React from "react";
import ensemble from "ensemble";


class Compo_Component_React extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      className: props.$.className == 'string' ? props.$.className : '',
      classList: this.#classList(),
      style: typeof props.$.style == 'object' ? props.$.style : {},
      children: typeof props.$.children == 'object' ? props.$.children : null
    };
  }

  appendChild(child) {
    const children = this.state.children || [];

    this.setState({ children: children.concat(child) });
  }

  removeChild(child) {
    const children = this.state.children || [];

    const chd = this.state.children.indexOf(child);
    delete this.state.children[chd];

    this.setState({ children });
  }

  replaceChild(prevChild, nextChild) {
    const children = this.state.children || [];

    const chd = this.state.children.indexOf(prevChild);
    children[chd] = nextChild;

    this.setState({ children });
  }

  addEvent(event, handler) {
    if (typeof handler != 'function') return;

    let evt = {};
    evt['on' + event] = handler;

    this.setState(evt);
  }

  removeEvent(event, handler) {
    if (typeof handler != 'function') return;

    let evt = 'on' + event;
    delete this.state[event];

    this.setState(this.state);
  }

  hasAttr(name) {
    return name in this.state;
  }

  getAttr(name, value) {
    return this.state[name];
  }

  setAttr(name, value) {
    const attribute = {};
    attribute[name] = value.toString();
    this.setState(attribute);
  }

  removeAttr(name) {
    const attribute = {};
    attribute[name] = undefined;
    this.setState(attribute);
  }

  getStyle(name) {
    return this.state.style[name];
  }

  setStyle(name, value) {
    const style = this.state.style;
    style[name] = value.toString();
    this.setState({ style });
  }

  clearStyle(name) {
    this.setState({ style: {} });
  }

  #classList() {
    const self = this;

    function classList() {}

    classList.prototype.add = function(className) {
      className = self.state.className + ' ' + className.toString();
      self.setState({ className });
    }

    classList.prototype.remove = function(className) {
      className = self.state.className.replace(new RegExp(className.toString(), 'g'), '');
      self.setState({ className });
    }

    classList.prototype.contains = function(className) {
      return self.state.className.indexOf(className) != -1;
    }

    classList.prototype.toggle = function(className) {
      this.contains(className) ? this.remove(className) : this.add(className);
    }

    return new classList;
  }

  get attributes() {
    return this.state;
  }

  get style() {
    return this.state.style;
  }

  get classList() {
    return this.state.classList;
  }

  get children() {
    return this.state.children;
  }

  render() {
    return React.createElement(this.props.name, this.state);
  }
}


class Compo_React extends ensemble.Compo {
  element(name, props) {
    return Compo_Component_React({ name, $: props });
  }

  // some logic for children to parent render
  // events, adjcent elements, etc.
}
```

You can use it in other environments as well, for example you could use React Native or other software in a mobile app.

 

## License

[MIT License](LICENSE).
