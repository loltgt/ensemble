# ensemble

ensemble is a tiny JavaScript library from loltgt, which can be used as starting point to create beautiful components.

ensemble is the foundation for ensemble.Modal, ensemble.Lightbox and ensemble.SocialShare

It is a JavaScript module with 7 classes:
* `Compo` composition element, wrap around node `Element` [DOM]
* `Flat` composition stack, wrap around `DocumentFragment` [DOM]
* `Data` wrapper for data, wrap around `Compo` element
* `Event` wrapper for events, wrap around `Event` [DOM]
* `part` abstract for `Compo` and `Flat`
* `base` abstract for ensemble components

ensemble is not gluey, it does not contain any kind of superstructure.

You can use ensemble also with other libraries (examples in the *misc* folder).


## Demo

To see in action ensemble components: Modal, Lightbox and SocialShare, look at the demo showcase on this page: [https://loltgt.github.io/ensemble/demo/](https://loltgt.github.io/ensemble/demo/)

View source from `demo` pages to discover options and examples.

## Install

Using npm:
```shell
npm install --save-dev loltgt/ensemble
```

## License

[MIT License](LICENSE)
