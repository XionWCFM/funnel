import { Suspense } from "react";
import { NestedFunnel } from "~/src/nested-funnel";

export default function Page() {
  return (
    <div>
      <Suspense>
        <NestedFunnel />
      </Suspense>
    </div>
  );
}
