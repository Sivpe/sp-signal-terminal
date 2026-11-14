/* SP Gold Trading service worker — app shell offline backup.
   Strategy: network-first for everything same-origin, so live data
   (page, news JSON, events JSON) is never stuck stale; the cache is
   only a fallback when the network is gone. */
var CACHE = "sp-gold-v9";
var SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-180.png"];
self.addEventListener("install", function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(SHELL); }).then(function(){ return self.skipWaiting(); }));
});
self.addEventListener("activate", function(e){
  e.waitUntil(caches.keys().then(function(keys){
    return Promise.all(keys.filter(function(k){ return k !== CACHE; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});
self.addEventListener("fetch", function(e){
  if(e.request.method !== "GET") return;
  /* Never intercept the MT5 live link (*.ts.net): the browser must make that
     call directly (Chrome Private Network Access checks break when a
     service worker proxies a local-network request). */
  if(e.request.url.indexOf(".ts.net") !== -1) return;
  /* Never cache private/API-style JSON fetches cross-origin at all. */
  if(e.request.url.indexOf("scalp.json") !== -1) return;
  e.respondWith(
    fetch(e.request).then(function(res){
      var copy = res.clone();
      caches.open(CACHE).then(function(c){ c.put(e.request, copy); });
      return res;
    }).catch(function(){
      return caches.match(e.request, {ignoreSearch: true});
    })
  );
});
