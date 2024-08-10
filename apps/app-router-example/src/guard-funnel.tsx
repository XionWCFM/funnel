"use client";

import { useFunnel } from "@xionhub/funnel-app-router-adapter";
import { funnelOptions } from "@xionhub/funnel-core";
import { useRouter } from "next/navigation";
import { overlay } from "overlay-kit";

export const guardFunnelOptions = () =>
  funnelOptions({
    steps: ["a", "b", "c"] as const,
    funnelId: "guard-funnel",
  });

export const GuardFunnel = () => {
  const [Funnel, controller] = useFunnel(guardFunnelOptions());
  const router = useRouter();
  return (
    <Funnel>
      <Funnel.Step name="a">
        <FunnelItem
          setStep={() => {
            router.push(`/guard?${controller.createStep("b")}`);
          }}
          step="a"
        />
      </Funnel.Step>
      <Funnel.Step name="b">
        <Funnel.Guard
          condition={async () => {
            if (Math.random() > 0.5) {
              return true;
            }
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return false;
          }}
          onRestrict={async () => {
            const confirm = await overlay.openAsync(
              ({ close, isOpen }) =>
                isOpen && (
                  <div>
                    <div>Funnel is restricted</div>
                    <button onClick={() => close(true)}>go to step a</button>
                    <button onClick={() => close(false)}>go to root page</button>
                  </div>
                ),
            );
            if (confirm) {
              router.push(`/guard?${controller.createStep("a")}`);
            } else {
              router.push("/");
            }
          }}
          fallback={<>... funnel validation</>}
        >
          <FunnelItem
            setStep={() => {
              router.push(`/guard?${controller.createStep("c")}`);
            }}
            step="b"
          />
        </Funnel.Guard>
      </Funnel.Step>

      <Funnel.Step name="c">
        <FunnelItem
          setStep={() => {
            router.push(`/guard?${controller.createStep("a")}`);
          }}
          step="c"
        />
      </Funnel.Step>
    </Funnel>
  );
};

type Props = {
  setStep: () => void;
  step: string;
};

const FunnelItem = ({ setStep, step }: Props) => {
  return (
    <div className=" flex flex-col gap-y-16 justify-center items-center">
      <div>current location {step}</div>
      <button className=" bg-purple-400 rounded-full py-4 px-4" onClick={() => setStep()}>
        go to next funnel
      </button>
    </div>
  );
};
