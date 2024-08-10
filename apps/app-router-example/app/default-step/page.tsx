import { Suspense } from "react";
import { DefaultStepFunnel } from "~/src/default-step-funnel";

export default function Page() {
  return (
    <div>
      <Suspense>
        <DefaultStepFunnel />
      </Suspense>
    </div>
  );
}
