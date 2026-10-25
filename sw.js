/* 考研英语一 · 单词速刷表 —— Service Worker
 * 作用：满足 PWA 安装条件（fetch handler + 离线可用），并缓存页面与图标。
 * 位置：必须与 HTML 同级（放子目录会导致 scope 受限，无法安装）。
 *
 * 更新网页后：把下面的 CACHE 版本号 +1（如 dkz-v2），旧缓存会自动清理。
 */

const CACHE = 'dkz-v1';

const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches
      .open(CACHE)
      // 单个资源失败不影响安装：addAll 整体失败会让 SW 装不上
      .then((c) => Promise.all(ASSETS.map((u) => c.add(u).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  let url;
  try {
    url = new URL(req.url);
  } catch (err) {
    return;
  }
  // 只处理同源请求，第三方资源直接放行
  if (url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(req).then((hit) => {
      if (hit) return hit;
      return fetch(req)
        .then((res) => {
          if (res && (res.type === 'basic' || res.type === 'cors') && res.status === 200) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
