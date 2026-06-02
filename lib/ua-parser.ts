import { UAParser } from "ua-parser-js";

interface ParsedUA {
  device: string;
  browser: string;
  os: string;
}

export function parseUserAgent(ua: string): ParsedUA {
  const parser = new UAParser(ua);
  const result = parser.getResult();

  const deviceType = result.device.type;
  let device = "desktop";
  if (deviceType === "mobile") device = "mobile";
  else if (deviceType === "tablet") device = "tablet";

  return {
    device,
    browser: result.browser.name || "Unknown",
    os: result.os.name || "Unknown",
  };
}
