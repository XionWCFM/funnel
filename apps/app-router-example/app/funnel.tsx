"use client";

import { useFunnel } from "@xionhub/funnel-app-router-adapter";
import { useEffect } from "react";

export default function ExampleFunnel() {
  const [Funnel, controller] = useFunnel(["a", "b", "c"] as const);
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!controller.step) {
      controller.onStepChange("a", { type: "replace" });
    }
  }, []);
  return (
    <>
      <Funnel>
        <Funnel.Step name={"a"}>
          <div className="">
            <div className="">current A</div>
            <button type="button" onClick={() => controller.onStepChange("b")}>
              next B
            </button>
          </div>
        </Funnel.Step>
        <Funnel.Step
          onFunnelRestrictEvent={() => {
            controller.onStepChange("a", { type: "replace" });
          }}
          name={"b"}
        >
          <Funnel.Guard
            condition={async () => {
              await new Promise((res) => setTimeout(res, 1000));
              return false;
            }}
            fallback={<div>hello world</div>}
          >
            <div className="">
              <div className="">current B</div>
              <button type="button" onClick={() => controller.onStepChange("c")}>
                next C
              </button>
            </div>
          </Funnel.Guard>
        </Funnel.Step>
        <Funnel.Step name={"c"}>
          <div className="">
            <div className="">current C</div>
            <button type="button" onClick={() => controller.onStepChange("a")}>
              next A
            </button>
          </div>
        </Funnel.Step>
      </Funnel>
    </>
  );
}
