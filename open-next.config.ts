import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default {
  // Force Webpack instead of Turbopack (fixes the 500 error)
  buildCommand: "node_modules/.bin/next build --webpack",
  ...defineCloudflareConfig(),
};