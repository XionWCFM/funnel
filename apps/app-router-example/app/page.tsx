"use client";
import { FunnelClient } from "@xionhub/funnel-client";
import Link from "next/link";
import { exampleFunnelOptions } from "~/src/example-funnel";
import { aFunnelOptions } from "~/src/nested-funnel";

export default function Home() {
  const funnelClient = new FunnelClient(exampleFunnelOptions());

  return (
    <div className=" flex flex-col gap-y-4">
      <Link href={`/funnel?${funnelClient.createStep("a")}`}>퍼널로 이동하기</Link>
      <Link href={`/nested?${new FunnelClient(aFunnelOptions()).createStep("astart")}`}>nested 퍼널로 이동하기</Link>
    </div>
  );
}
