// Cainiao interface diagnostic script for Loon
// Logs normalized Cainiao URLs only. It does not modify requests or responses.

const rawUrl = $request && $request.url ? $request.url : "";
let normalized = rawUrl;

try {
  const parsed = new URL(rawUrl);
  normalized = `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
} catch (error) {
  normalized = rawUrl.split("?")[0];
}

console.log(`[CainiaoDebug] ${normalized}`);

if (typeof $response !== "undefined" && $response && $response.body) {
  console.log(`[CainiaoDebug][response] status=${$response.status || "unknown"} bodyLength=${$response.body.length}`);
}

$done({});
