# Loon Plugin

自用 Loon 插件仓库。目前包含：

- **美团外卖去广告**：去除开屏广告、视频广告、启动图广告。

---

## 🚀 一键安装

> 建议在 iPhone / iPad 上用 **Safari** 打开。  
> 已改为 Loon 官方统一链接：`https://www.nsloon.com/openloon/...`，比直接写 `loon://` 更稳。

### 美团外卖去广告

[🚀 点击一键导入 Loon](https://www.nsloon.com/openloon/import?plugin=https%3A%2F%2Fraw.githubusercontent.com%2F1030695584%2Floon-plugin%2Fmain%2FLoon%2FPlugin%2FMeituanWaimai_remove_ads.lpx)

备用 Scheme，适合复制到 Safari 地址栏打开：

```text
loon://import?plugin=https%3A%2F%2Fraw.githubusercontent.com%2F1030695584%2Floon-plugin%2Fmain%2FLoon%2FPlugin%2FMeituanWaimai_remove_ads.lpx
```

如果一键导入没有反应，使用下面的手动安装方式。

---

## 📦 手动安装

### 方式一：Loon 插件页面导入

1. 打开 **Loon**。
2. 进入 **插件 / Plugin**。
3. 点击右上角 **+**。
4. 选择 **URL**。
5. 粘贴下面链接：

```text
https://raw.githubusercontent.com/1030695584/loon-plugin/main/Loon/Plugin/MeituanWaimai_remove_ads.lpx
```

### 方式二：写入主配置 `[Plugin]`

把下面这一行添加到 Loon 主配置的 `[Plugin]` 区域：

```ini
https://raw.githubusercontent.com/1030695584/loon-plugin/main/Loon/Plugin/MeituanWaimai_remove_ads.lpx, enabled=true
```

---

## 🔧 插件列表

| 插件名称 | 文件路径 | 一键导入 | Raw 链接 |
|---|---|---|---|
| 美团外卖去广告 | `Loon/Plugin/MeituanWaimai_remove_ads.lpx` | [导入](https://www.nsloon.com/openloon/import?plugin=https%3A%2F%2Fraw.githubusercontent.com%2F1030695584%2Floon-plugin%2Fmain%2FLoon%2FPlugin%2FMeituanWaimai_remove_ads.lpx) | [查看](https://raw.githubusercontent.com/1030695584/loon-plugin/main/Loon/Plugin/MeituanWaimai_remove_ads.lpx) |

---

## 🧩 美团外卖去广告说明

### 拦截内容

- 美团外卖开屏广告图片
- 美团外卖开屏广告视频
- 美团配送 / 外卖启动图
- 美团广告素材资源

### MITM 域名

插件内已包含以下 MITM 域名：

```ini
hostname = img.meituan.net, s3plus.meituan.net, peisongapi.meituan.com, flowplus.meituan.net
```

### 注意事项

1. 需要在 Loon 中安装并信任 HTTPS 证书。
2. 如果主配置里已经有相同 Rewrite 规则，建议删除重复规则，只保留插件。
3. 如果美团外卖更新广告接口，可能需要同步更新插件规则。
4. 启用插件后，建议完全退出美团外卖，再重新打开测试。
5. GitHub App 内点击一键导入可能无响应，优先用 Safari 打开仓库页面再点击。

---

## 🧪 当前插件内容预览

```ini
#!name=美团外卖去广告
#!desc=去除美团外卖开屏广告/视频广告/启动图
#!category=广告拦截
#!icon=https://raw.githubusercontent.com/qsoyq/icons/main/assets/icon/waimai.meituan.png

[Rewrite]
# 美团外卖开屏广告图片
^https?:\/\/img\.meituan\.net\/bizad\/bizad_brandCpt_\d+\.jpg(\.webp)? reject

# 美团外卖视频广告
^https?:\/\/s3plus\.meituan\.net\/.*\/brandcpt-vedio\/.* reject-200

# 美团配送/外卖启动图
^https?:\/\/peisongapi\.meituan\.com\/client\/getInitiateImage reject-200

# 美团广告素材
^https?:\/\/flowplus\.meituan\.net\/v\d\/\w+\/linglong\/\d+\.(gif|jpg|mp4) reject

[MITM]
hostname = img.meituan.net, s3plus.meituan.net, peisongapi.meituan.com, flowplus.meituan.net
```

---

## ✅ 推荐使用方式

优先使用插件订阅方式：

```ini
https://raw.githubusercontent.com/1030695584/loon-plugin/main/Loon/Plugin/MeituanWaimai_remove_ads.lpx, enabled=true
```

这样以后只需要更新 GitHub 仓库里的 `.lpx` 文件，Loon 端刷新插件即可同步。