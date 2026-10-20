import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default {
  // This tells OpenNext to use the Next.js binary directly,
  // avoiding the recursive "npm run build" call.
  buildCommand: "node_modules/.bin/next build",
  ...defineCloudflareConfig({
    // Your other OpenNext configurations can go here
  }),
};