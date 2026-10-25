# 考研英语一 · 单词速刷表 —— 图标套装

按考频从高到低排列的考研英语一单词速刷表，配套的网页图标全套素材。

## 当前配色

| 用途 | 色值 |
|---|---|
| 花瓣（叶） | `#7CB342` |
| 描边 | `#33691E` |
| 花心 | `#FFF59D` |
| 图标背景 | `#E3F0D9` |
| 页面主题色 | `#E7EFE3` |

## 仓库结构（部署用）

```
index.html              ← 主页面，图标已内联为 data URI，可单独打开
sw.js                   ← Service Worker，PWA 安装必需（必须与 index.html 同级）
manifest.webmanifest    ← PWA 声明，图标指向 favicon/ 下的 PNG
icon-192.png            ← Android 主屏幕
icon-512.png            ← Android 启动画面 / PWA
icon-maskable-512.png   ← Android 自适应图标
```

> `icon-*.png` 与 `favicon/android-chrome-*.png` 内容相同：前者供根目录的 manifest 引用，后者是完整素材包的一份。

## favicon/ 素材包（备份，非必需）

| 文件 | 尺寸 | 用途 |
|---|---|---|
| `favicon.ico` | 16/32/48/256 | 传统标签页、Windows 快捷方式 |
| `favicon.svg` | 矢量 | 现代浏览器标签页，任意缩放清晰 |
| `favicon-16x16.png` | 16 | 标签页、书签栏（专用加粗版） |
| `favicon-32x32.png` | 32 | 高 DPI 标签页、书签 |
| `favicon-48x48.png` | 48 | Windows 站点图标 |
| `favicon-64x64.png` | 64 | 高分辨率快捷方式 |
| `favicon-96x96.png` | 96 | Android 桌面 |
| `apple-touch-icon.png` | 180 | iOS / iPadOS 添加到主屏幕 |
| `android-chrome-192x192.png` | 192 | Android 主屏幕 |
| `android-chrome-512x512.png` | 512 | Android 启动画面 / PWA |
| `android-chrome-512x512-maskable.png` | 512 | Android 自适应图标（内容留安全边距） |
| `safari-pinned-tab.svg` | 矢量 | Safari 固定标签页（单色蒙版） |
| `mstile-150x150.png` | 150 | Windows 磁贴 |
| `browserconfig.xml` | — | Windows 磁贴配置（旧版） |
| `site.webmanifest` | — | 备用 PWA 声明 |
| `preview.html` | — | 图标多场景预览页（电脑上双击打开） |
| `README.md` | — | 本文档 |

## 部署到 GitHub Pages

1. 把上面的文件全部推到仓库（**根目录**）
2. 仓库 Settings → Pages → 选择分支（如 `main`）与目录 `/ (root)` → Save
3. 等 1–3 分钟生效

部署后用 **Edge / Chrome** 打开站点，地址栏右侧会出现「安装」图标，点击即可装到桌面 / 开始菜单，装好后**断网也能用**。

## 更新页面后

改了 `index.html` 内容，记得把 `sw.js` 顶部的版本号 +1：

```js
const CACHE = 'dkz-v1';   // → 'dkz-v2'
```

否则已安装的用户可能仍看到缓存的旧页面。

## 设计说明

- **16×16 单独做了加粗版**：原图 22/512 的描边缩到 16px 只有约 0.7px，会糊成一团；小尺寸版把描边加到 30、整体放大 6%，保证标签页能看出五瓣花与花心。
- **32px 及以上用原版**：线条更细腻，五瓣分离清楚。
- **maskable 版**：Android 自适应图标可能裁成圆形/方形/水滴形，内容缩到 85%，保证任何裁切都不切花。
