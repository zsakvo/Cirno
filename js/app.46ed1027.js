(function(e){function n(n){for(var a,s,c=n[0],u=n[1],i=n[2],d=0,f=[];d<c.length;d++)s=c[d],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&f.push(r[s][0]),r[s]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);l&&l(n);while(f.length)f.shift()();return o.push.apply(o,i||[]),t()}function t(){for(var e,n=0;n<o.length;n++){for(var t=o[n],a=!0,s=1;s<t.length;s++){var c=t[s];0!==r[c]&&(a=!1)}a&&(o.splice(n--,1),e=u(u.s=t[0]))}return e}var a={},s={app:0},r={app:0},o=[];function c(e){return u.p+"js/"+({}[e]||e)+"."+{"chunk-12dbe09a":"e73a041d","chunk-16163519":"eed7ea72","chunk-2f41c2ac":"6a39b1d2","chunk-3323db9f":"b96d1e3d","chunk-1edb8035":"30e2dca9","chunk-25fe453d":"e8142627"}[e]+".js"}function u(n){if(a[n])return a[n].exports;var t=a[n]={i:n,l:!1,exports:{}};return e[n].call(t.exports,t,t.exports,u),t.l=!0,t.exports}u.e=function(e){var n=[],t={"chunk-12dbe09a":1,"chunk-16163519":1,"chunk-2f41c2ac":1,"chunk-3323db9f":1,"chunk-1edb8035":1,"chunk-25fe453d":1};s[e]?n.push(s[e]):0!==s[e]&&t[e]&&n.push(s[e]=new Promise((function(n,t){for(var a="css/"+({}[e]||e)+"."+{"chunk-12dbe09a":"bc3e6467","chunk-16163519":"af774a2d","chunk-2f41c2ac":"3f94b8eb","chunk-3323db9f":"0c33a476","chunk-1edb8035":"7ca621c9","chunk-25fe453d":"77681bcd"}[e]+".css",r=u.p+a,o=document.getElementsByTagName("link"),c=0;c<o.length;c++){var i=o[c],d=i.getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(d===a||d===r))return n()}var f=document.getElementsByTagName("style");for(c=0;c<f.length;c++){i=f[c],d=i.getAttribute("data-href");if(d===a||d===r)return n()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=n,l.onerror=function(n){var a=n&&n.target&&n.target.src||r,o=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=a,delete s[e],l.parentNode.removeChild(l),t(o)},l.href=r;var _=document.getElementsByTagName("head")[0];_.appendChild(l)})).then((function(){s[e]=0})));var a=r[e];if(0!==a)if(a)n.push(a[2]);else{var o=new Promise((function(n,t){a=r[e]=[n,t]}));n.push(a[2]=o);var i,d=document.createElement("script");d.charset="utf-8",d.timeout=120,u.nc&&d.setAttribute("nonce",u.nc),d.src=c(e);var f=new Error;i=function(n){d.onerror=d.onload=null,clearTimeout(l);var t=r[e];if(0!==t){if(t){var a=n&&("load"===n.type?"missing":n.type),s=n&&n.target&&n.target.src;f.message="Loading chunk "+e+" failed.\n("+a+": "+s+")",f.name="ChunkLoadError",f.type=a,f.request=s,t[1](f)}r[e]=void 0}};var l=setTimeout((function(){i({type:"timeout",target:d})}),12e4);d.onerror=d.onload=i,document.head.appendChild(d)}return Promise.all(n)},u.m=e,u.c=a,u.d=function(e,n,t){u.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:t})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,n){if(1&n&&(e=u(e)),8&n)return e;if(4&n&&"object"===typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(u.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)u.d(t,a,function(n){return e[n]}.bind(null,a));return t},u.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(n,"a",n),n},u.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},u.p="",u.oe=function(e){throw console.error(e),e};var i=window["webpackJsonp"]=window["webpackJsonp"]||[],d=i.push.bind(i);i.push=n,i=i.slice();for(var f=0;f<i.length;f++)n(i[f]);var l=d;o.push([0,"chunk-vendors"]),t()})({0:function(e,n,t){e.exports=t("56d7")},"034f":function(e,n,t){"use strict";var a=t("85ec"),s=t.n(a);s.a},"34f1":function(module,__webpack_exports__,__webpack_require__){"use strict";var core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("c975"),core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(core_js_modules_es_array_index_of__WEBPACK_IMPORTED_MODULE_0__),core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("d3b7"),core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__),axios__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("bc3a"),axios__WEBPACK_IMPORTED_MODULE_2___default=__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_2__);axios__WEBPACK_IMPORTED_MODULE_2___default.a.defaults.timeout=1500,axios__WEBPACK_IMPORTED_MODULE_2___default.a.defaults.baseUrl="";var vm=null,mixin={headers:{"Content-Type":"application/json;charset-utf-8"},timeout:3e4,withCredentials:!0,urlParas:{app_version:"2.5.016",device_token:"ciweimao_scf_server"}};function get(obj){var urlParas=Object.assign({},mixin.urlParas,obj.urlParas,{login_token:window.localStorage.getItem("login_token"),account:window.localStorage.getItem("account")}),headers=Object.assign({},mixin.headers,obj.headers),url=window.localStorage.getItem("baseUrl")+obj.url;return new Promise((function(resolve,reject){axios__WEBPACK_IMPORTED_MODULE_2___default.a.get(url,{headers:headers,params:urlParas,timeout:mixin.timeout,withCredentials:mixin.withCredentials}).then((function(response){var res=response.data;"string"===typeof res&&(res=eval("("+res+")")),1e5==res["code"]||-1!=url.indexOf("get_meta_data")?resolve(res):vm.prototype.$message.error(res.tip)})).catch((function(e){console.log(e),reject(e)}))}))}function post(e){var n=mixin;n=Object.assign({},n,e);var t=n.paras,a=n.baseUrl+n.url,s=this;return new Promise((function(e,r){axios__WEBPACK_IMPORTED_MODULE_2___default.a.post(a,t,{headers:n.header,params:n.urlParas,timeout:n.timeout,withCredentials:n.withCredentials,cancelToken:new axios__WEBPACK_IMPORTED_MODULE_2___default.a.CancelToken((function(e){s.axiosCancel={},s.axiosCancel[n.url]=e}))}).then((function(n){var t=n.data;t.success?e(t):(vm.prototype.$message.error(t.tip),r(t))}),(function(e){}))}))}function put(e){return new Promise((function(n,t){axios__WEBPACK_IMPORTED_MODULE_2___default.a.put(e.url,e.data).then((function(e){n(e.data)}),(function(e){t(e)}))}))}axios__WEBPACK_IMPORTED_MODULE_2___default.a.interceptors.request.use((function(e){return e}),(function(e){return Promise.reject(e)}));var $cirnoHttp={install:install,version:"0.0.1"};function install(e){vm=e,install.installed||(install.installed=!0,e.prototype.$post=post,e.prototype.$get=get,e.prototype.$put=put)}__webpack_exports__["a"]=$cirnoHttp},4678:function(e,n,t){var a={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function s(e){var n=r(e);return t(n)}function r(e){if(!t.o(a,e)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return a[e]}s.keys=function(){return Object.keys(a)},s.resolve=r,e.exports=s,s.id="4678"},"56d7":function(e,n,t){"use strict";t.r(n);t("e260"),t("e6cf"),t("cca6"),t("a79d");var a=t("2b0e"),s=function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{attrs:{id:"app"}},[t("keep-alive",[t("router-view")],1)],1)},r=[],o={name:"app",data:function(){return{}},components:{},created:function(){localStorage.getItem("baseUrl")||this.$router.push({name:"Settings"})},methods:{}},c=o,u=(t("034f"),t("2877")),i=Object(u["a"])(c,s,r,!1,null,null,null),d=i.exports,f=t("9483");Object(f["a"])("".concat("","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});t("d3b7");var l=t("8c4f");a["a"].use(l["a"]);var _=[{path:"/book",name:"Book",component:function(){return Promise.all([t.e("chunk-16163519"),t.e("chunk-2f41c2ac")]).then(t.bind(null,"968f"))}},{path:"/login",name:"Login",component:function(){return t.e("chunk-12dbe09a").then(t.bind(null,"a55b"))}},{path:"/settings",name:"Settings",component:function(){return t.e("chunk-1edb8035").then(t.bind(null,"26d3"))}},{path:"/",name:"Index",component:function(){return t.e("chunk-25fe453d").then(t.bind(null,"d504"))}},{path:"/about",name:"About",component:function(){return Promise.all([t.e("chunk-16163519"),t.e("chunk-3323db9f")]).then(t.bind(null,"f820"))}}],b=new l["a"]({base:"",routes:_}),j=b,p=t("2f62");a["a"].use(p["a"]);var h=new p["a"].Store({state:{baseUrl:"",prop_info:{},reader_info:{}},mutations:{setBaseUrl:function(e,n){e.baseUrl=n},setPropInfo:function(e,n){e.prop_info=n},setReaderInfo:function(e,n){e.reader_info=n}},actions:{},modules:{}}),m=(t("7f6b"),t("8592")),g=(t("9d5c"),t("a600")),v=(t("5136"),t("681b")),k=(t("ee00"),t("bb76")),y=(t("922d"),t("09d9")),E=(t("5783"),t("59a5")),w=(t("cd17"),t("ed3b")),P=(t("d015"),t("7071")),O=(t("cc70"),t("1fd5")),x=(t("3b18"),t("f64c")),M=(t("fbd8"),t("55f1")),D=(t("8fb1"),t("0c63")),C=(t("5704"),t("b558")),T=(t("6ba6"),t("5efb")),A=(t("68c7"),t("de1b"));a["a"].use(A["a"]),a["a"].use(T["a"]),a["a"].use(C["a"]),a["a"].use(D["a"]),a["a"].use(M["a"]),a["a"].use(x["a"]),a["a"].use(O["a"]),a["a"].use(P["a"]),a["a"].use(A["a"]),a["a"].use(w["a"]),a["a"].use(E["a"]),a["a"].use(y["a"]),a["a"].use(k["a"]),a["a"].use(v["a"]),a["a"].use(g["a"]),a["a"].use(m["a"]),a["a"].prototype.$message=x["a"];var U=t("34f1");t("ab05");a["a"].config.productionTip=!1,U["a"].install(a["a"]),new a["a"]({router:j,store:h,render:function(e){return e(d)}}).$mount("#app")},"85ec":function(e,n,t){}});