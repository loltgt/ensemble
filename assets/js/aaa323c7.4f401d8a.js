(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{102:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return b}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=r.a.createContext({}),m=function(e){var t=r.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=m(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},p=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),u=m(n),p=a,b=u["".concat(l,".").concat(p)]||u[p]||d[p]||o;return n?r.a.createElement(b,i(i({ref:t},s),{},{components:n})):r.a.createElement(b,i({ref:t},s))}));function b(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=p;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,l[1]=i;for(var s=2;s<o;s++)l[s]=n[s];return r.a.createElement.apply(null,l)}return r.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"},112:function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return c})),n.d(t,"c",(function(){return s}));var a=n(4),r=n(0),o=n.n(r),l=function(e){function t(t){var n;return(n=e.call(this,t)||this).postLoad=n.postLoad.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(n)),n}Object(a.a)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.load()},n.loadScript=function(e,t){var n=document.createElement("script");n.src=e,n.async=!0,t&&"function"==typeof t&&(n.onload=t),document.body.appendChild(n)},n.loadStyle=function(e,t){var n=document.createElement("link");n.rel="stylesheet",n.href=e,t&&"function"==typeof t&&(n.onload=t),document.head.appendChild(n)},n.openTrigger=function(e){console.log(e),e&&e.open()},t}(o.a.Component),i=function(e){function t(){return e.apply(this,arguments)||this}Object(a.a)(t,e);var n=t.prototype;return n.load=function(){this.loadScript("../ensemble-modal/dist/js/ensemble-modal.min.js",this.postLoad),this.loadStyle("../ensemble-modal/dist/css/ensemble-modal.min.css")},n.postLoad=function(){this.modal=new ensemble.Modal(document.getElementById("inline-content-to-display"),{})},n.render=function(){var e=this;return o.a.createElement("div",{className:"example"},o.a.createElement("div",null,o.a.createElement("div",{className:"example-block",id:"inline-content-to-display"},o.a.createElement("h6",null,"Just an example."),o.a.createElement("p",null,"An inline content to display in a modal."),o.a.createElement("p",null,"Lorem ipsum dolor sit amet."))),o.a.createElement("button",{className:"button button--primary button--lg",onClick:function(){return e.openTrigger(e.modal)}},"Open this in a modal"))},t}(l),c=function(e){function t(){return e.apply(this,arguments)||this}Object(a.a)(t,e);var n=t.prototype;return n.load=function(){this.loadScript("../ensemble-lightbox/dist/js/ensemble-lightbox.min.js",this.postLoad),this.loadStyle("../ensemble-lightbox/dist/css/ensemble-lightbox.min.css")},n.postLoad=function(){this.lightbox=new ensemble.Lightbox({contents:[{type:"image",src:"../img/docusaurus.png"}]})},n.render=function(){var e=this;return o.a.createElement("div",{className:"example"},o.a.createElement("button",{className:"button button--primary button--lg",onClick:function(){return e.openTrigger(e.lightbox)}},"Open a lightbox"))},t}(l),s=function(e){function t(){return e.apply(this,arguments)||this}Object(a.a)(t,e);var n=t.prototype;return n.load=function(){this.loadScript("../ensemble-social-share/dist/js/ensemble-social-share.min.js",this.postLoad),this.loadStyle("../ensemble-social-share/dist/css/ensemble-social-share.min.css"),this.loadStyle("../ensemble-social-share/iconset.tmp.css")},n.postLoad=function(){new ensemble.SocialShare(document.getElementById("my-div-placeholder"),{})},n.render=function(){return o.a.createElement("div",{className:"example"},o.a.createElement("div",{className:"example-block"},o.a.createElement("article",null,o.a.createElement("h3",null,"The post title"),o.a.createElement("header",null,o.a.createElement("p",null,"Share this post!"),o.a.createElement("div",{id:"my-div-placeholder"})),o.a.createElement("h4",null,"The body"),o.a.createElement("p",null,"Lorem ipsum dolor sit amet ..."),o.a.createElement("footer",null,o.a.createElement("p",null,"Tags: ",o.a.createElement("strong",null,"#lorem")," ",o.a.createElement("strong",null,"#ipsum")," ",o.a.createElement("strong",null,"#dolor")," ",o.a.createElement("strong",null,"#sit")," ",o.a.createElement("strong",null,"#amet"))))))},t}(l)},91:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return s})),n.d(t,"default",(function(){return u}));var a=n(3),r=n(7),o=(n(0),n(102)),l=n(112),i={title:"Create a modal"},c={unversionedId:"create-a-modal",id:"create-a-modal",isDocsHomePage:!1,title:"Create a modal",description:"TODO",source:"@site/docs/create-a-modal.md",sourceDirName:".",slug:"/create-a-modal",permalink:"/docs/create-a-modal",editUrl:"https://github.com/loltgt/ensemble/docs/create-a-modal.md",version:"current",frontMatter:{title:"Create a modal"},sidebar:"docs",previous:{title:"Getting Started",permalink:"/docs/"},next:{title:"Create a lightbox",permalink:"/docs/create-a-lightbox"}},s=[{value:"Example of modal",id:"example-of-modal",children:[]}],m={toc:s};function u(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},m,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"TODO"),Object(o.b)("h2",{id:"example-of-modal"},"Example of modal"),Object(o.b)("p",null,"Example:"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-js"},"//TODO arguments\nvar modal = new ensemble.Modal(document.getElementById('inline-content-to-display'), {});\n\n")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-js"},"modal.open();\n\nmodal.close();\n")),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-html"},'<div id="inline-content-to-display">\n  <h6>Just an example.</h6>\n  <p>An inline content to display in a modal.</p>\n  <p>Lorem ipsum dolor sit amet.</p>\n</div>\n')),Object(o.b)(l.b,{mdxType:"ExampleModal"}))}u.isMDXComponent=!0}}]);