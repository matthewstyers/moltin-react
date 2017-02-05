"use strict";function parseRelationshipType(t){var e=t+"s";return"category"===t&&(e="categories"),e}function cartIdentifier(t,e){void 0===t&&(t=!1),void 0===e&&(e=!1);var n=new StorageFactory;return t||e||null===n.get("mcart")?(e||(e="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/[x]/g,function(){return(16*Math.random()|0).toString(16)})),n.set("mcart",e),e):n.get("mcart")}function setHeaderContentType(t,e){var n="application/json";return"files"===t&&"POST"===e&&(n="multipart/form-data"),n}Object.defineProperty(exports,"__esModule",{value:!0});var fetchEverywhere=require("fetch-everywhere"),es6Promise=require("es6-promise"),Config=function(t){var e=t.clientId,n=t.clientSecret,o=t.currency,r=t.debug;void 0===r&&(r=!1);var i=t.language;void 0===i&&(i=!1);var s=t.protocol;void 0===s&&(s="https");var c=t.version;void 0===c&&(c="v1");var p="v1"===c?"api.molt.in":"api.moltin.com";this.clientId=e,this.clientSecret=n,this.host=p,this.port="443",this.protocol=s,this.version=c,this.debug=r,this.currency=o,this.language=i,this.timeout=6e4,this.auth={expires:3600,uri:"oauth/access_token"},this.methods=["GET","POST","PUT","DELETE"]},StorageFactory=function(){if("undefined"==typeof localStorage||null===localStorage){var t=require("node-localstorage").LocalStorage;this.localStorage=new t("./localStorage")}else this.localStorage=window.localStorage};StorageFactory.prototype.set=function(t,e){return this.localStorage.setItem(t,e)},StorageFactory.prototype.get=function(t){return this.localStorage.getItem(t)},StorageFactory.prototype.delete=function(t){return this.localStorage.removeItem(t)};var RequestFactory=function(t){this.config=t,this.storage=new StorageFactory};RequestFactory.prototype.authenticate=function(){var t=this.config,e=this.storage;if(t.clientId.length<=0)throw new Error("You must have a client id set");var n={grant_type:t.clientSecret?"client_credentials":"implicit",client_id:t.clientId};t.clientSecret&&(n.client_secret=t.clientSecret);var o=new Promise(function(e,o){fetch(t.protocol+"://"+t.host+"/"+t.auth.uri,{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:Object.keys(n).map(function(t){return encodeURIComponent(t)+"="+encodeURIComponent(n[t])}).join("&")}).then(function(t){if(200===t.status){var n=t.json();return e(n)}return e(t)}).then(null,function(t){return o(t)})});return o.then(function(t){e.set("mtoken",t.access_token),e.set("mexpires",t.expires)}),o},RequestFactory.prototype.send=function(t,e,n){var o=this,r=n,i=this.config,s=this.storage,c=new Promise(function(c,p){var u=Date.now().toString()>=s.get("mexpires"),a=function(){var o={Authorization:"Bearer: "+s.get("mtoken"),"Content-Type":setHeaderContentType(t,e)};i.currency&&(o["X-MOLTIN-CURRENCY"]=i.currency),"POST"!==e&&"PUT"!==e||(r='{"data":'+JSON.stringify(n)+"}"),fetch(i.protocol+"://"+i.host+"/"+i.version+"/"+t,{body:r,headers:o,method:e.toUpperCase()}).then(function(t){return c(t.json())}).catch(function(t){return p(t)})};return!s.get("mtoken")||u?o.authenticate().then(a).catch(function(t){return p(t)}):a()});return c};var BaseExtend=function(t){this.request=new RequestFactory(t),this.config=t};BaseExtend.prototype.Get=function(t,e){if("carts"===this.endpoint)return this.request.send(this.endpoint+"/"+this.cartId,"GET");if(e){var n=e.toString();return this.request.send(this.endpoint+"/"+t+"?include="+n,"GET")}return this.request.send(this.endpoint+"/"+t,"GET")};var CatalogueExtend=function(t){function e(){t.apply(this,arguments)}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.List=function(t){if(t){var e=t.toString();return this.request.send(this.endpoint+"?include="+e,"GET")}return this.request.send(""+this.endpoint,"GET")},e.prototype.Create=function(t){return this.request.send(""+this.endpoint,"POST",t)},e.prototype.Delete=function(t){return this.request.send(this.endpoint+"/"+t,"DELETE")},e.prototype.Update=function(t,e){return this.request.send(this.endpoint+"/"+t,"PUT",e)},e}(BaseExtend),ProductsEndpoint=function(t){function e(e){t.call(this,e),this.endpoint="products"}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.AddRelationship=function(t,e){var n=parseRelationshipType(e.type);return this.request.send(this.endpoint+"/"+t+"/relationships/"+n,"POST",[e])},e.prototype.DeleteRelationship=function(t,e){var n=parseRelationshipType(e.type);return this.request.send(this.endpoint+"/"+t+"/relationships/"+n,"DELETE",[e])},e}(CatalogueExtend),CurrenciesEndpoint=function(t){function e(e){t.call(this,e),this.endpoint="currencies",this.storage=new StorageFactory}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.List=function(){return this.request.send(""+this.endpoint,"GET")},e.prototype.Create=function(t){return this.request.send(""+this.endpoint,"POST",t)},e.prototype.Delete=function(t){return this.request.send(this.endpoint+"/"+t,"DELETE")},e.prototype.Update=function(t,e){return this.request.send(this.endpoint+"/"+t,"PUT",e)},e.prototype.Set=function(t){var e=this.storage,n=this.config;e.set("mcurrency",t),n.currency=t;var o=new Promise(function(t,n){var o=e.get("mcurrency");try{t(o)}catch(t){n(new Error(t))}});return o},e.prototype.Active=function(){var t=this.storage,e=new Promise(function(e,n){var o=t.get("mcurrency");try{e(o)}catch(t){n(new Error(t))}});return e},e}(BaseExtend),BrandsEndpoint=function(t){function e(e){t.call(this,e),this.endpoint="brands"}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(CatalogueExtend),CartEndpoint=function(t){function e(e){t.call(this,e),this.endpoint="carts",this.cartId=cartIdentifier()}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.Contents=function(){return this.request.send(this.endpoint+"/"+this.cartId+"/items","GET")},e.prototype.Insert=function(t,e){var n={id:t,quantity:parseInt(e)||1};return this.request.send(this.endpoint+"/"+this.cartId+"/items","POST",n)},e.prototype.Remove=function(t){return this.request.send(this.endpoint+"/"+this.cartId+"/items/"+t,"DELETE")},e.prototype.Quantity=function(t,e){var n={quantity:parseInt(e)};return this.request.send(this.endpoint+"/"+this.cartId+"/items/"+t,"PUT",n)},e.prototype.Complete=function(t){return this.request.send(this.endpoint+"/"+this.cartId+"/checkout","POST",t)},e.prototype.Delete=function(){return this.request.send(this.endpoint+"/"+this.cartId,"DELETE")},e}(BaseExtend),CategoriesEndpoint=function(t){function e(e){t.call(this,e),this.endpoint="categories"}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.Tree=function(){return this.request.send(this.endpoint+"/tree","GET")},e}(CatalogueExtend),CollectionsEndpoint=function(t){function e(e){t.call(this,e),this.endpoint="collections"}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e}(CatalogueExtend),OrdersEndpoint=function(t){function e(e){t.call(this,e),this.endpoint="orders"}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.List=function(){return this.request.send(""+this.endpoint,"GET")},e.prototype.Payment=function(t,e){return this.request.send(this.endpoint+"/"+t+"/payments","POST",e)},e}(BaseExtend),GatewaysEndpoint=function(t){function e(e){t.call(this,e),this.endpoint="gateways"}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.List=function(){return this.request.send(""+this.endpoint,"GET")},e.prototype.Update=function(t,e){return this.request.send(this.endpoint+"/"+t,"PUT",e)},e.prototype.Enabled=function(t,e){return this.request.send(this.endpoint+"/"+t,"PUT",{type:"gateway",enabled:e})},e}(BaseExtend),FilesEndpoint=function(t){function e(e){t.call(this,e),this.endpoint="files"}return t&&(e.__proto__=t),e.prototype=Object.create(t&&t.prototype),e.prototype.constructor=e,e.prototype.List=function(){return this.request.send(""+this.endpoint,"GET")},e.prototype.Create=function(t){return this.request.send(""+this.endpoint,"POST",t)},e.prototype.Delete=function(t){return this.request.send(this.endpoint+"/"+t,"DELETE")},e}(BaseExtend),Moltin=function(t){this.config=t,this.request=new RequestFactory(t),this.storage=new StorageFactory,this.Products=new ProductsEndpoint(t),this.Currencies=new CurrenciesEndpoint(t),this.Brands=new BrandsEndpoint(t),this.Cart=new CartEndpoint(t),this.Categories=new CategoriesEndpoint(t),this.Collections=new CollectionsEndpoint(t),this.Orders=new OrdersEndpoint(t),this.Gateways=new GatewaysEndpoint(t),this.Files=new FilesEndpoint(t)};Moltin.prototype.Authenticate=function(){return this.request.authenticate()};var MoltinClient=function(t){return new Moltin(new Config(t))};exports.default=Moltin,exports.MoltinClient=MoltinClient;
//# sourceMappingURL=moltin.cjs.js.map
