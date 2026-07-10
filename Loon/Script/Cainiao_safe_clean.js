// 菜鸟广告净化（极简安全版）
// 仅处理明确的菜鸟页面/广告接口；任何解析或结构异常均返回原响应，避免 App 闪退。
// 处理范围：首页、包裹页、发现运营模块、我的页、广告流、搜索热词。

(() => {
  const url = $request.url;
  const originalBody = $response.body;

  if (!originalBody) {
    $done({});
    return;
  }

  let obj;
  try {
    obj = JSON.parse(originalBody);
  } catch (error) {
    $done({ body: originalBody });
    return;
  }

  const blockedKeywords = [
    "红包乐园",
    "欢乐赢红包",
    "地图寻宝",
    "签到领红包",
    "分享赚现金",
    "包裹账单",
    "热门活动",
    "绿色回收",
    "旧衣回收",
    "宝贝交换",
    "物换物",
    "喂小鸟",
    "裹酱商城",
    "找裹酱",
    "赚裹酱",
    "菜鸟问问",
    "惊喜福利",
    "幸运抽奖",
    "空调毯",
    "88VIP得",
    "赢100万红包",
    "最高1000元",
    "特惠活动",
    "新人专享",
    "推荐商品",
    "商品推广"
  ];

  const blockedTypes = [
    "big_banner_area_v870",
    "todo_list_v860",
    "banner_area",
    "promotion",
    "marketing",
    "activity",
    "welfare",
    "benefit",
    "game",
    "bird",
    "feed",
    "exchange",
    "coupon",
    "recommend_goods",
    "product_recommend"
  ];

  const blockedAdIds = new Set([
    "10", "205", "328", "366", "369", "498", "615", "616", "618", "727",
    "793", "954", "1275", "1308", "1316", "1332", "1340", "1391", "1410",
    "1428", "1524", "1525", "1638", "1910", "29338", "29339", "32103",
    "33927", "36649"
  ]);

  function textOf(value) {
    try {
      return JSON.stringify(value || {});
    } catch (error) {
      return "";
    }
  }

  function containsBlockedKeyword(value) {
    const text = textOf(value);
    return blockedKeywords.some((keyword) => text.includes(keyword));
  }

  function containsBlockedType(value) {
    const type = String(value?.type || value?.template?.name || value?.group_id || "").toLowerCase();
    return blockedTypes.some((blocked) => type.includes(blocked));
  }

  function isPromotionalItem(item) {
    if (!item || typeof item !== "object") return false;

    const id = String(item.id || item.positionId || item.adId || "");
    if (blockedAdIds.has(id)) return true;
    if (containsBlockedType(item)) return true;
    if (containsBlockedKeyword(item)) return true;

    const mapper = item.materialContentMapper;
    if (mapper && typeof mapper === "object") {
      if (mapper.adItemDetail || mapper.advRecGmtModifiedTime || mapper.adInfo) return true;
      if (["common_header_banner", "entertainment", "interests", "kuaishou_banner"].includes(mapper.group_id)) {
        return true;
      }
    }

    return false;
  }

  function cleanNestedItems(item) {
    if (!item || typeof item !== "object") return item;

    const candidateArrays = [
      item?.bizData?.items,
      item?.items,
      item?.list,
      item?.children,
      item?.modules
    ];

    candidateArrays.forEach((array) => {
      if (!Array.isArray(array)) return;
      const cleaned = array.filter((child) => !isPromotionalItem(child));
      array.splice(0, array.length, ...cleaned);
    });

    if (Array.isArray(item?.bizData?.items)) {
      item.bizData.items.forEach((child) => {
        if (child && typeof child === "object") {
          child.rightIcon = null;
          child.bubbleText = null;
          child.redDot = null;
          child.tips = null;
        }
      });
    }

    return item;
  }

  function cleanHomepageContainer(container) {
    if (!container || !Array.isArray(container.dataList)) return;

    container.dataList = container.dataList
      .filter((item) => !isPromotionalItem(item))
      .map(cleanNestedItems);
  }

  function deepDeleteKeys(value, keys, depth = 0) {
    if (!value || typeof value !== "object" || depth > 8) return;

    if (Array.isArray(value)) {
      for (let index = value.length - 1; index >= 0; index -= 1) {
        if (isPromotionalItem(value[index])) {
          value.splice(index, 1);
        } else {
          deepDeleteKeys(value[index], keys, depth + 1);
        }
      }
      return;
    }

    Object.keys(value).forEach((key) => {
      if (keys.has(key.toLowerCase())) {
        delete value[key];
        return;
      }
      deepDeleteKeys(value[key], keys, depth + 1);
    });
  }

  function cleanMinePage(pageData) {
    if (!pageData || typeof pageData !== "object") return;

    const removableKeys = new Set([
      "activity",
      "asset",
      "banner",
      "content",
      "vip",
      "wallet",
      "marketing",
      "promotion",
      "welfare",
      "benefit",
      "exchange",
      "coupon",
      "game",
      "bird",
      "feed"
    ]);

    deepDeleteKeys(pageData, removableKeys);
  }

  function cleanAdsShow() {
    const result = obj?.data?.result;
    if (!Array.isArray(result)) return;

    obj.data.result = result.filter((item) => !isPromotionalItem(item));
    obj.data.result.forEach((item) => {
      if (item?.materialContentMapper?.show_tips_content) {
        item.materialContentMapper.show_tips_content = "";
      }
    });
  }

  function cleanAdsMshow() {
    const adData = obj?.data;
    if (!adData || typeof adData !== "object") return;

    blockedAdIds.forEach((id) => {
      if (Object.prototype.hasOwnProperty.call(adData, id)) {
        delete adData[id];
      }
    });

    Object.keys(adData).forEach((key) => {
      if (isPromotionalItem(adData[key])) {
        delete adData[key];
      }
    });
  }

  try {
    if (url.includes("mtop.cainiao.nbpresentation.protocol.homepage.get.cn")) {
      cleanHomepageContainer(obj?.data?.result);
    }

    if (url.includes("mtop.cainiao.nbpresentation.homepage.merge.get.cn")) {
      Object.keys(obj?.data || {}).forEach((key) => {
        if (key.includes("mtop.cainiao.nbpresentation.protocol.homepage.get.cn@")) {
          cleanHomepageContainer(obj?.data?.[key]?.data?.result);
        }
      });
    }

    if (url.includes("mtop.cainiao.app.e2e.engine.page.fetch")) {
      cleanMinePage(obj?.data?.data);
    }

    if (url.includes("mtop.cainiao.app.mine.main")) {
      cleanMinePage(obj?.data);
    }

    if (url.includes("mtop.cainiao.guoguo.nbnetflow.ads.show")) {
      cleanAdsShow();
    }

    if (url.includes("mtop.cainiao.guoguo.nbnetflow.ads.mshow")) {
      cleanAdsMshow();
    }

    if (url.includes("mtop.cainiao.guoguo.nbnetflow.ads.index.cn")) {
      if (obj?.data && Object.prototype.hasOwnProperty.call(obj.data, "result")) {
        // 保留接口预期结构，清空“大家都在逛”商品瀑布流。
        obj.data.result = [{}];
      }
    }

    if (url.includes("mtop.cainiao.adkeyword")) {
      if (Array.isArray(obj?.data?.result?.adHotKeywords)) {
        obj.data.result.adHotKeywords = [];
      }
      if (Array.isArray(obj?.data?.result?.hotKeywords)) {
        obj.data.result.hotKeywords = [];
      }
    }

    if (url.includes("mtop.nbfriend.message.conversation.list")) {
      if (Array.isArray(obj?.data?.data)) {
        obj.data.data = obj.data.data.filter((item) =>
          String(item?.conversationId || "").includes("logistic_message")
        );
      }
    }

    $done({ body: JSON.stringify(obj) });
  } catch (error) {
    $done({ body: originalBody });
  }
})();
