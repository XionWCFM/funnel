"use client";

import { useFunnel } from "@xionhub/funnel-app-router-adapter";
import { useEffect } from "react";

const EXAMPLE_FUNNEL_ID = "hello-this-is-funnel-id";
export default function ExampleFunnel() {
  const [Funnel, controller] = useFunnel(["a", "b", "c"] as const, {
    funnelId: EXAMPLE_FUNNEL_ID,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    controller.onStepChange("a");
  }, []);
  return (
    <div className=" px-4 py-4">
      <Funnel>
        <Funnel.Step name={"a"}>
          <FunnelA nextStep={() => controller.onStepChange("b")} />
        </Funnel.Step>

        <Funnel.Step name={"b"}>
          <Funnel.Guard
            condition={async () => {
              await new Promise((res) => setTimeout(res, 1000));
              return false;
            }}
            onFunnelRestrictEvent={() => {
              controller.onStepChange("a", { type: "replace" });
            }}
            fallback={<div>hello world</div>}
          >
            <FunnelB nextStep={() => controller.onStepChange("c")} />
          </Funnel.Guard>
        </Funnel.Step>

        <Funnel.Step name={"c"}>
          <FunnelC nextStep={() => controller.onStepChange("a")} />
        </Funnel.Step>
      </Funnel>
    </div>
  );
}

type FunnelProps = {
  nextStep: () => void;
};

const FunnelA = (props: FunnelProps) => {
  const { nextStep } = props;
  return (
    <div>
      <div>current A</div>
      <button type="button" onClick={nextStep}>
        next button
      </button>
    </div>
  );
};
const FunnelB = (props: FunnelProps) => {
  const { nextStep } = props;
  return (
    <div>
      <div>current B</div>
      <button type="button" onClick={nextStep}>
        next button
      </button>
    </div>
  );
};
const FunnelC = (props: FunnelProps) => {
  const { nextStep } = props;
  return (
    <div>
      <div>current C</div>
      <button type="button" onClick={nextStep}>
        next button
      </button>
    </div>
  );
};
