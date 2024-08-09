"use client";
import { FunnelClient } from "@xionhub/funnel-client";
import Link from "next/link";
import { exampleFunnelOptions } from "~/src/example-funnel";

export default function Home() {
  const funnelClient = new FunnelClient(exampleFunnelOptions());
  return (
    <div>
      <Link href={`/funnel${funnelClient.createStep("a")}`}>퍼널로 이동하기</Link>
    </div>
  );
}
