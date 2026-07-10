// Cainiao interface diagnostic script for Loon
// Logs only likely UI / advertising / operation endpoints. It does not modify traffic.

const rawUrl = $request && $request.url ? $request.url : "";
let normalized = rawUrl;

try {
  const parsed = new URL(rawUrl);
  normalized = `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
} catch (error) {
  normalized = rawUrl.split("?")[0];
}

const lower = normalized.toLowerCase();
const keywords = [
  "homepage",
  "home.",
  ".home",
  "mine",
  "e2e.engine",
  "presentation",
  "nbnetflow",
  "ads.",
  ".ads",
  "adkeyword",
  "activity",
  "market",
  "longquan",
  "creditmarket",
  "wallet",
  "vip",
  "banner",
  "promotion",
  "marketing",
  "recommend",
  "cpc",
  "widget",
  "guoguouser",
  "bird",
  "feed",
  "game",
  "reward",
  "coin",
  "energy",
  "welfare",
  "bottom.area",
  "tabbar",
  "conversation.list"
];

if (keywords.some((word) => lower.includes(word))) {
  console.log(`[CainiaoDebug][candidate] ${normalized}`);

  if (typeof $response !== "undefined" && $response && $response.body) {
    let summary = "";
    try {
      const obj = JSON.parse($response.body);
      const data = obj && obj.data;
      const keys = data && typeof data === "object" ? Object.keys(data).slice(0, 30) : [];
      summary = ` dataKeys=${JSON.stringify(keys)}`;
    } catch (error) {
      summary = ` bodyLength=${$response.body.length}`;
    }

    console.log(`[CainiaoDebug][response] status=${$response.status || "unknown"}${summary}`);
  }
}

$done({});
