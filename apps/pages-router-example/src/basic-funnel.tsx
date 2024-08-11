"use client";
import { funnelOptions, useFunnelDefaultStep } from "@xionhub/funnel-core";
import { useFunnel } from "@xionhub/funnel-pages-router-adapter";
import { useRouter } from "next/router";

export const BasicFunnelOptions = () =>
  funnelOptions({
    steps: ["a", "b", "c"] as const,
    funnelId: "default-step",
  });

type Props = {
  setStep: () => void;
  step: string;
};

export const BasicFunnel = () => {
  const [Funnel, { createStep, step }] = useFunnel(BasicFunnelOptions());
  const router = useRouter();

  useFunnelDefaultStep(step, () => {
    router.replace(createStep("a"));
  });

  return (
    <Funnel>
      <Funnel.Step name="a">
        <FunnelItem
          setStep={() => {
            router.push(createStep("b"));
          }}
          step="a"
        />
      </Funnel.Step>
      <Funnel.Step name="b">
        <FunnelItem
          setStep={() => {
            router.push(createStep("c"));
          }}
          step="b"
        />
      </Funnel.Step>
      <Funnel.Step name="c">
        <FunnelItem
          setStep={() => {
            router.push(createStep("a"));
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
