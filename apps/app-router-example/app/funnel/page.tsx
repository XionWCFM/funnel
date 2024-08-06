import { Suspense } from "react";
import ExampleFunnel from "../funnel";

export default function Page() {
  return (
    <div>
      <Suspense>
        <ExampleFunnel />
      </Suspense>
    </div>
  );
}
