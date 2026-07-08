// Cainiao ad cleaner for Loon
// Focus: homepage cards, promotional banners, red dots, and ad containers.

const url = $request.url;
let body = $response.body;

if (!body) {
  $done({});
}

let obj;
try {
  obj = JSON.parse(body);
} catch (e) {
  $done({});
}

function removeKeys(target, keys) {
  if (!target || typeof target !== "object") return;
  for (const key of keys) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      delete target[key];
    }
  }
}

function cleanCommonFlags(item) {
  if (!item || typeof item !== "object") return item;
  removeKeys(item, [
    "rightIcon",
    "bubbleText",
    "redDot",
    "redDotText",
    "tips",
    "tagIcon",
    "cornerMark",
    "marketingTag"
  ]);
  return item;
}

function isAdLike(item) {
  const text = JSON.stringify(item || {}).toLowerCase();
  return [
    "aditemdetail",
    "advrecgmtmodifiedtime",
    "advert",
    "advertise",
    "promotion",
    "activity",
    "banner_area",
    "banner",
    "marketing",
    "cpc",
    "adx",
    "cash",
    "hongbao",
    "红包",
    "抽奖",
    "领券",
    "福利",
    "会员",
    "推广",
    "广告"
  ].some((k) => text.includes(k));
}

// 首页广告位接口：mtop.cainiao.guoguo.nbnetflow.ads.mshow / show
if (/mtop\.cainiao\.guoguo\.nbnetflow\.ads\.m?show/.test(url)) {
  if (obj?.data && typeof obj.data === "object") {
    const blockedIds = [
      "10", "328", "366", "369", "498", "615", "616", "727", "793", "954",
      "1275", "1308", "1316", "1332", "1340", "1391", "1410", "1428", "1524",
      "1525", "1638", "1910", "29338", "29339", "32103", "33927", "36649"
    ];
    removeKeys(obj.data, blockedIds);

    if (Array.isArray(obj.data.result)) {
      obj.data.result = obj.data.result.filter((item) => !isAdLike(item));
      obj.data.result.forEach((item) => {
        if (item?.materialContentMapper?.show_tips_content) {
          item.materialContentMapper.show_tips_content = "";
        }
      });
    }
  }
}

// 首页聚合接口：mtop.cainiao.nbpresentation.protocol.homepage.get / homepage.merge
if (/mtop\.cainiao\.nbpresentation\.(protocol\.homepage|homepage\.merge)\.get/.test(url)) {
  const list = obj?.data?.result?.dataList;
  if (Array.isArray(list)) {
    obj.data.result.dataList = list.filter((item) => {
      const type = String(item?.type || "").toLowerCase();
      if (["banner", "banner_area", "promotion", "marketing", "activity", "ad"].some((k) => type.includes(k))) {
        return false;
      }
      return !isAdLike(item);
    });

    for (const item of obj.data.result.dataList) {
      if (Array.isArray(item?.bizData?.items)) {
        item.bizData.items = item.bizData.items.map(cleanCommonFlags).filter((i) => !isAdLike(i));
      }
    }
  }
}

// 首页 Tabbar 营销接口
if (/mtop\.cainiao\.(app\.home\.tabbar\.marketing|nbpresentation\.tabbar\.marketing)\.get/.test(url)) {
  obj.data = {};
}

// 我的页 / 新版我的页推广
if (/mtop\.cainiao\.app\.(mine\.main|e2e\.engine\.page\.fetch)/.test(url)) {
  const target = obj?.data?.data || obj?.data;
  removeKeys(target, ["activity", "asset", "banner", "content", "vip", "wallet", "marketing", "promotion"]);
}

// 消息中心推广，只保留物流消息
if (/mtop\.nbfriend\.message\.conversation\.list/.test(url)) {
  if (Array.isArray(obj?.data?.data)) {
    obj.data.data = obj.data.data.filter((i) => String(i?.conversationId || "").includes("logistic_message"));
  }
}

$done({ body: JSON.stringify(obj) });
