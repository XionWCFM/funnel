"use client";

import { useFunnel } from "@xionhub/funnel-app-router-adapter";
import { funnelOptions } from "@xionhub/funnel-core";
import { useRouter, useSearchParams } from "next/navigation";

export const aFunnelOptions = () => funnelOptions({ funnelId: "sadkl", steps: ["astart", "ado", "aend"] as const });

export const bFunnelOptions = () => funnelOptions({ funnelId: "sadkl2", steps: ["bstart", "bdo", "bend"] as const });

export const NestedFunnel = () => {
  const [AFunnel, aController] = useFunnel(aFunnelOptions());
  const [BFunnel, bController] = useFunnel(bFunnelOptions());
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    <div className=" px-16 py-16">
      <AFunnel>
        <AFunnel.Step name={"astart"}>
          <FunnelItem
            setStep={() => {
              router.push(`/nested?${aController.funnelClient.createStep("ado")}`);
            }}
            step={"astart"}
          />
        </AFunnel.Step>
        <AFunnel.Step name={"ado"}>
          <FunnelItem
            setStep={() => {
              router.push(
                `/nested?${bController.funnelClient.createStep("bstart", searchParams, aController.funnelId)}`,
              );
            }}
            step={"ado"}
          />
        </AFunnel.Step>
        <AFunnel.Step name={"aend"}>
          <FunnelItem
            setStep={() => {
              router.push(`/nested?${aController.funnelClient.createStep("astart")}`);
            }}
            step={"aend"}
          />
        </AFunnel.Step>
      </AFunnel>

      <BFunnel>
        <BFunnel.Step name={"bstart"}>
          <FunnelItem
            setStep={() => {
              router.push(`/nested?${bController.funnelClient.createStep("bdo")}`);
            }}
            step={"bstart"}
          />
        </BFunnel.Step>
        <BFunnel.Step name={"bdo"}>
          <FunnelItem
            setStep={() => {
              router.push(`/nested?${bController.funnelClient.createStep("bend")}`);
            }}
            step={"bdo"}
          />
        </BFunnel.Step>
        <BFunnel.Step name={"bend"}>
          <FunnelItem
            setStep={() => {
              router.push(`/nested?${aController.funnelClient.createStep("aend", searchParams, bController.funnelId)}`);
            }}
            step={"bend"}
          />
        </BFunnel.Step>
      </BFunnel>
    </div>
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
