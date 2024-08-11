import { FunnelClient } from "@xionhub/funnel-client";
import { funnelOptions, useCoreFunnel } from "@xionhub/funnel-core";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
const basicFunnelOptions = () => funnelOptions({ funnelId: "hello", steps: ["start", "do", "end"] as const });

function App() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryStep = searchParams.get(basicFunnelOptions().funnelId) ?? undefined;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [Funnel] = useCoreFunnel({ ...basicFunnelOptions(), step: queryStep as any });
  const funnelClient = new FunnelClient(basicFunnelOptions());
  const navigate = useNavigate();
  useEffect(() => {
    if (!queryStep) {
      navigate(`?${funnelClient.createStep("start")}`);
    }
  });
  return (
    <>
      <Funnel>
        <Funnel.Step name={"start"}>
          <FunnelItem
            step={"start"}
            setStep={() => {
              navigate(`?${funnelClient.createStep("do")}`);
            }}
          />
        </Funnel.Step>
        <Funnel.Step name={"do"}>
          <FunnelItem
            step={"do"}
            setStep={() => {
              navigate(`?${funnelClient.createStep("end")}`);
            }}
          />
        </Funnel.Step>
        <Funnel.Step name={"end"}>
          <FunnelItem
            step={"end"}
            setStep={() => {
              navigate(`?${funnelClient.createStep("start")}`);
            }}
          />
        </Funnel.Step>
      </Funnel>
    </>
  );
}

export default App;

type Props = {
  step: string;
  setStep: () => void;
};

const FunnelItem = ({ step, setStep }: Props) => {
  return (
    <div>
      <h1>current : {step}</h1>
      <button onClick={setStep}>go to Next</button>
    </div>
  );
};
