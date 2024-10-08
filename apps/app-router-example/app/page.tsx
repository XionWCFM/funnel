"use client";
import { FunnelClient } from "@xionhub/funnel-client";
import Link from "next/link";
import { basicFunnelOptions } from "~/src/basic-funnel";
import { guardFunnelOptions } from "~/src/guard-funnel";
import { aFunnelOptions } from "~/src/nested-funnel";

export default function Home() {
  return (
    <div className=" flex flex-col gap-y-4">
      <Link href={new FunnelClient(basicFunnelOptions()).createStep("a")}>Go To Basic Funnel</Link>
      <Link href={new FunnelClient(aFunnelOptions()).createStep("astart")}>Go To Nested Funnel</Link>
      <Link href={new FunnelClient(guardFunnelOptions()).createStep("a")}>Go To Guard Funnel</Link>
      <Link href={"/default-step"}>Go To Default Step Funnel</Link>
    </div>
  );
}
