// example
//
// Using ensemble components in React
// 
// In this example, ensemble Modal, Lightbox and SocialShare are loaded when demanded
// Predefined scripts and stylesheets are loaded asynchronously on componentDidMount
//

import React from 'react';


class RCEnsembleComponent extends React.Component {
  constructor(props) {
    super(props);

    this.loadCallback = this.loadCallback.bind(this);
  }

  componentDidMount() {
    this.deferLoad();
  }

  #getSrcUrl(name) {
    switch (name) {
      case 'modal':
        return {
          'js': 'ensemble-modal/dist/js/ensemble-modal.min.js',
          'css': 'ensemble-modal/dist/css/ensemble-modal.min.css'
        };
      case 'lightbox':
        return {
          'js': 'ensemble-lightbox/dist/js/ensemble-lightbox.min.js',
          'css': 'ensemble-lightbox/dist/css/ensemble-lightbox.min.css'
        };
      case 'social-share':
        return {
          'js': 'ensemble-social-share/dist/js/ensemble-social-share.min.js',
          'css': 'ensemble-social-share/dist/css/ensemble-social-share.min.css'
        };
      case 'social-share-icons':
        return {
          'css': 'ensemble-social-share/dist/font/socialshare-icons.min.css'
        };
    }
  }

  loadScript(name, cb) {
    const id = `ensemble-${name}`;

    if (document.body.querySelector(`script[data-load="${id}"]`))
      return;

    const src = this.#getSrcUrl(name);
    if (! src) return;

    const script = document.createElement('script');
    script.src = src.js;
    script.async = true;
    script.setAttribute('data-load', id);

    if (cb && typeof cb == 'function')
      script.onload = cb;

    document.body.appendChild(script);
  }

  loadStyleSheet(name, cb) {
    const id = `ensemble-${name}`;

    if (document.head.querySelector(`style[data-load="${id}"]`))
      return;

    const href = this.#getSrcUrl(name);
    if (! href) return;

    const style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = href.css;
    style.setAttribute('data-load', id);

    if (cb && typeof cb == 'function')
      style.onload = cb;

    document.head.appendChild(style);
  }
}


class RCEnsembleModal extends RCEnsembleComponent {
  deferLoad() {
    this.loadScript('modal', this.loadCallback);
    this.loadStyleSheet('modal');
  }

  loadCallback() {
    this.modal = new ensemble.Modal(document.querySelector('.inline-content'));
  }

  openTrigger(modal) {
    modal && modal.open();
  }

  render() {
    return (
      <div>
        <span className="inline-content">Show this content in a modal.</span>

        <button onClick={() => this.openTrigger(this.modal)}>Open modal</button>
      </div>
    );
  }
}


class RCEnsembleLightbox extends RCEnsembleComponent {
  deferLoad() {
    this.loadScript('lightbox', this.loadCallback);
    this.loadStyleSheet('lightbox');
  }

  loadCallback() {
    this.lightbox = new ensemble.Lightbox({
      contents: [
        {
          'type': 'image',
          'src': 'image.png'
        }
      ]
    });
  }

  openTrigger(lightbox) {
    lightbox && lightbox.open();
  }

  render() {
    return (
      <div>
        <button onClick={() => this.openTrigger(this.lightbox)}>Open lightbox</button>
      </div>
    );
  }
}


class RCEnsembleSocialShare extends RCEnsembleComponent {
  deferLoad() {
    this.loadScript('social-share', this.loadCallback);
    this.loadStyleSheet('social-share');
    this.loadStyleSheet('social-share-icons');
  }

  loadCallback() {
    new ensemble.SocialShare(document.querySelector('[data-social-share]'));
  }

  render() {
    return (
      <div className="social-share" data-social-share></div>
    );
  }
}


export { RCEnsembleModal, RCEnsembleLightbox, RCEnsembleSocialShare };

