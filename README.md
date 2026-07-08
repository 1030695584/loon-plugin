# Loon Plugin

> 自用 Loon 插件仓库，主要用于收集、整理、维护适配 Loon 的去广告插件。  
> 当前已维护：**美团外卖去广告**、**菜鸟去广告**。

---

## 📌 项目简介

这个仓库用于存放 Loon 可直接订阅的 `.lpx` 插件文件。插件规则会尽量保持：

- **可直接导入**：支持 Loon 一键导入、URL 导入、主配置 `[Plugin]` 引用。
- **结构清晰**：所有插件统一放在 `Loon/Plugin/` 目录下。
- **方便维护**：后续新增插件时，只需要新增 `.lpx` 文件并更新插件列表。
- **减少误配置**：避免把 `[Rewrite]`、`[MITM]` 规则直接塞进主配置导致混乱。

---

## 📁 目录结构

```text
loon-plugin
├── README.md
└── Loon
    └── Plugin
        ├── MeituanWaimai_remove_ads.lpx
        └── Cainiao_remove_ads.lpx
```

| 路径 | 说明 |
|---|---|
| `README.md` | 项目说明、安装教程、插件列表 |
| `Loon/Plugin/` | Loon 插件目录 |
| `MeituanWaimai_remove_ads.lpx` | 美团外卖去广告插件 |
| `Cainiao_remove_ads.lpx` | 菜鸟去广告插件 |

---

## 🚀 一键安装

> 建议在 iPhone / iPad 上用 **Safari** 打开。  
> 使用 Loon 官方统一链接：`https://www.nsloon.com/openloon/...`，比直接写 `loon://` 更适合网页点击。

### 美团外卖去广告

[🚀 点击一键导入 Loon](https://www.nsloon.com/openloon/import?plugin=https%3A%2F%2Fraw.githubusercontent.com%2F1030695584%2Floon-plugin%2Fmain%2FLoon%2FPlugin%2FMeituanWaimai_remove_ads.lpx)

备用 Scheme：

```text
loon://import?plugin=https%3A%2F%2Fraw.githubusercontent.com%2F1030695584%2Floon-plugin%2Fmain%2FLoon%2FPlugin%2FMeituanWaimai_remove_ads.lpx
```

### 菜鸟去广告

[🚀 点击一键导入 Loon](https://www.nsloon.com/openloon/import?plugin=https%3A%2F%2Fraw.githubusercontent.com%2F1030695584%2Floon-plugin%2Fmain%2FLoon%2FPlugin%2FCainiao_remove_ads.lpx)

备用 Scheme：

```text
loon://import?plugin=https%3A%2F%2Fraw.githubusercontent.com%2F1030695584%2Floon-plugin%2Fmain%2FLoon%2FPlugin%2FCainiao_remove_ads.lpx
```

如果一键导入没有反应，使用下面的手动安装方式。

---

## 📦 手动安装

### 方式一：Loon 插件页面导入

1. 打开 **Loon**。
2. 进入 **插件 / Plugin**。
3. 点击右上角 **+**。
4. 选择 **URL**。
5. 粘贴对应插件 Raw 链接。

#### 美团外卖去广告

```text
https://raw.githubusercontent.com/1030695584/loon-plugin/main/Loon/Plugin/MeituanWaimai_remove_ads.lpx
```

#### 菜鸟去广告

```text
https://raw.githubusercontent.com/1030695584/loon-plugin/main/Loon/Plugin/Cainiao_remove_ads.lpx
```

### 方式二：写入主配置 `[Plugin]`

把需要的插件添加到 Loon 主配置的 `[Plugin]` 区域：

```ini
https://raw.githubusercontent.com/1030695584/loon-plugin/main/Loon/Plugin/MeituanWaimai_remove_ads.lpx, enabled=true
https://raw.githubusercontent.com/1030695584/loon-plugin/main/Loon/Plugin/Cainiao_remove_ads.lpx, enabled=true
```

---

## 🔧 插件列表

| 插件名称 | 功能 | 文件路径 | 一键导入 | Raw 链接 |
|---|---|---|---|---|
| 美团外卖去广告 | 去除开屏广告、视频广告、启动图广告 | `Loon/Plugin/MeituanWaimai_remove_ads.lpx` | [导入](https://www.nsloon.com/openloon/import?plugin=https%3A%2F%2Fraw.githubusercontent.com%2F1030695584%2Floon-plugin%2Fmain%2FLoon%2FPlugin%2FMeituanWaimai_remove_ads.lpx) | [查看](https://raw.githubusercontent.com/1030695584/loon-plugin/main/Loon/Plugin/MeituanWaimai_remove_ads.lpx) |
| 菜鸟去广告 | 去除首页广告、开屏广告、信息流广告 | `Loon/Plugin/Cainiao_remove_ads.lpx` | [导入](https://www.nsloon.com/openloon/import?plugin=https%3A%2F%2Fraw.githubusercontent.com%2F1030695584%2Floon-plugin%2Fmain%2FLoon%2FPlugin%2FCainiao_remove_ads.lpx) | [查看](https://raw.githubusercontent.com/1030695584/loon-plugin/main/Loon/Plugin/Cainiao_remove_ads.lpx) |

---

## 🧩 美团外卖去广告说明

### 插件信息

| 项目 | 内容 |
|---|---|
| 插件名称 | 美团外卖去广告 |
| 文件名 | `MeituanWaimai_remove_ads.lpx` |
| 适用客户端 | Loon |
| 主要作用 | 拦截美团外卖开屏广告、视频广告、启动图广告 |
| 是否需要 MITM | 需要 |

### 拦截内容

- 美团外卖开屏广告图片
- 美团外卖开屏广告视频
- 美团配送 / 外卖启动图
- 美团广告素材资源

### MITM 域名

```ini
hostname = img.meituan.net, s3plus.meituan.net, peisongapi.meituan.com, flowplus.meituan.net
```

---

## 🧩 菜鸟去广告说明

### 插件信息

| 项目 | 内容 |
|---|---|
| 插件名称 | 菜鸟去广告 |
| 文件名 | `Cainiao_remove_ads.lpx` |
| 适用客户端 | Loon |
| 主要作用 | 拦截菜鸟首页广告、信息流广告、开屏广告、广告曝光上报 |
| 是否需要 MITM | 需要 |

### 拦截内容

- 菜鸟首页广告
- 菜鸟信息流广告
- 菜鸟广告关键词 / 广告位接口
- 菜鸟开屏 / 启动图广告
- 菜鸟广告曝光、点击、上报请求

### MITM 域名

```ini
hostname = guide-acs.m.taobao.com, cn-acs.m.cainiao.com, acs.m.taobao.com
```

---

## ✅ 使用前准备

使用前建议确认下面几项：

1. **Loon 已开启 MitM**。
2. **已安装并信任 Loon 证书**。
3. 插件已启用。
4. App 已完全退出并重新打开。
5. 如果之前手动写过相同 Rewrite 规则，建议删除重复规则，只保留插件。

---

## 🧪 当前插件内容预览

### 美团外卖去广告

```ini
#!name=美团外卖去广告
#!desc=去除美团外卖开屏广告/视频广告/启动图
#!category=广告拦截
#!icon=https://raw.githubusercontent.com/qsoyq/icons/main/assets/icon/waimai.meituan.png

[Rewrite]
^https?:\/\/img\.meituan\.net\/bizad\/bizad_brandCpt_\d+\.jpg(\.webp)? reject
^https?:\/\/s3plus\.meituan\.net\/.*\/brandcpt-vedio\/.* reject-200
^https?:\/\/peisongapi\.meituan\.com\/client\/getInitiateImage reject-200
^https?:\/\/flowplus\.meituan\.net\/v\d\/\w+\/linglong\/\d+\.(gif|jpg|mp4) reject

[MITM]
hostname = img.meituan.net, s3plus.meituan.net, peisongapi.meituan.com, flowplus.meituan.net
```

### 菜鸟去广告

```ini
#!name=菜鸟去广告
#!desc=去除菜鸟 App 首页广告、开屏广告、信息流广告
#!category=广告拦截
#!icon=https://raw.githubusercontent.com/Koolson/Qure/master/IconSet/Color/Cainiao.png

[Rewrite]
^https?:\/\/guide-acs\.m\.taobao\.com\/gw\/mtop\.cainiao\.guoguo\.nbnetflow\.ads\..* reject-dict
^https?:\/\/guide-acs\.m\.taobao\.com\/gw\/mtop\.cainiao\.adkeyword\..* reject-dict
^https?:\/\/guide-acs\.m\.taobao\.com\/gw\/mtop\.cainiao\..*(splash|startup|launch|advert|advertise|ad)\..* reject-dict
^https?:\/\/guide-acs\.m\.taobao\.com\/gw\/mtop\.cainiao\..*(expose|click|track|report).*(ad|ads|advert).* reject
^https?:\/\/(guide-acs\.m\.taobao\.com|cn-acs\.m\.cainiao\.com|acs\.m\.taobao\.com)\/.*(ad|ads|advert|advertise|splash|startup).* reject-dict

[MITM]
hostname = guide-acs.m.taobao.com, cn-acs.m.cainiao.com, acs.m.taobao.com
```

---

## 🛠️ 常见问题

### 1. 点击一键导入没反应

优先用 **Safari** 打开仓库页面再点击。GitHub App、微信、QQ、部分内置浏览器可能会拦截跳转。

也可以复制备用 Scheme 到 Safari 地址栏。

### 2. 插件导入成功，但广告还在

按顺序检查：

1. Loon 是否开启。
2. 插件是否启用。
3. MITM 是否开启。
4. 证书是否已安装并信任。
5. 是否完全退出对应 App 后重新打开。
6. App 是否已更新广告接口，导致现有规则未命中。

### 3. 是否可以直接复制 Rewrite 到主配置？

可以，但不推荐。推荐使用 `[Plugin]` 引用，后续规则更新更方便。

### 4. 插件会不会影响正常使用？

当前规则主要针对广告接口和广告上报接口。如果出现页面异常、无法刷新等情况，先临时关闭对应插件确认。

---

## 🔄 更新方式

### Loon 端刷新

进入 Loon 插件页面，刷新对应插件即可获取仓库最新版本。

### 仓库维护

后续新增插件时，建议保持以下命名规范：

```text
Loon/Plugin/AppName_remove_ads.lpx
```

---

## 📝 更新记录

### 2026-07-08

- 新增 `MeituanWaimai_remove_ads.lpx`。
- 新增 `Cainiao_remove_ads.lpx`。
- 新增美团外卖去广告规则。
- 新增菜鸟去广告规则。
- 完善 README 项目说明、一键导入、插件列表、常见问题。
- 修复一键导入链接，改用 Loon 官方统一链接。

---

## ⚠️ 免责声明

本仓库仅用于个人学习和自用规则整理。规则可能因 App 接口变化而失效，请自行判断是否使用。