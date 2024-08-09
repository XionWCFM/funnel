"use client";

import { useFunnel } from "@xionhub/funnel-app-router-adapter";
import { useRouter } from "next/navigation";
import { overlay } from "overlay-kit";
import { exampleFunnelOptions } from "~/src/example-funnel";

export default function ExampleFunnel() {
  const [Funnel, controller] = useFunnel(exampleFunnelOptions());
  const router = useRouter();
  const createStep = (newValue: "a" | "b" | "c") => {
    return `/funnel${controller.funnelClient.createStep(newValue)}`;
  };
  return (
    <div className=" px-4 py-4">
      <Funnel>
        <Funnel.Step name={"a"}>
          <FunnelA
            nextStep={() => {
              router.push(createStep("b"));
            }}
          />
        </Funnel.Step>

        <Funnel.Step name={"b"}>
          <Funnel.Guard
            condition={() => {
              return Math.random() > 0.5;
            }}
            onRestrict={async () => {
              await overlay.openAsync(({ close, unmount }) => (
                <div>
                  <div>접근할 수 없는 상태에요</div>
                  <button
                    type="button"
                    onClick={() => {
                      close(true);
                      unmount();
                    }}
                  >
                    처음 화면으로 돌아가기
                  </button>
                </div>
              ));
              router.replace(createStep("a"));
            }}
            fallback={<div>fallback..</div>}
          >
            <FunnelB
              nextStep={() => {
                router.push(createStep("c"));
              }}
            />
          </Funnel.Guard>
        </Funnel.Step>

        <Funnel.Step name={"c"}>
          <FunnelC
            nextStep={() => {
              router.push(createStep("a"));
            }}
          />
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
