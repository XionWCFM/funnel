import { Suspense } from "react";
import ExampleFunnel from "./funnel";

export default function Home() {
  return (
    <div>
      <Suspense>
        <ExampleFunnel />
      </Suspense>
    </div>
  );
}
