![usefunnel thumbnail](/thumbnail.png)

# useFunnel

Manage your funnels declaratively and explicitly.

# Quick Start

## next.js app router

### Installation

```
npm i qs @xionhub/funnel-core @xionhub/funnel-client @xionhub/funnel-app-router-adapter
```

```
yarn add qs @xionhub/funnel-core @xionhub/funnel-client @xionhub/funnel-app-router-adapter
```

```
pnpm i qs @xionhub/funnel-core @xionhub/funnel-client @xionhub/funnel-app-router-adapter
```

### create funnelOptions

```tsx
import { funnelOptions } from "@xionhub/funnel-core";

const basicFunnelOptions = () =>
  funnelOptions({
    steps: ["a", "b", "c"] as const,
    funnelId: "hello-this-is-funnel-id",
  });
```

### import useFunnel

```tsx
"use client";
import { useFunnel } from "@xionhub/funnel-app-router-adapter";
import { useRouter } from "next/navigation";

export const BasicFunnel = () => {
  const [Funnel, controller] = useFunnel(basicFunnelOptions());
  const router = useRouter();
  return (
    <Funnel>
      <Funnel.Step name="a">
        <FunnelItem
          setStep={() => {
            router.push(`/funnel?${controller.createStep("b")}`);
          }}
          step="a"
        />
      </Funnel.Step>
      <Funnel.Step name="b">
        <FunnelItem
          setStep={() => {
            router.push(`/funnel?${controller.createStep("c")}`);
          }}
          step="b"
        />
      </Funnel.Step>
      <Funnel.Step name="c">
        <FunnelItem
          setStep={() => {
            router.push(`/funnel?${controller.createStep("a")}`);
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
      <button
        className=" bg-purple-400 rounded-full py-4 px-4"
        onClick={() => setStep()}
      >
        go to next funnel
      </button>
    </div>
  );
};
```

### Wrapping Suspense

```tsx
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
```

# API

## useCoreFunnel

```tsx
declare const useCoreFunnel: <Steps extends NonEmptyArray<string>>(
  options: FunnelOptions<Steps> & {
    onStepChange?: FunnelStepChangeFunction<Steps>;
  }
) => [
  ((props: RouteFunnelProps<Steps>) => JSX.Element) & {
    Step: (props: StepProps<Steps>) => JSX.Element;
    Guard: <T>(props: GuardProps<T>) => JSX.Element;
  },
  {
    funnelId: string;
    step: Steps[number] | undefined;
    onStepChange: FunnelStepChangeFunction<Steps>;
    steps: Steps;
  },
];
```

## Guard

```tsx
interface GuardProps<T> {
  condition: (() => T) | (() => Promise<T>);
  children?: ReactNode;
  onRestrict?: (param: Awaited<T>) => void;
  conditionBy?: (param: Awaited<T>) => boolean;
  fallback?: ReactNode;
}
```

`condition` is a function that must return whether the funnel can be accessed.

`onRestrict` runs when condition is false.

`conditionBy` is required if the value returned by condition is not boolean. It should return a boolean.

`fallback` is the fallback that will be displayed when the condition is Falsy.

## useFunnel For App Router

```tsx
declare const useFunnel: <Steps extends NonEmptyArray<string>>(
  options: Omit<FunnelOptions<Steps>, "step">
) => [
  ((props: RouteFunnelProps<Steps>) => JSX.Element) & {
    Step: (props: StepProps<Steps>) => JSX.Element;
    Guard: <T>(props: _GuardProps<T>) => JSX.Element;
  },
  {
    createStep: (
      step: Steps[number],
      searchParams?: URLSearchParams,
      deleteQueryParams?: string[] | string
    ) => string;
    funnelId: string;
    step: Steps[number] | undefined;
    steps: Steps;
  },
];
```

`createStep` is the same API as FunnelClient.createStep.

Using createStep, you can create, delete, or update the query string for the next step.

## Funnel Client

### FunnelClient.createStep

```tsx
createStep(step:string , options:{
    searchParams?: URLSearchParams;
    deleteQueryParams?: string[] | string;
    qsOptions?: QueryString.IStringifyBaseOptions;
    })
```

For deleteQueryParams, enter the key value of queryParams you want to delete. qsOptions uses StringifyBaseOptions from the qs library.

# Get More Example

[App Router Example](https://github.com/XionWCFM/funnel/tree/main/apps/app-router-example)

# License

Licensed under the MIT license.
