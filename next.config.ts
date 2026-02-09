import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone", // use this setting if deploying via docker
};

export default withPayload(nextConfig);
