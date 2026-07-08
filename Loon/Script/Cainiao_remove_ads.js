// Cainiao_remove_ads.js
// Loon script: remove Cainiao homepage feed ads / banners / marketing cards.
// 2026-07-08

const url = $request.url;
if (!$response.body) $done({});

let obj;
try {
  obj = JSON.parse($response.body);
} catch (e) {
  $done({});
}

function removeKeys(target, keys) {
  if (!target || typeof target !== "object") return;
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(target, key)) delete target[key];
  }
}

function hasBadSignal(value) {
  if (!value || typeof value !== "object") return false;

  const badKeys = [
    "adItemDetail",
    "advRecGmtModifiedTime",
    "adInfo",
    "adExtInfo",
    "adTraceInfo",
    "adBizType",
    "adSource",
    "adType",
    "adId",
    "advertiseInfo",
    "advertisement",
    "promotionInfo",
    "marketingInfo",
    "cpcInfo",
    "adxInfo"
  ];

  for (const key of Object.keys(value)) {
    if (badKeys.includes(key)) return true;
  }

  const text = JSON.stringify(value);
  return [
    "\"广告\"",
    "广告",
    "推广",
    "营销",
    "抽奖",
    "领券",
    "红包",
    "福利",
    "膨胀",
    "最高得",
    "adItemDetail",
    "advRecGmtModifiedTime",
    "common_header_banner",
    "kuaishou_banner",
    "banner_area",
    "promotion",
    "marketing",
    "advertise",
    "cpc",
    "adx"
  ].some((k) => text.includes(k));
}

function deepClean(value, depth = 0) {
  if (depth > 12) return value;

  if (Array.isArray(value)) {
    return value
      .filter((item) => !hasBadSignal(item))
      .map((item) => deepClean(item, depth + 1));
  }

  if (value && typeof value === "object") {
    for (const key of Object.keys(value)) {
      const lower = key.toLowerCase();

      if (
        lower.includes("advert") ||
        lower === "ad" ||
        lower === "ads" ||
        lower.includes("adinfo") ||
        lower.includes("adtrace") ||
        lower.includes("marketing") ||
        lower.includes("promotion") ||
        lower.includes("cpc") ||
        lower.includes("adx")
      ) {
        delete value[key];
        continue;
      }

      value[key] = deepClean(value[key], depth + 1);
    }
  }

  return value;
}

// 新版我的页面
if (url.includes("/mtop.cainiao.app.e2e.engine.page.fetch")) {
  if (obj?.data?.data) {
    removeKeys(obj.data.data, ["activity", "asset", "banner", "content", "vip", "wallet", "marketing", "promotion"]);
  }
}

// 我的页面
if (url.includes("/mtop.cainiao.app.mine.main")) {
  if (obj?.data) {
    removeKeys(obj.data, ["activity", "asset", "banner", "content", "marketing", "promotion"]);
  }
}

// 首页 / 我的页广告流
if (url.includes("/mtop.cainiao.guoguo.nbnetflow.ads.show")) {
  if (obj?.data?.result?.length > 0) {
    obj.data.result = obj.data.result.filter((i) => !hasBadSignal(i));
    for (let i of obj.data.result) {
      if (i?.materialContentMapper?.show_tips_content) i.materialContentMapper.show_tips_content = "";
    }
  }
}

// 首页瀑布流广告位
if (url.includes("/mtop.cainiao.guoguo.nbnetflow.ads.mshow")) {
  if (obj?.data) {
    const items = [
      "10", "498", "328", "366", "369", "615", "616", "727", "793", "954",
      "1275", "1308", "1316", "1332", "1340", "1391", "1410", "1428",
      "1524", "1525", "1638", "1910", "29338", "29339", "32103", "33927", "36649"
    ];
    removeKeys(obj.data, items);
  }
}

// 取件页面
if (url.includes("/mtop.cainiao.nbpresentation.pickup.empty.page.get")) {
  if (obj?.data?.result?.content?.middle?.length > 0) {
    obj.data.result.content.middle = obj.data.result.content.middle.filter(
      (i) =>
        ![
          "guoguo_pickup_empty_page_relation_add",
          "guoguo_pickup_helper_feedback",
          "guoguo_pickup_helper_tip_view"
        ].includes(i?.template?.name)
    );
  }
}

// 首页协议 / 聚合页面
if (url.includes("/mtop.cainiao.nbpresentation.protocol.homepage.get") || url.includes("/mtop.cainiao.nbpresentation.homepage.merge.get")) {
  if (obj?.data?.result?.dataList?.length > 0) {
    let newLists = [];
    for (let item of obj.data.result.dataList) {
      const type = String(item?.type || "");
      if (type.includes("banner_area") || type.includes("promotion") || type.includes("marketing") || hasBadSignal(item)) {
        continue;
      }

      if (type.includes("kingkong") && item?.bizData?.items?.length > 0) {
        for (let i of item.bizData.items) {
          i.rightIcon = null;
          i.bubbleText = null;
        }
      }

      if (type.includes("icons_scroll") && item?.bizData?.items?.length > 0) {
        const allow = ["appCentreMore", "dzb", "jdj", "kddh", "yfjsq"];
        item.bizData.items = item.bizData.items.filter((i) => allow.includes(i?.key));
        for (let i of item.bizData.items) {
          i.rightIcon = null;
          i.bubbleText = null;
        }
      }

      newLists.push(item);
    }
    obj.data.result.dataList = newLists;
  }
}

// 消息中心，只保留物流消息
if (url.includes("/mtop.nbfriend.message.conversation.list")) {
  if (obj?.data?.data?.length > 0) {
    obj.data.data = obj.data.data.filter((i) => i?.conversationId?.includes("logistic_message"));
  }
}

// 强力兜底：对菜鸟 mtop 响应递归清理广告节点
if (/\/gw\/mtop\.(cainiao|com\.cainiao|nbfriend)\./.test(url)) {
  obj = deepClean(obj);
}

$done({ body: JSON.stringify(obj) });
