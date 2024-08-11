import { funnelOptions } from "@xionhub/funnel-core";
import { useFunnel } from "@xionhub/funnel-react-router-dom-adapter";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const basicFunnelOptions = () => funnelOptions({ funnelId: "hello", steps: ["start", "do", "end"] as const });

function App() {
  const navigate = useNavigate();
  const [Funnel, { createStep, step }] = useFunnel(basicFunnelOptions());

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!step) {
      navigate(createStep("start"), { replace: true });
    }
  }, []);

  return (
    <>
      <Funnel>
        <Funnel.Step name={"start"}>
          <FunnelItem
            step={"start"}
            setStep={() => {
              navigate(createStep("do"));
            }}
          />
        </Funnel.Step>
        <Funnel.Step name={"do"}>
          <FunnelItem
            step={"do"}
            setStep={() => {
              navigate(createStep("end"));
            }}
          />
        </Funnel.Step>
        <Funnel.Step name={"end"}>
          <FunnelItem
            step={"end"}
            setStep={() => {
              navigate(createStep("start"));
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
