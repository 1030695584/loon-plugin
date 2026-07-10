// 菜鸟广告净化（安全增强版）
// 仅处理已确认的菜鸟接口；解析或结构异常时返回原响应，避免 App 闪退。
// 部分处理逻辑参考 ddgksf2013/cainiao_json.js，并做了容错与范围收敛。

const url = $request.url;
const originalBody = $response.body;

if (!originalBody) {
  $done({});
}

let obj;
try {
  obj = JSON.parse(originalBody);
} catch (error) {
  $done({ body: originalBody });
}

function filterHomepageDataList(container) {
  if (!container || !Array.isArray(container.dataList)) return;

  const blockedTypes = [
    "big_banner_area_v870",
    "todo_list_v860"
  ];

  container.dataList = container.dataList.filter((item) => {
    if (!item || typeof item !== "object") return true;

    const type = String(item.type || "").toLowerCase();
    if (blockedTypes.includes(type)) return false;

    return !(
      type.includes("banner_area") ||
      type.includes("promotion") ||
      type.includes("marketing")
    );
  });
}

try {
  if (url.includes("mtop.cainiao.nbpresentation.protocol.homepage.get.cn")) {
    filterHomepageDataList(obj?.data?.result);
  }

  if (url.includes("mtop.cainiao.nbpresentation.homepage.merge.get.cn")) {
    for (let index = 0; index < 8; index += 1) {
      const key = `mtop.cainiao.nbpresentation.protocol.homepage.get.cn@${index}`;
      filterHomepageDataList(obj?.data?.[key]?.data?.result);
    }
  }

  if (url.includes("mtop.cainiao.app.e2e.engine.page.fetch")) {
    const pageData = obj?.data?.data;
    if (pageData && typeof pageData === "object") {
      ["banner", "activity", "asset", "vip", "wallet"].forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(pageData, key)) {
          delete pageData[key];
        }
      });
    }
  }

  if (url.includes("mtop.cainiao.guoguo.nbnetflow.ads.mshow")) {
    const adData = obj?.data;
    if (adData && typeof adData === "object") {
      ["205", "1275", "1308", "1524", "1525", "1638", "1910"].forEach((key) => {
        if (Object.prototype.hasOwnProperty.call(adData, key)) {
          delete adData[key];
        }
      });
    }
  }

  if (url.includes("mtop.cainiao.guoguo.nbnetflow.ads.index.cn")) {
    if (obj?.data && Object.prototype.hasOwnProperty.call(obj.data, "result")) {
      // 保留接口预期的数组结构，避免直接 reject 导致客户端异常。
      obj.data.result = [{}];
    }
  }

  if (url.includes("mtop.cainiao.adkeyword")) {
    if (Array.isArray(obj?.data?.result?.adHotKeywords)) {
      obj.data.result.adHotKeywords = [];
    }
  }

  $done({ body: JSON.stringify(obj) });
} catch (error) {
  // 任意结构异常均返回原始响应，不破坏菜鸟正常功能。
  $done({ body: originalBody });
}
