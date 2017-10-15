const VERSION = 'v1'

// 缓存
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(VERSION).then(cache => {
      return cache.addAll([
        './index.html',
        './index.js',
        './style.css',
        './member.png'
      ])
    })
  )
})

// 缓存更新
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          // 如果当前版本和缓存版本不一致
          if (cacheName !== VERSION) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        caches.open(VERSION).then(function(cache) {
          cache.put(event.request, response.clone());
        });
        return response;
      });
    }).catch(function() {
      return caches.match('./member.jpg');
    })
  );
});

// 捕获请求并返回缓存数据
// self.addEventListener('fetch', event => {
//   console.log(111, event)
//   event.respondWith(caches.match(event.request).catch(() => {
//     return fetch(event.request)
//   }).then(response => {
//     console.log(response)
//     caches.open(VERSION).then(cache => {
//       cache.put(event.request, response)
//     })
//     return response.clone()
//   }).catch(err => {
//     console.log(err)
//     return caches.match('./member.jpg')
//   }))
// })