import { Suspense } from "react";
import { BasicFunnel } from "~/src/basic-funnel";

export default function Page() {
  return (
    <div>
      <Suspense>
        <BasicFunnel />
      </Suspense>
    </div>
  );
}
