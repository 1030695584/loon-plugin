const scriptName = "美团外卖开屏去广告";

try {
  const body = $response && $response.body;
  if (!body) {
    $done({});
  } else {
    const obj = JSON.parse(body);

    const clearStartPicture = (container) => {
      if (!container || typeof container !== "object") return false;

      let changed = false;
      const keys = ["startpicture", "startPicture", "openScreen", "openscreen", "splash"];

      for (const key of keys) {
        if (!Object.prototype.hasOwnProperty.call(container, key)) continue;

        const value = container[key];
        if (value && typeof value === "object" && !Array.isArray(value)) {
          if (Object.prototype.hasOwnProperty.call(value, "ad")) value.ad = [];
          if (Object.prototype.hasOwnProperty.call(value, "ads")) value.ads = [];
          if (Object.prototype.hasOwnProperty.call(value, "mk")) value.mk = [];
          if (Object.prototype.hasOwnProperty.call(value, "list")) value.list = [];
          if (Object.prototype.hasOwnProperty.call(value, "data")) value.data = [];
          value.duration = 0;
          value.showTime = 0;
          value.countdown = 0;
        } else {
          container[key] = [];
        }
        changed = true;
      }

      return changed;
    };

    clearStartPicture(obj);
    clearStartPicture(obj.data);
    clearStartPicture(obj.result);

    $done({ body: JSON.stringify(obj) });
  }
} catch (error) {
  console.log(`[${scriptName}] 处理失败：${error}`);
  $done({});
}
