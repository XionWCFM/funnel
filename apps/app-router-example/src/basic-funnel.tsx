"use client";
import { useFunnel } from "@xionhub/funnel-app-router-adapter";
import { funnelOptions } from "@xionhub/funnel-core";
import { useRouter } from "next/navigation";

const BASIC_FUNNEL_ID = "hello-this-is-funnel-id";
export const basicFunnelOptions = () =>
  funnelOptions({
    steps: ["a", "b", "c"] as const,
    funnelId: BASIC_FUNNEL_ID,
  });

type Props = {
  setStep: () => void;
  step: string;
};

export const BasicFunnel = () => {
  const [Funnel, controller] = useFunnel(basicFunnelOptions());
  const router = useRouter();
  return (
    <Funnel>
      <Funnel.Step name="a">
        <FunnelItem
          setStep={() => {
            router.push(`/funnel?${controller.funnelClient.createStep("b")}`);
          }}
          step="a"
        />
      </Funnel.Step>
      <Funnel.Step name="b">
        <FunnelItem
          setStep={() => {
            router.push(`/funnel?${controller.funnelClient.createStep("c")}`);
          }}
          step="b"
        />
      </Funnel.Step>
      <Funnel.Step name="c">
        <FunnelItem
          setStep={() => {
            router.push(`/funnel?${controller.funnelClient.createStep("a")}`);
          }}
          step="c"
        />
      </Funnel.Step>
    </Funnel>
  );
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
