import { funnelOptions } from "@xionhub/funnel-core";

const EXAMPLE_FUNNEL_ID = "hello-this-is-funnel-id";
export const exampleFunnelOptions = () =>
  funnelOptions({
    steps: ["a", "b", "c"] as const,
    funnelId: EXAMPLE_FUNNEL_ID,
  });
