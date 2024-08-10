import { Suspense } from "react";
import { GuardFunnel } from "~/src/guard-funnel";

export default function Page() {
  return (
    <div>
      <Suspense>
        <GuardFunnel />
      </Suspense>
    </div>
  );
}
